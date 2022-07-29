import {makeAutoObservable}          from "mobx";
import {makePersistable}             from "mobx-persist-store";
import {toast}                       from "react-toastify";
import {BASIC_TOAST_OPTIONS, SOCKET} from "../Constants";

export default class ChatStore {
  isEntered = false;
  isSocketConnected = false;
  user = {
    id: null,
    username: null,
    contacts: []
  }
  sentMessages = [];
  receivedMessages = [];
  publicMessages = [];

  constructor() {
    makeAutoObservable(this);
    makePersistable(this, {
      name: "ChatStore",
      properties: ["isEntered", "isSocketConnected", "user", "sentMessages",
        "receivedMessages", "publicMessages"],
      storage: localStorage
    }).catch((error) =>
        console.log("Unable to persist chat:", error)
    );
  }

  enterChat({user, sentMessages, receivedMessages, publicMessages}) {
    this.user = user;
    this.sentMessages = sentMessages;
    this.receivedMessages = receivedMessages;
    this.publicMessages = publicMessages;
    this.isEntered = true;
  }

  setSocketConnection(state) {
    this.isSocketConnected = state;
  }

  getCurrentUser() {
    return {...this.user};
  }

  getCurrentUserName() {
    return this.user.username;
  }

  getCurrentUserContacts() {
    return [...this.user.contacts];
  }

  getMessageList(chat) {
    if (chat === "Public") {
      return [...this.publicMessages]
      .map(message => {
        return {
          key: message.id,
          position: message.sender.username === this.user.username
              ? "right"
              : "left",
          title: message.sender.username,
          type: "text",
          text: message.content,
          date: new Date(message.sendAt)
        };
      })
      .sort((a, b) => a.date - b.date).slice();
    } else if (chat === this.user.username) {
      return [...this.sentMessages]
      .filter(message => message.receiver && message.receiver.username
          === this.user.username)
      .map(message => {
        return {
          key: message.id,
          position: "right",
          title: message.sender.username,
          type: "text",
          text: message.content,
          date: new Date(message.sendAt)
        };
      }).sort((a, b) => a.date - b.date).slice();
    } else {
      const send = [...this.sentMessages]
      .filter(message => message.receiver && message.receiver.username === chat)
      .map(message => {
        return {
          key: message.id,
          position: "right",
          title: message.sender.username,
          type: "text",
          text: message.content,
          date: new Date(message.sendAt)
        };
      });
      const receive = [...this.receivedMessages]
      .filter(message => message.sender.username === chat)
      .map(message => {
        return {
          key: message.id,
          position: "left",
          title: message.sender.username,
          type: "text",
          text: message.content,
          date: new Date(message.sendAt)
        };
      });
      return [...send, ...receive]
      .sort((a, b) => a.date - b.date).slice();
    }
  }

  addContact(contact) {
    this.user.contacts = [...this.user.contacts, contact];
  }

  receivePublicMessage(message) {
    toast(
        `${message.sender.username} to "${SOCKET.PUBLIC}": ${message.content}`,
        BASIC_TOAST_OPTIONS);
    this.publicMessages = [...this.publicMessages, message];
  }

  receivePrivateMessage(message) {
    if (!this.user.contacts.includes(message.sender.username)) {
      this.user.contacts = [...this.user.contacts, message.sender.username];
    }
    toast(`From ${message.sender.username}: ${message.content}`,
        BASIC_TOAST_OPTIONS);
    this.receivedMessages = [...this.receivedMessages, message];
  }

  receiveMessageSent(message) {
    this.sentMessages = [...this.sentMessages, message];
  }

  clearStore() {
    this.isEntered = false;
    this.isSocketConnected = false;
    this.user = {
      id: null,
      username: null,
      contacts: []
    }
    this.sentMessages = [];
    this.receivedMessages = [];
    this.publicMessages = [];
  }

  isEnteredChat() {
    return this.isEntered;
  }
}
