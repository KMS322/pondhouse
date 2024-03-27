import "../css/adminLists.css";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import {
  LOAD_LISTS_REQUEST,
  DELETE_LIST_REQUEST,
  CHANGE_LISTS_REQUEST,
} from "../reducers/videoList";
import AdminSubHeader from "./adminSubHeader";
import UploadForm from "./adminUploadForm";
import Loading from "./loading";
const AdminLists = () => {
  const location = useLocation();
  const me = location.state && location.state.me;
  const [openForm, setOpenForm] = useState(false);
  const dispatch = useDispatch();
  const {
    lists,
    addListsDone,
    deleteListDone,
    addListsLoading,
    changeListsDone,
  } = useSelector((state) => state.videoList);
  const orderedLists = lists && lists.slice().sort((a, b) => a.order - b.order);
  const [openLoading, setOpenLoading] = useState(false);
  const [loadingMsg, setLoadingMsg] = useState("");

  useEffect(() => {
    dispatch({
      type: LOAD_LISTS_REQUEST,
    });
  }, []);
  const deleteList = (id, src) => {
    dispatch({
      type: DELETE_LIST_REQUEST,
      data: {
        id,
        src,
      },
    });
  };
  useEffect(() => {
    if (addListsDone) {
      window.location.href = "/adminLists";
    }
  }, [addListsDone, lists]);
  useEffect(() => {
    if (deleteListDone) {
      window.location.href = "/adminLists";
    }
  }, [deleteListDone]);
  useEffect(() => {
    if (addListsLoading) {
      setLoadingMsg("loading");
      setOpenLoading(true);
      setOpenForm(false);
    } else if (addListsDone) {
      setLoadingMsg("done");
      setOpenLoading(true);
      const timeoutId = setTimeout(() => {
        setOpenLoading(false);
        window.location.href = "/adminLists";
      }, 2000);
      return () => clearTimeout(timeoutId);
    }
  }, [addListsLoading, addListsDone]);

  const [videoLists, setVideoLists] = useState(orderedLists);
  useEffect(() => {
    if (orderedLists !== null && videoLists === null) {
      setVideoLists(orderedLists);
    }
  }, [orderedLists, videoLists]);

  const moveItem = (fromIndex, toIndex) => {
    const updatedLists = [...videoLists];
    const movedItem = updatedLists[fromIndex];
    updatedLists.splice(fromIndex, 1);
    updatedLists.splice(toIndex, 0, movedItem);

    const updatedWithOrder = updatedLists.map((item, index) => ({
      ...item,
      order: index + 1,
    }));
    setVideoLists(updatedWithOrder);
  };

  const handleChange = () => {
    dispatch({
      type: CHANGE_LISTS_REQUEST,
      data: {
        videoLists,
      },
    });
  };

  useEffect(() => {
    if (changeListsDone) {
      window.location.href = "/adminLists";
    }
  }, [changeListsDone]);
  return (
    <>
      <AdminSubHeader data={"영상 관리"} />
      {(me && me === "ganstar95") || me === "admin" ? (
        <div className="adminLists">
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
              <p>Youtube Url</p>
              <p>Youtube title</p>
              <p>Thumbnail Image</p>
              <p></p>
            </div>
            {videoLists &&
              videoLists.map((list, index) => {
                return (
                  <div
                    className={
                      index % 2 === 0
                        ? "content_row row"
                        : "content_row row even_row"
                    }
                    key={index}
                  >
                    <p>{list.order}</p>
                    <p>{list.file_url}</p>
                    <p>{list.file_title}</p>
                    <p>{list.thumbnail_src}</p>
                    <div className="btn_box">
                      {index === orderedLists.length - 1 ? (
                        <p></p>
                      ) : (
                        <p onClick={() => moveItem(index, index + 1)}>
                          아래로 ▼
                        </p>
                      )}
                      {index === 0 ? (
                        ""
                      ) : (
                        <p onClick={() => moveItem(index, index - 1)}>위로 ▲</p>
                      )}
                      <p
                        onClick={() => {
                          deleteList(list.id, list.thumbnail_src);
                        }}
                      >
                        삭제
                      </p>
                    </div>
                  </div>
                );
              })}
          </div>
          <div className="change_btn">
            <p onClick={handleChange}>순서저장</p>
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
          {openLoading ? <Loading data={loadingMsg} /> : ""}
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default AdminLists;
