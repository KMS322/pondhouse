import "../css/main.css";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { UPLOAD_LIST_REQUEST } from "../reducers/videoList";
import UploadForm from "./uploadForm";
const MainComponent = () => {
  const [openForm, setOpenForm] = useState(false);
  const dispatch = useDispatch();
  const { lists } = useSelector((state) => state.videoList);
  // useEffect(() => {
  //   dispatch({
  //     type: UPLOAD_LIST_REQUEST,
  //   });
  // }, [dispatch, lists]);
  return (
    <div className="main">
      <div className="upload_btn">
        <p
          onClick={() => {
            setOpenForm(true);
          }}
        >
          <span>+</span> 업로드
        </p>
      </div>
      <div className="table">
        <div className="head_row row">
          <p>NO</p>
          <p>파일명</p>
          <p>제목</p>
          <p></p>
        </div>
        <div className="content_row row">
          <p>1</p>
          <p>pond_house_mp4</p>
          <p>240101수성호텔장미홀예식영상</p>
          <div className="delete_btn">
            <p>삭제</p>
          </div>
        </div>
        <div className="content_row row even_row">
          <p>1</p>
          <p>pond_house_mp4</p>
          <p>240101수성호텔장미홀예식영상</p>
          <div className="delete_btn">
            <p>삭제</p>
          </div>
        </div>
      </div>
      {openForm ? (
        <UploadForm
          handlePopup={() => {
            setOpenForm(false);
          }}
        />
      ) : (
        ""
      )}
    </div>
  );
};

export default MainComponent;
