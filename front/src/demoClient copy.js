import React, { useState } from "react";
import axios from "axios";

const DemoClient = () => {
  const [responseData, setResponseData] = useState("");

  const REST_Call = (path) => {
    axios
      .get(`http://localhost:4000${path}`, {
        params: {},
        withCredentials: true,
      })
      .then(({ data }) => {
        console.log(data);
        setResponseData(JSON.stringify(data));
      })
      .catch((err) => {
        console.log(err);
        setResponseData(JSON.stringify(err));
      });
  };

  return (
    <>
      <h1>1. 카카오 로그인 및 프로필 조회 예제</h1>
      <pre>
        - [KOE101, KOE004] 내 애플리케이션>제품 설정>카카오 로그인 > 활성화 설정
        : ON - [KOE006] 내 애플리케이션>제품 설정>카카오 로그인 > Redirect URI :
        http://localhost:4000/redirect
      </pre>

      <div className="text-center">
        {/* <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script> */}

        <a href="http://localhost:4000/authorize">
          <img
            src="//k.kakaocdn.net/14/dn/btqCn0WEmI3/nijroPfbpCa4at5EIsjyf0/o.jpg"
            width="222"
            alt="Kakao Login Button"
          />
        </a>
        <br />

        <button onClick={() => REST_Call("/profile")}>프로필 조회</button>
        <br />

        <textarea
          id="contents"
          rows="20"
          cols="100"
          value={responseData}
        ></textarea>
        <br />

        <a href="http://localhost:4000/authorize?scope=talk_message">
          <h2>친구목록 조회와 메세지 발송 권한 획득</h2>
        </a>
        <br />

        {/* <button onClick={() => REST_Call("/friends")}>친구목록 조회</button> */}
        <br />
        <br />
        <button onClick={() => REST_Call("/message")}>
          나에게 메시지 발송
        </button>
        <br />

        <input type="text" id="uuids" />
        {/* <button
          onClick={() =>
            REST_Call(
              `/friends_message?uuids=${document.getElementById("uuids").value}`
            )
          }
        >
          친구에게 메시지 발송
        </button> */}
        <button onClick={() => REST_Call("/logout")}>로그아웃</button>
        <br />
      </div>
    </>
  );
};

export default DemoClient;
