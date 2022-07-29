export const SOCKET = {
  CONNECT: "https://ilearning-task-5-server.herokuapp.com/ws",
  PUBLIC: "Public",
  SUBSCRIBE: {
    PUBLIC: "/chat/public"
  },
  PREFIX: {
    USER: "/user",
    CHAT: "/chat"
  },
  POSTFIX: {
    PRIVATE: "/private",
    SENDING: "/sending",
    PUBLIC: "/public"
  },
  RECONNECTING: {
    MESSAGE: "Reconnecting in 3 seconds...",
    TIMEOUT: 3000
  },
  SEND: {
    PUBLIC: "/app/message",
    PRIVATE: "/app/private-message"
  }
}