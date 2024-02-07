import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { LOAD_LISTS_REQUEST } from "../../reducers/videoList";
import YouTube from "react-youtube";
const MainS2 = () => {
  const dispatch = useDispatch();
  const [currentVideo, setCurrentVideo] = useState(1);
  const { lists } = useSelector((state) => state.videoList);
  useEffect(() => {
    dispatch({
      type: LOAD_LISTS_REQUEST,
    });
  }, []);

  return (
    <div className="main_s2">
      <p>PORTFOLIO</p>
      <div className="article_container">
        <img
          src={currentVideo === 0 ? "" : "/images/arrow_left.png"}
          alt=""
          onClick={() => {
            setCurrentVideo(currentVideo - 1);
          }}
        />
        <div className="youtube_box">
          <YouTube
            videoId={lists && lists[currentVideo].file_id}
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
            lists && currentVideo === lists.length - 1
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
  );
};

export default MainS2;
