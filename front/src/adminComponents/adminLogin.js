import "../css/adminLogin.css";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { LOG_IN_REQUEST } from "../reducers/user";
const AdminLogin = () => {
  const dispatch = useDispatch();
  const { logInDone, me } = useSelector((state) => state.user);
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
    dispatch({
      type: LOG_IN_REQUEST,
      data: {
        adminId,
        adminPw,
      },
    });
  };
  useEffect(() => {
    if (logInDone) {
      navigate("/adminMain", { state: { me } });
    }
  }, [logInDone]);
  return (
    <>
      <div className="adminLogin">
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
        <div className="text_box">
          <p
            onClick={() => {
              navigate("/adminSignup");
            }}
          >
            관리자 계정 가입
          </p>
          {/* <p>비밀번호 찾기/변경</p> */}
        </div>
        <div className="btn" onClick={submit}>
          로그인
        </div>
      </div>
    </>
  );
};

export default AdminLogin;
