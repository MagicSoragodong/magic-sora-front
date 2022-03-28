import { useState, useEffect } from "react";
import style from "./ChoiceDiv.module.css";

function ChoiceDiv({onCreateChoices}) {
  const [choiceInputs, setChoiceInputs] = useState({
    choiceText: "",
    choiceImgURL: "",
  });
  const {choiceText, choiceImgURL} = choiceInputs;
  const onChoiceInputsChange = (event) => {
    const {name, value} = event.target;
    setChoiceInputs({
      ...choiceInputs,
      [name]: value
    })
  };
  // useEffect(() => {
  //   onCreateChoices(choiceInputs);
  // }, [choiceInputs])
  return(
    <div className={style.choiceDiv}>
      <input
        type="text"
        name="choiceText"
        value={choiceText}
        required
        onChange={onChoiceInputsChange}
        className={style.choiceText}
        placeholder="선택지 설명 (최대 30자)"
        maxLength="30"
      />
      <input
        type="file"
        name="choiceImgURL"
        value={choiceImgURL}
        accept="image/*"
        onChange={onChoiceInputsChange}
      />
      <button>선택지 작성 완료</button>
    </div>
    
  );
}

export default ChoiceDiv;