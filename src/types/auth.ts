export type AuthContextType = {
  isLoggedIn: boolean;
  login: (username: string) => void;
  logout: () => void;
  username: string | null;
};
