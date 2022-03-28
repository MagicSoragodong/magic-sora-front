
export function saveAccessToken (accessToken) {
  return {
    type: "ACCESS_TOKEN",
    payload: accessToken
  };
};