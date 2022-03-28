import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import axios from 'axios';
import style from "./WritingForm.module.css";
import ChoiceDiv from "./ChoiceDiv";

function WritingForm () {
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
  const [isChecked, setIsChecked] = useState(false);
  const [checkedItems, setCheckedItems] = useState(new Set());
  const [choiceList, setChoiceList] = useState([0, 1]);
  const [counter, setCounter] = useState(2);
  const [choices, setChoices] = useState([]);
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
  const onAddChoiceList = () => {
    if(counter === 10) {
      return alert("선택지 개수 최대");
    } else {
      let tempArr = [...choiceList];
      setCounter(counter => counter += 1);
      tempArr.push(counter);
      setChoiceList(tempArr);
    }
  };
  const onDeleteChoiceList = () => {
    if(counter === 2) {
      return alert("선택지 개수 최소");
    } else {
      let countArr = [...choiceList];
      setCounter(counter => counter -= 1);
      countArr.pop();
      setChoiceList(countArr);
    }
  };
  const onCreateChoices = (choice) => {
    setChoices([...choices, choice])
  };
  const onSubmit = async (event) => {
    event.preventDefault();
    console.log(choices);
    // try {
    //   await axios.post( "http://localhost:3000/api/posts",
    //     {
    //       title: title,
    //       endDate: endDate,
    //       detail: detail
    //     }
    //   )
    //   alert("성공");
    //   history.push("/");
    // }
    // catch(error) {
    //   console.log('Error >> ', error);
    // }
  }
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
              required
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
              required
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
              required
              onChange={onDetailChange}
              className={style.writingDetail}
              placeholder="고민을 입력하세요."
            />
          </div>
          <div className={style.writingChoices}>
            <div className={style.addSubChoices}>
              <h4>선택지 (최소 2개, 최대 10개) :</h4> 
              <button type="button" onClick={onAddChoiceList} className={style.addBtn}>선택지 추가</button>
              <button type="button" onClick={onDeleteChoiceList} className={style.subBtn}>선택지 삭제</button>
            </div>
            <div className={style.choices}>
              {choiceList && choiceList.map((item, i) => (
                <ChoiceDiv
                  key={i}
                  onCreateChoices={onCreateChoices}
                />
              ))}
            </div>
          </div>
          <button type="submit" className={style.transparentBtn}>
            <FontAwesomeIcon onClick={onSubmit} title="글 올리기" className={style.SubmitBtn} icon={faPaperPlane} />
          </button>
        </form>
      </div>
    </div>
  );
}

export default WritingForm; 