
import { userState } from "../atoms/user";
import {selector} from "recoil";

export const username = selector({
  key: 'username',
  get: ({get}) => {
    const state = get(userState);

    return state.username;
  },
});