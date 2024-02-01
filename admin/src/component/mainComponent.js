import "../css/main.css";
import React, { useState, useEffect } from "react";

const MainComponent = () => {
  return (
    <div className="main">
      <div className="upload_btn">
        <p>
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
    </div>
  );
};

export default MainComponent;
