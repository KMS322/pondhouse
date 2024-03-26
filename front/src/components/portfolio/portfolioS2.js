import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { LOAD_LISTS_REQUEST } from "../../reducers/videoList";
import YouTube from "react-youtube";

const PortfolioS2 = () => {
  const dispatch = useDispatch();
  const [showPopup, setShowPopup] = useState(false);
  const [currentVideo, setCurrentVideo] = useState(0);
  const { lists } = useSelector((state) => state.videoList);
  useEffect(() => {
    dispatch({
      type: LOAD_LISTS_REQUEST,
    });
  }, [dispatch]);

  return (
    <>
      <div className="portfolio_s2">
        <div className="article_container">
          {lists &&
            lists.map((list, index) => {
              return (
                <div className="video_box" key={index}>
                  <div className="video">
                    {list.thumbnail_src ? (
                      <img src={`/thumbnails/${list.thumbnail_src}`} alt="" />
                    ) : (
                      <img
                        src={`https://img.youtube.com/vi/${list.file_id}/mqdefault.jpg`}
                        alt=""
                      />
                    )}
                    <img
                      src="/images/play_btn.png"
                      alt=""
                      onClick={() => {
                        setShowPopup(true);
                        setCurrentVideo(index);
                      }}
                    />
                  </div>
                  <p>{list.file_title}</p>
                </div>
              );
            })}
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
            <img
              src={currentVideo === 0 ? "" : "/images/arrow_left.png"}
              alt=""
              onClick={() => {
                setCurrentVideo(currentVideo - 1);
              }}
            />
            <div className="video_box">
              <YouTube
                videoId={lists[currentVideo].file_id}
                opts={{
                  playerVars: {
                    autoplay: 1,
                    rel: 0,
                    modestbranding: 1,
                  },
                }}
                onEnd={(e) => {
                  e.target.stopVideo(0);
                }}
                style={{}}
              />
            </div>
            <img
              src={
                currentVideo === lists.length - 1
                  ? ""
                  : "/images/arrow_right.png"
              }
              alt=""
              onClick={() => {
                setCurrentVideo(currentVideo + 1);
              }}
            />
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default PortfolioS2;
