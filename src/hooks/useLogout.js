import { auth } from "../firebase/config";

export const useLogout = () => {
  const logout = () => {
    return auth.signOut();
  };

  return [logout];
};
