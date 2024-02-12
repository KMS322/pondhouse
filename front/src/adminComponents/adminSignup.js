import "../css/adminSignup.css";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { SIGN_UP_REQUEST } from "../reducers/user";
const AdminSignup = () => {
  const dispatch = useDispatch();
  const { signUpDone } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const [adminId, setAdminId] = useState("");
  const [adminPw, setAdminPw] = useState("");
  const [adminPwCheck, setAdminPwCheck] = useState("");
  const onChangeId = (e) => {
    setAdminId(e.target.value);
  };
  const onChangePw = (e) => {
    setAdminPw(e.target.value);
  };
  const onChangePwCheck = (e) => {
    setAdminPwCheck(e.target.value);
  };
  const submit = () => {
    dispatch({
      type: SIGN_UP_REQUEST,
      data: {
        adminId,
        adminPw,
      },
    });
  };
  useEffect(() => {
    if (signUpDone) {
      window.location.href = "/admin";
    }
  }, [signUpDone]);
  return (
    <>
      <div className="adminSignup">
        <p>관리자 회원 가입</p>
        <div className="input_box_container">
          <div className="input_box">
            <p>아이디</p>
            <input
              type="text"
              name="admin_id"
              value={adminId}
              onChange={onChangeId}
              placeholder="아이디"
            />
          </div>
          <div className="input_box">
            <p>비밀번호</p>
            <input
              type="password"
              name="adminPw"
              value={adminPw}
              placeholder="비밀번호"
              onChange={onChangePw}
            />
          </div>
          <div className="input_box">
            <p>비밀번호 확인</p>
            <input
              type="password"
              name="adminPwCheck"
              value={adminPwCheck}
              placeholder="비밀번호"
              onChange={onChangePwCheck}
            />
          </div>
        </div>

        <div className="btn" onClick={submit}>
          회원가입
        </div>
      </div>
    </>
  );
};

export default AdminSignup;
