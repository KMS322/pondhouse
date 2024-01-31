import React, { useState } from "react";
const PortfolioS2 = () => {
  const [showPopup, setShowPopup] = useState("");
  const videoLists = [
    {
      src: "/videos",
      title: "제목을 입력해 주세요.",
    },
  ];

  return (
    <>
      <div className="portfolio_s2">
        <div className="article_container">
          {Array.from({ length: 20 }, (_, i) => (
            <div className="video_box" key={i}>
              <div className="video">
                <img src="/images/portfolio_s2_img.jpg" alt="" />
                <img
                  src="/images/play_btn.png"
                  alt=""
                  onClick={() => {
                    setShowPopup(true);
                  }}
                />
              </div>
              <p>제목을 입력해 주세요.</p>
            </div>
          ))}
        </div>
      </div>
      {showPopup ? (
        <div className="video_popup">
          <img
            src="/images/delete_btn.png"
            alt=""
            onClick={() => {
              setShowPopup(false);
            }}
          />
          <div className="article_container">
            <img src="/images/arrow_left.png" alt="" />
            <div className="video_box">
              <div className="video"></div>
              <img src="/images/play_btn2.png" alt="" />
            </div>
            <img src="/images/arrow_right.png" alt="" />
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default PortfolioS2;
