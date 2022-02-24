import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import style from "./FindPwModal.module.css";

function FindPwModal({findPwClose}) {
  const [email, setEmail] = useState("");
  const onEmailChange = (event) => {
    setEmail(event.target.value);
  }; 
  const onCloseFindPw = (event) => {
    if(event.target === event.currentTarget) {
      findPwClose();
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
        <p>
          가입한 이메일 주소를 정확히 입력해주세요.
          이메일을 통해 비밀번호 수정 링크가 전송됩니다.
          or 이메일을 통해 비밀번호를 알려드립니다.
        </p>
        <form>
          <input
            type="email"
            value={email}
            onChange={onEmailChange}
            placeholder="이메일을 입력하세요."
          />
          <button type="submit">링크 전송</button>
        </form>
      </div>
    </div>
  );
}

export default FindPwModal;