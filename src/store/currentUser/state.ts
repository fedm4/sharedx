export interface CurrentUserStateInterface {
  user: firebase.User | null;
  isOnline: boolean;
}

const state: CurrentUserStateInterface = {
  user: null,
  isOnline: false
};

export default state;
