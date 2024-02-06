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
        {/* <video
          src={`/videos/${lists && lists[currentVideo].file_name}`}
          alt=""
          controls
          muted
          autoPlay
        /> */}
        <div className="youtube_box">
          <YouTube
            //videoId : https://www.youtube.com/watch?v={videoId} 유튜브 링크의 끝부분에 있는 고유한 아이디
            videoId="Npm1McQBDEM"
            //opts(옵션들): 플레이어의 크기나 다양한 플레이어 매개 변수를 사용할 수 있음.
            //밑에서 더 설명하겠습니다.
            opts={{
              playerVars: {
                autoplay: 1, //자동재생 O
                rel: 0, //관련 동영상 표시하지 않음 (근데 별로 쓸모 없는듯..)
                modestbranding: 1, // 컨트롤 바에 youtube 로고를 표시하지 않음
              },
            }}
            //이벤트 리스너
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
