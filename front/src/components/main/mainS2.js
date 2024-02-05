import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { LOAD_LISTS_REQUEST } from "../../reducers/videoList";
const MainS2 = () => {
  const dispatch = useDispatch();
  const [currentVideo, setCurrentVideo] = useState(1);
  const { lists } = useSelector((state) => state.videoList);
  console.log("lists : ", lists);
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
        <video
          src={`/videos/${lists && lists[currentVideo].file_name}`}
          alt=""
          controls
          muted
          autoPlay
        />
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
