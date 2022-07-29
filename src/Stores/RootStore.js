import ChatStore from "./ChatStore";
import UserStore from "./UserStore";

export default class RootStore {
  constructor() {
    this.chatStore = new ChatStore(this);
    this.userStore = new UserStore(this);
  }

  clearStores() {
    this.chatStore.clearStore();
    this.userStore.clearStore();
  }
}
