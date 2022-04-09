import style from "./ChoiceList.module.css";

function ChoiceList({ choices, onRemoveChoices }) {
  return (
    <div className={style.choiceList}>
      {choices.map((choice) => (
        <div key={choice.id} className={style.choiceDiv}>
          <p className={style.choiceText}>{choice.choiceText}</p>
          {choice.imgPreview ? (
            <img src={choice.imgPreview} alt="choice-img" />
          ) : (
            <div className={style.noPreviewImg}>첨부사진 없음</div>
          )}
          <button type="button" onClick={() => onRemoveChoices(choice.id)}>
            선택지 삭제
          </button>
        </div>
      ))}
    </div>
  );
}

export default ChoiceList;
