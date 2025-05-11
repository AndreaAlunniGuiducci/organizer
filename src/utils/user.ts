export const isUserLoggedIn = (): boolean => {
  const user = localStorage.getItem("user");
  if (user) {
    return true;
  } else {
    return false;
  }
};

export const getUserId = (): string => {
  const user = window.localStorage.getItem("user");
  const userId = user ? JSON.parse(user).uid : "";
  return userId;
};
