import { useState } from "react";
import axios from 'axios';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import style from "./FindPwModal.module.css";

function FindPwModal({findPwClose}) {
  const emailReg = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
  const [email, setEmail] = useState("");
  const [emailFormError, setEmailFormError] = useState(false);
  const onEmailChange = (event) => {
    setEmail(event.target.value);
  }; 
  const onCloseFindPw = (event) => {
    if(event.target === event.currentTarget) {
      findPwClose();
    }
  }
  const onSubmit = async (event) => {
    event.preventDefault();
    if (emailReg.test(email)) {
      setEmailFormError(false);
    } else {
      return setEmailFormError(true);
    }
    try {
      await axios.post( 'http://localhost:3000/api/users/reset-password',
        {
          email: email
        }
      );
      alert("이메일이 성공적으로 전송되었습니다.");
      findPwClose();
    }
    catch(error) {
      console.log('Error>>', error);
      alert("가입되지 않은 이메일입니다. 이메일을 다시 확인해주세요.");
    }
  }
  return (
    <div className={style.findPwModal} onClick={onCloseFindPw}>
      <div className={style.findPwModalContents}>
        <div className={style.findPwModalTitle}>
          <h1>비밀번호 찾기</h1>
          <FontAwesomeIcon className={style.xBtn} onClick={findPwClose} icon={faXmark}/>
        </div>
        <hr/>
        <div className={style.findPwInstruction}>
          <p>
            가입한 이메일 주소를 <strong>정확히</strong> 입력해주세요. <br/>
            이메일을 통해 비밀번호 수정 링크가 전송됩니다.
          </p>
          <form onSubmit={onSubmit}>
            <input
              type="email"
              value={email}
              required
              onChange={onEmailChange}
              placeholder="이메일을 입력하세요."
            />
            {emailFormError ? <div className={style.errorDetect}>이메일 형식이 맞지 않습니다.</div> : null}
            <button type="submit">링크 전송</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default FindPwModal;