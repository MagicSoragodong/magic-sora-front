import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import style from "./QnaModal.module.css";

function QnaModal({qnaClose}) {
  const onCloseQna = (event) => {
    if(event.target === event.currentTarget) {
      qnaClose();
    }
  }
  return (
    <div className={style.qna} onClick={onCloseQna}>
      <div className={style.qnaContents}>
        <div className={style.qnaTitle}>
          <h1>문의하기</h1>
          <FontAwesomeIcon className={style.xBtn} onClick={qnaClose} icon={faXmark}/>
        </div>
        <hr/>
        <p className={style.qnaInstruction}>
          마법의 소라고동을 이용하시면서 궁금하신 점이 있으시거나
           건의하실 것이 있으시다면 <strong> magicsoragodong22@gmail.com</strong>
           로 직접 문의 해주세요. 최대한 빠르게 답변드리도록 하겠습니다!
        </p>
      </div>
    </div>
  );
}

export default QnaModal;