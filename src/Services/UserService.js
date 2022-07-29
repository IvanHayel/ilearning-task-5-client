import {api}      from "../Config";
import {USER_API} from "../Constants";
import stores     from "../Stores";

const {userStore} = stores;

export const getAllUsers = async () => {
  try {
    const response = await api.get(USER_API.USERS);
    userStore.setUsers(response.data);
    return response;
  } catch (error) {
    return error.response;
  }
};
