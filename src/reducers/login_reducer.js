const initialState = false;

export default function loginStateReducer(state = initialState, action) {
  switch (action.type) {
    case "LOGIN_STATE":
      return { isLogin: action.payload };
    default:
      return state;
  }
}
