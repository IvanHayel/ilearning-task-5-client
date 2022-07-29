import {configure} from "mobx";
import RootStore   from "./RootStore";

configure({
  enforceActions: "never",
});

const rootStore = new RootStore();

const stores = {
  rootStore,
  chatStore: rootStore.chatStore,
  userStore: rootStore.userStore
};

export default stores;
