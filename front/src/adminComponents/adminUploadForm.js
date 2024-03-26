import "../css/adminUploadForm.css";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ADD_LISTS_REQUEST } from "../reducers/videoList";
import axios from "axios";

const AdminUploadForm = ({ handlePopup }) => {
  const dispatch = useDispatch();
  const [urls, setUrls] = useState([""]);
  const { addListsDone } = useSelector((state) => state.videoList);
  const [thumbnails, setThumbnails] = useState(Array(urls.length).fill(null));
  useEffect(() => {
    if (addListsDone) {
      window.location.href = "/adminLists";
    }
  }, [addListsDone]);
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

  const handleFileChange = (e, index) => {
    const newThumbnails = [...thumbnails];
    newThumbnails[index] = e.target.files[0];
    setThumbnails(newThumbnails);
  };

  const sendData = async (e) => {
    e.preventDefault();
    const thumbnailSrcs = thumbnails
      .filter((thumbnail) => thumbnail)
      .map((thumbnail) => thumbnail.name);
    for (let i = 0; i < urls.length; i++) {
      if (!urls[i]) {
        alert(`${i + 1}번째 URL을 입력해주세요.`);
        return;
      }
      const videoId = urls[i].match(/[?&]v=([^&]+)/)[1];
      if (!videoId) {
        alert(`${i + 1}번째 URL을 확인해주세요.`);
        return;
      }
    }

    dispatch({
      type: ADD_LISTS_REQUEST,
      data: { urls, thumbnailSrcs },
    });

    try {
      for (let i = 0; i < thumbnails.length; i++) {
        if (thumbnails[i]) {
          const formData = new FormData();
          formData.append(
            "file",
            thumbnails[i],
            encodeURIComponent(thumbnails[i].name)
          );

          const response = await axios.post("/list/upload", formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          });
        }
      }
    } catch (error) {
      console.error("Error uploading:", error);
    }
  };

  return (
    <div className="adminUploadForm">
      <img src="/images/delete_btn.png" alt="" onClick={handlePopup} />
      <div className="form_container">
        {urls.map((url, index) => (
          <div className="input_container" key={index}>
            <input
              key={index}
              type="text"
              name={`url-${index}`}
              value={url}
              onChange={(e) => handleInput(e, index)}
              placeholder={`Youtube Url #${index + 1}을 입력해주세요.`}
            />
            <div className="label_container">
              <label htmlFor={`file-${index}`}>
                <div className="upload_btn">
                  <p>썸네일 등록</p>
                </div>
              </label>
              <input
                id={`file-${index}`}
                type="file"
                onChange={(e) => handleFileChange(e, index)}
              />
              <p>
                {thumbnails[index]
                  ? thumbnails[index].name
                  : "파일을 선택하세요"}
              </p>
            </div>
          </div>
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
