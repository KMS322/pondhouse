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

  const talk = () => {
    axios
      .get("http://localhost:4000/authorize?scope=talk_message", {
        withCredentials: true,
      })
      .then((req) => {
        console.log("req : ", req);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const gainCode = () => {
    axios.get("http://localhost:4000/gain");
  };
  return (
    <>
      <div className="text-center">
        <textarea
          id="contents"
          rows="20"
          cols="100"
          value={responseData}
        ></textarea>
        <br />

        <a href="http://localhost:4000/authorize?scope=talk_message">
          {/* <h2 onClick={talk}>친구목록 조회와 메세지 발송 권한 획득</h2> */}
          <h2>친구목록 조회와 메세지 발송 권한 획득</h2>
        </a>
        <h2 onClick={gainCode}>code 획득</h2>

        <br />

        {/* <button onClick={() => REST_Call("/friends")}>친구목록 조회</button> */}
        <br />
        <br />
        <button onClick={() => REST_Call("/message")}>
          나에게 메시지 발송
        </button>
        <br />

        <br />
      </div>
    </>
  );
};

export default DemoClient;
