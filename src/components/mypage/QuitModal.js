import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import style from "./QuitModal.module.css";

function QuitModal({modalClose}) {
  const onCloseModal = (event) => {
    if(event.target === event.currentTarget) {
      modalClose();
    }
  }
  const memberQuit = () => {
    // 탈퇴하기 버튼 누르면 실행되는 함수
  }
  return (
    <div className={style.quitModal} onClick={onCloseModal}>
      <div className={style.quitModalContents}>
        <div className={style.quitModalTitle}>
          <h1>회원 탈퇴</h1>
          <FontAwesomeIcon className={style.xBtn} onClick={modalClose} icon={faXmark}/>
        </div>
        <hr/>
        <div className={style.quitInstruction}>
          <h3>&lt; 탈퇴 안내 사항 &gt;</h3>
          <ol>
            <li>
              회원님의 개인정보&#40;아이디, 비밀번호, 닉네임, 생년월일 등&#41;는 회원 탈퇴 시 일괄적으로 삭제됩니다.
            </li>
            <li>
              회원님이 작성하신 게시글은 자동적으로 삭제되지 않습니다. 만일 삭제를 원하신다면 탈퇴 이전에 삭제하시길 바랍니다.
            </li>
            <li>
              탈퇴 후 동일한 메일로 재가입이 가능하지만, 탈퇴한 이전 계정과 연동되지 않습니다.
            </li>
            <li>
              오른쪽 하단에 탈퇴하기를 누르시면 회원 탈퇴가 완료됩니다. 탈퇴하기를 누르시면 되돌릴 수 없으니 신중히 결정하시길 바랍니다.
            </li>
          </ol>
        </div>
        <hr/>
        <div className={style.quitModalBtns}>
          <button onClick={modalClose} className={style.stopQuit}>취소</button>
          <button className={style.continueQuit}>탈퇴하기</button>
        </div>
      </div>
    </div>
  );
}

export default QuitModal;