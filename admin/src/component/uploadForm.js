import "../css/uploadForm.css";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { UPLOAD_LIST_REQUEST } from "../reducers/videoList";
import axios from "axios";
const UploadForm = ({ handlePopup }) => {
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");
  const [file, setFile] = useState(null);
  const [selectedFileName, setSelectedFileName] = useState("");

  const handleInput = (e) => {
    setTitle(e.target.value);
  };
  const handleFileChange = (e) => {
    const attachedFile = e.target.files[0];
    setFile(attachedFile);
    setSelectedFileName(attachedFile ? attachedFile.name : "");
  };
  const sendData = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("file", file);

      const response = await axios.post("/list/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.status === 200) {
        const responseData = response.data;

        dispatch({
          type: UPLOAD_LIST_REQUEST,
          data: responseData,
        });
      } else {
        console.error("Failed to upload:", response.statusText);
      }
    } catch (error) {
      console.error("Error uploading:", error);
    }
  };
  return (
    <div className="uploadForm">
      <img src="/public/images/delete_btn.png" alt="" />
      <img src="/images/delete_btn.png" alt="" onClick={handlePopup} />
      <div className="form_container">
        <input
          type="text"
          name="title"
          value={title}
          onChange={handleInput}
          placeholder="제목을 입력해주세요."
        />
        <label htmlFor="file">
          <div className="upload_btn">
            <p>+ 파일첨부</p>
          </div>
        </label>
        <input id="file" type="file" onChange={handleFileChange} />
        <p>&nbsp;{selectedFileName || ""}</p>
      </div>
      <div className="submit_btn" onClick={sendData}>
        업로드
      </div>
    </div>
  );
};

export default UploadForm;
