import axios from "axios";
import { loginState } from "../../actions/login_action";

export const SilentTokenRequest = async (history, dispatch) => {
  try {
    const response = await axios.get("http://localhost:3000/api/auth/refresh", {
      withCredentials: true,
    });
    localStorage.setItem("access_token", response.data.data["access_token"]);
    axios.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${response.data.data["access_token"]}`;
    window.location.reload();
  } catch (error) {
    alert("로그인이 필요한 서비스입니다. 로그인 페이지로 이동합니다.");
    dispatch(loginState(false));
    history.push("/login");
  }
};
