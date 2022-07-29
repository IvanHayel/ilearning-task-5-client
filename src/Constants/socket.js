export const SOCKET = {
  CONNECT: "http://localhost:8080/ws",
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