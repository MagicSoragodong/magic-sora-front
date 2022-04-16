export function loginState(isLogin) {
  return {
    type: "LOGIN_STATE",
    payload: isLogin,
  };
}
