import {toast}              from "react-toastify";
import {api}                from "../Config";
import {
  BASIC_TOAST_OPTIONS,
  CHAT_API,
  SOCKET,
  TOAST_MESSAGES
}                           from "../Constants";
import {over}               from 'stompjs';
import stores               from "../Stores";
import {createErrorMessage} from "../Utils";
import SockJS               from 'sockjs-client';
import {
  getAllUsers
}                           from "./UserService";

const {chatStore, rootStore} = stores;

export let stompClient = null;

export const enterChat = async (username) => {
  try {
    const response = await toast.promise(
        api.post(CHAT_API.ENTER_CHAT, {
          "username": username
        }),
        {
          pending: TOAST_MESSAGES.PENDING,
          success: TOAST_MESSAGES.ENTER_CHAT_SUCCESS + username,
          error: {
            render({data}) {
              return createErrorMessage(data);
            },
          },
        },
        BASIC_TOAST_OPTIONS
    );
    chatStore.enterChat(response.data);
    connectToSocket();
    await getAllUsers();
    return response;
  } catch (error) {
    return error.response;
  }
};

export const leaveChat = () => {
  rootStore.clearStores();
  stompClient && stompClient.disconnect();
  stompClient = null;
}

export const isEnteredChat = () => chatStore.isEnteredChat();

export const connectToSocket = () => {
  if (!stompClient) {
    const socket = new SockJS(SOCKET.CONNECT);
    stompClient = over(socket);
    stompClient.connect({}, onSocketConnected, onSocketConnectionError);
  }
}

const onSocketConnected = () => {
  stompClient.subscribe(SOCKET.SUBSCRIBE.PUBLIC, onPublicMessage);
  stompClient.subscribe(
      `${SOCKET.PREFIX.USER}/${chatStore.getCurrentUserName()}${SOCKET.POSTFIX.PRIVATE}`,
      onPrivateMessage);
  stompClient.subscribe(
      `${SOCKET.PREFIX.USER}/${chatStore.getCurrentUserName()}${SOCKET.POSTFIX.SENDING}`,
      onMessageSent);
  chatStore.setSocketConnection(true);
}

const onSocketConnectionError = () => {
  stompClient.disconnect();
  stompClient = null;
  if (chatStore.isSocketConnected) {
    chatStore.setSocketConnection(false);
  }
  console.log(SOCKET.RECONNECTING.MESSAGE);
  setTimeout(() => connectToSocket(), SOCKET.RECONNECTING.TIMEOUT);
}

const onPublicMessage = (message) => {
  const messageData = JSON.parse(message.body);
  chatStore.receivePublicMessage(messageData);
}

const onPrivateMessage = (message) => {
  const messageData = JSON.parse(message.body);
  chatStore.receivePrivateMessage(messageData);
}

const onMessageSent = (message) => {
  const messageData = JSON.parse(message.body);
  chatStore.receiveMessageSent(messageData);
}

export const sendMessage = (data, receiver) => {
  if (stompClient && receiver) {
    let message = {};
    if (receiver === SOCKET.PUBLIC) {
      message = {
        senderUsername: chatStore.getCurrentUserName(),
        receiverUsername: null,
        content: data.message,
      }
      stompClient.send(SOCKET.SEND.PUBLIC, {}, JSON.stringify(message));
    } else {
      message = {
        senderUsername: chatStore.getCurrentUserName(),
        receiverUsername: receiver,
        content: data.message,
      }
      stompClient.send(SOCKET.SEND.PRIVATE, {}, JSON.stringify(message));
    }
  }
}
