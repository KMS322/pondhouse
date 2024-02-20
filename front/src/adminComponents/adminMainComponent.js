import "../css/adminMain.css";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { LOAD_LISTS_REQUEST, DELETE_LIST_REQUEST } from "../reducers/videoList";
import UploadForm from "./adminUploadForm";
import Loading from "./loading";
const AdminMainComponent = () => {
  const location = useLocation();
  const me = location.state && location.state.me;
  const [openForm, setOpenForm] = useState(false);
  const dispatch = useDispatch();
  const { lists, addListsDone, deleteListDone, addListsLoading } = useSelector(
    (state) => state.videoList
  );
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
      window.location.href = "/adminMain";
    }
  }, [addListsDone, lists]);
  useEffect(() => {
    if (deleteListDone) {
      window.location.href = "/adminMain";
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
        window.location.href = "/adminMain";
      }, 2000);
      return () => clearTimeout(timeoutId);
    }
  }, [addListsLoading, addListsDone]);
  return (
    <>
      {me && me === "admin" ? (
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
              <p>Youtube Url</p>
              <p>Youtube title</p>
              <p>Thumbnail Image</p>
              <p></p>
            </div>
            {lists &&
              lists.map((list, index) => {
                return (
                  <div
                    className={
                      index % 2 === 0
                        ? "content_row row"
                        : "content_row row even_row"
                    }
                    key={index}
                  >
                    <p>{index + 1}</p>
                    <p>{list.file_url}</p>
                    <p>{list.file_title}</p>
                    <p>{list.thumbnail_src}</p>
                    <div className="delete_btn">
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

export default AdminMainComponent;
