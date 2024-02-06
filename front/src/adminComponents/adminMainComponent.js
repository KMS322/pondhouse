import "../css/adminMain.css";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { LOAD_LISTS_REQUEST, DELETE_LIST_REQUEST } from "../reducers/videoList";
import UploadForm from "./adminUploadForm";
const AdminMainComponent = () => {
  const [openForm, setOpenForm] = useState(false);
  const dispatch = useDispatch();
  const { lists } = useSelector((state) => state.videoList);
  // useEffect(() => {
  //   dispatch({
  //     type: LOAD_LISTS_REQUEST,
  //   });
  // }, [dispatch]);
  const deleteList = (id, fileName) => {
    dispatch({
      type: DELETE_LIST_REQUEST,
      data: {
        id,
        fileName,
      },
    });
  };
  return (
    <div className="adminMain">
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
        {lists &&
          lists.map((list, index) => {
            return (
              <div className="content_row row" key={index}>
                <p>{index + 1}</p>
                <p>{list.file_name}</p>
                <p>{list.file_title}</p>
                <div className="delete_btn">
                  <p
                    onClick={() => {
                      deleteList(list.id, list.file_name);
                    }}
                  >
                    삭제
                  </p>
                </div>
              </div>
            );
          })}
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

export default AdminMainComponent;
