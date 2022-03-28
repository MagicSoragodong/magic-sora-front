
export default function tokenReducer(state = {}, action) {
  switch (action.type) {
    case "ACCESS_TOKEN":
      return {...state, accessToken: action.payload};
    default:
      return state;
  }
}