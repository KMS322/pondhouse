import "../css/adminUploadForm.css";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ADD_LISTS_REQUEST } from "../reducers/videoList";
import axios from "axios";

const AdminUploadForm = ({ handlePopup }) => {
  const dispatch = useDispatch();
  const [urls, setUrls] = useState([""]); // 각 URL에 대한 상태 배열
  const [title, setTitle] = useState("");
  const [file, setFile] = useState(null);
  const [selectedFileName, setSelectedFileName] = useState("");

  const handleInput = (e, index) => {
    const newUrls = [...urls];
    newUrls[index] = e.target.value;
    setUrls(newUrls);
  };

  const addInput = () => {
    setUrls([...urls, ""]);
  };

  const removeInput = (index) => {
    const newUrls = [...urls];
    newUrls.splice(index, 1);
    setUrls(newUrls);
  };

  const sendData = () => {
    // urls 배열을 사용하여 데이터를 전송하는 로직 추가
    dispatch({
      type: ADD_LISTS_REQUEST,
      data: urls,
    });
  };
  const handleFileChange = (e) => {
    const attachedFile = e.target.files[0];
    setFile(attachedFile);
    setSelectedFileName(attachedFile ? attachedFile.name : "");
  };

  return (
    <div className="adminUploadForm">
      <img src="/images/delete_btn.png" alt="" onClick={handlePopup} />
      <div className="form_container">
        {urls.map((url, index) => (
          <>
            <input
              key={index}
              type="text"
              name={`url-${index}`}
              value={url}
              onChange={(e) => handleInput(e, index)}
              placeholder={`Youtube Url #${index + 1}을 입력해주세요.`}
            />
            <label htmlFor="file">
              <div className="upload_btn">
                <p>썸네일 등록</p>
              </div>
            </label>
            <input id="file" type="file" onChange={handleFileChange} />
            <p>&nbsp;{selectedFileName || ""}</p>
          </>
        ))}
      </div>
      <div className="btn_box">
        <div className="list_btn" onClick={() => removeInput(urls.length - 1)}>
          삭제
        </div>
        <div className="list_btn" onClick={addInput}>
          추가
        </div>
      </div>

      <div className="submit_btn" onClick={sendData}>
        업로드
      </div>
    </div>
  );
};

export default AdminUploadForm;
