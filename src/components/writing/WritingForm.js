import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { faImage } from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect, useRef } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import style from "./WritingForm.module.css";
import ChoiceList from "./ChoiceList";
import { SilentTokenRequest } from "../utils/RefreshToken";

function WritingForm() {
  const history = useHistory();
  const [title, setTitle] = useState("");
  const [endDate, setEndDate] = useState("");
  const [detail, setDetail] = useState("");
  const formData = [
    { id: 1, name: "먹을거" },
    { id: 2, name: "학업/진로" },
    { id: 3, name: "썸/연애" },
    { id: 4, name: "직장" },
    { id: 5, name: "패션" },
    { id: 6, name: "스포츠" },
    { id: 7, name: "연예인" },
    { id: 8, name: "방송인" },
    { id: 9, name: "취미" },
    { id: 10, name: "동물" },
    { id: 11, name: "게임" },
    { id: 12, name: "미용" },
    { id: 13, name: "다이어트/운동" },
    { id: 14, name: "일상" },
    { id: 15, name: "진지한 고민" },
    { id: 16, name: "쇼핑" },
    { id: 17, name: "기타" },
  ];
  let tempCheckedArr = new Array();
  const [isChecked, setIsChecked] = useState(false);
  const [checkedItems, setCheckedItems] = useState(new Set());
  const [choiceInputs, setChoiceInputs] = useState({
    choiceText: "",
    choiceImgURL: "",
  });
  const { choiceText, choiceImgURL } = choiceInputs;
  const [imgPreview, setImgPreview] = useState("");
  const nextId = useRef(1);
  const [choices, setChoices] = useState([]);
  const choiceImgAddBtn = useRef(null);
  const onTitleChange = (event) => {
    setTitle(event.target.value);
  };
  const onEndDateChange = (event) => {
    setEndDate(event.target.value);
  };
  const onDetailChange = (event) => {
    setDetail(event.target.value);
  };
  const checkHandler = ({ target }) => {
    setIsChecked(!isChecked);
    checkedItemHandler(target.parentNode, target.id, target.checked);
  };
  const checkedItemHandler = (box, id, isChecked) => {
    if (isChecked) {
      //체크 되었을때
      checkedItems.add(id); //체크시 삽입
      setCheckedItems(checkedItems); //체크 요소 넣어주기
      box.style.backgroundColor = "#ffd993";
      console.log(checkedItems);
    } else if (!isChecked && checkedItems.has(id)) {
      //체크가 안되었고, id가 있을때(클릭 2번시)
      checkedItems.delete(id); //체크 두번시 삭제
      setCheckedItems(checkedItems);
      box.style.backgroundColor = "#fff";
      console.log(checkedItems);
    }
    return checkedItems;
  };
  const showImgPreview = (event) => {
    if (event.target.files[0]) {
      setImgPreview(event.target.files[0]);
    } else {
      setImgPreview("");
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        setImgPreview(reader.result);
      }
    };
    reader.readAsDataURL(event.target.files[0]);
  };
  const onChoiceInputsChange = (event) => {
    const { name, value } = event.target;
    setChoiceInputs({
      ...choiceInputs,
      [name]: value,
    });
  };
  const onCreateChoices = () => {
    const choice = {
      id: nextId.current,
      imgPreview: imgPreview,
      choiceText,
      choiceImgURL,
    };
    setChoices([...choices, choice]);
    setChoiceInputs({
      choiceText: "",
      choiceImgURL: "",
    });
    setImgPreview("");
    nextId.current += 1;
  };
  const onRemoveChoices = (id) => {
    setChoices(choices.filter((choice) => choice.id !== id));
  };
  const onSubmit = async (event) => {
    event.preventDefault();
    if (title === "") {
      return alert("고민 제목을 입력해주세요.");
    } else if (endDate === "") {
      return alert("글 마감 날짜를 입력해주세요.");
    } else if (detail === "") {
      return alert("고민 내용을 입력해주세요.");
    } else if (choices.length < 2) {
      return alert("선택지 최소 개수를 맞춰주세요.");
    } else if (choices.length > 10) {
      return alert("선택지 최대 개수를 맞춰주세요.");
    }
    tempCheckedArr = Array.from(checkedItems);
    try {
      await axios.post(
        "http://localhost:3000/api/posts",
        {
          post_title: title,
          finish_date: endDate,
          tag: tempCheckedArr,
          post_content: detail,
          choice: choices,
        },
        { withCredentials: true }
      );
      alert("글 올리기 성공!");
      history.push("/");
    } catch (error) {
      SilentTokenRequest();
    }
  };
  return (
    <div>
      <div className={style.writingForm}>
        <FontAwesomeIcon
          icon={faArrowLeft}
          className={style.gobackIcon}
          onClick={() => {
            history.goBack();
          }}
        />
        <form className={style.writingFormContents}>
          <div className={style.writingInput}>
            <h4>고민 제목 :</h4>
            <input
              type="text"
              value={title}
              onChange={onTitleChange}
              className={style.writingTitle}
              placeholder="제목을 입력하세요."
            />
          </div>
          <div className={style.writingInput}>
            <h4>글 마감 날짜 :</h4>
            <input
              type="date"
              value={endDate}
              onChange={onEndDateChange}
              className={style.writingTitle}
              placeholder="제목을 입력하세요."
            />
          </div>
          <div className={style.favtags}>
            <h4>이 글의 태그 :</h4>
            {formData.map((item) => (
              <label key={item.id} className={style.favtag}>
                <input
                  type="checkbox"
                  value={item.name}
                  id={item.id}
                  onChange={(e) => checkHandler(e)}
                />
                <div className="tagName">{item.name}</div>
              </label>
            ))}
          </div>
          <div className={style.writingInput}>
            <h4>고민 내용 (최대 400자) :</h4>
            <textarea
              value={detail}
              onChange={onDetailChange}
              className={style.writingDetail}
              placeholder="고민을 입력하세요."
              maxLength="400"
            />
          </div>
          <div className={style.writingChoices}>
            <h4>
              선택지 입력 (최소 2개, 최대 10개):{" "}
              <span className={style.refMessage}>
                ※ 선택지 설명을 입력하고 사진을 첨부한 후, 선택지 등록 버튼을
                눌러주세요.(첨부사진 필수 X){" "}
              </span>
            </h4>
            <div className={style.createChoices}>
              <div className={style.createChoicesInput}>
                <input
                  type="text"
                  name="choiceText"
                  value={choiceText}
                  onChange={onChoiceInputsChange}
                  placeholder="선택지 설명을 입력하세요."
                  className={style.choiceInputText}
                />
                <input
                  type="file"
                  accept="image/*"
                  name="choiceImgURL"
                  value={choiceImgURL}
                  onChange={(e) => {
                    onChoiceInputsChange(e);
                    showImgPreview(e);
                  }}
                  className={style.fileBtn}
                  ref={choiceImgAddBtn}
                />
                <FontAwesomeIcon
                  onClick={() => {
                    choiceImgAddBtn.current.click();
                  }}
                  title="사진 추가하기"
                  icon={faImage}
                  className={style.addChoiceImage}
                />
              </div>
              <button type="button" onClick={onCreateChoices}>
                선택지 등록
              </button>
            </div>
            <ChoiceList
              choices={choices}
              onRemoveChoices={onRemoveChoices}
              imgPreview={imgPreview}
            />
          </div>
          <button type="submit" className={style.transparentBtn}>
            <FontAwesomeIcon
              onClick={onSubmit}
              title="글 올리기"
              className={style.SubmitBtn}
              icon={faPaperPlane}
            />
          </button>
        </form>
      </div>
    </div>
  );
}

export default WritingForm;
