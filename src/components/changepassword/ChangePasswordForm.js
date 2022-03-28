import { useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import axios from 'axios';
import queryString from "query-string";
import style from "./ChangePasswordForm.module.css";

function ChangePasswordForm() {
  const history = useHistory();
  const searchParams = useLocation().search;
  const query = queryString.parse(searchParams);
  const [newPassword, setNewPassword] = useState("");
  const [newPasswordCheck, setNewPasswordCheck] = useState("");
  const [newPasswordError, setNewPasswordError] = useState(false);
  const onNewPasswordChange = (event) => {
    setNewPassword(event.target.value);
  };
  const onNewPasswordCheckChange = (event) => {
    setNewPasswordError(event.target.value !== newPassword);
    setNewPasswordCheck(event.target.value);
  };
  const onSubmit = async (event) => {
    event.preventDefault();
    if(newPassword !== newPasswordCheck) {
      alert("비밀번호 일치 여부를 확인해주세요.");
      return setNewPasswordError(true);
    }
    try {
      await axios.patch( "http://localhost:3000/api/users/reset-password",
        {
          code: query.code,
          id: query.id,
          newPassword: newPassword
        }
      )
      alert("비밀번호가 성공적으로 변경되었습니다.");
      history.push("/login");
    }
    catch(error) {
      alert("비밀번호 변경에 실패했습니다.");
      console.log('Error! >>', error);
    }
  }
  return (
    <div className={style.formContents}>
      <h1>비밀번호 변경</h1>
      <p>변경할 비밀번호를 정확히 입력해주세요.</p>
      <form onSubmit={onSubmit}>
        <div className={style.passwordChange}>
          <label htmlFor="new-password">새 비밀번호</label>
          <input
            id="new-password"
            type="password"
            value={newPassword}
            required
            onChange={onNewPasswordChange}
            placeholder="새 비밀번호"
            minLength="8"
          />
        </div>
        <div className={style.passwordChange}>
          <label htmlFor="new-password-check">새 비밀번호 확인</label>
          <input
            id="new-password-check"
            type="password"
            value={newPasswordCheck}
            required
            onChange={onNewPasswordCheckChange}
            placeholder="새 비밀번호 확인"
          />
        </div>
        {newPasswordError ? <div className={style.errorMessage}>비밀번호가 일치하지 않습니다.</div> : null}
        <button className={style.changePasswordBtn} type="submit">비밀번호 변경</button>
      </form>
    </div>
  );
}

export default ChangePasswordForm;