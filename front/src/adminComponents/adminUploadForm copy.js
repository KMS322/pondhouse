import "../css/adminUploadForm.css";
import React, { useState, useEffect } from "react";
import axios from "axios";
const AdminUploadForm = ({ handlePopup }) => {
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
      formData.append("file", file, encodeURIComponent(file.name));
      const response = await axios.post("/list/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.status === 201) {
        handlePopup();
        window.location.href = "/admin";
      } else {
        console.error("Failed to upload:", response.statusText);
      }
    } catch (error) {
      console.error("Error uploading:", error);
    }
  };

  return (
    <div className="adminUploadForm">
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

export default AdminUploadForm;
