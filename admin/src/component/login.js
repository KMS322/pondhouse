import "../css/login.css";
import SubHeader from "./subHeader";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
const Login = () => {
  const navigate = useNavigate();
  const [adminId, setAdminId] = useState("");
  const [adminPw, setAdminPw] = useState("");
  const onChangeId = (e) => {
    setAdminId(e.target.value);
  };
  const onChangePw = (e) => {
    setAdminPw(e.target.value);
  };
  const submit = () => {
    if (adminId === "admin" && adminPw === "admin") {
      navigate("/main");
    } else {
      alert("아이디 혹은 비밀번호가 틀렸습니다.");
    }
  };
  return (
    <>
      <SubHeader />
      <div className="login">
        <p>로그인</p>
        <div className="input_box">
          <input
            type="text"
            name="admin_id"
            value={adminId}
            onChange={onChangeId}
            placeholder="아이디"
          />
          <input
            type="password"
            name="adminPw"
            value={adminPw}
            placeholder="비밀번호"
            onChange={onChangePw}
          />
        </div>
        <div className="btn" onClick={submit}>
          로그인
        </div>
      </div>
    </>
  );
};

export default Login;
