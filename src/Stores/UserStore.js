import {makeAutoObservable} from "mobx";
import {makePersistable}    from "mobx-persist-store";

export default class UserStore {
  users = [];

  constructor() {
    makeAutoObservable(this);
    makePersistable(this, {
      name: "UserStore",
      properties: ["users"],
      storage: localStorage,
    }).catch((error) =>
        console.log("Unable to persist users:", error)
    );
  }

  setUsers(users) {
    this.users = [...users];
  }

  getUsers() {
    return [...this.users];
  }

  getUserNames() {
    return this.users.map(user => user.username);
  }

  clearStore() {
    this.users = [];
  }
}
