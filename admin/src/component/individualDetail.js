import "../css/detail.css";
import React from "react";
import dayjs from "dayjs";
const IndividualDetail = ({ onSelectMenu, userData }) => {
  const { userIndividual, userDetail } = userData;
  return (
    <div className="detail individual">
      <div className="detail_container">
        <div
          className="back_btn"
          onClick={() => {
            onSelectMenu("구직자");
          }}
        >
          돌아가기
        </div>
        <div className="title">{userDetail.user_member_id} 상세 정보</div>
        <div className="text_box">
          <p className="text_title">아이디</p>
          <p className="text_content">{userDetail.user_member_id}</p>
        </div>
        <div className="text_box">
          <p className="text_title">이름</p>
          <p className="text_content">{userIndividual.user_member_name}</p>
        </div>
        <div className="text_box">
          <p className="text_title">생년월일</p>
          <p className="text_content">{userIndividual.user_member_num}</p>
        </div>
        <div className="text_box">
          <p className="text_title">주소</p>
          <p className="text_content">
            {`${userIndividual.user_member_jibunAddress} ${userIndividual.user_member_detailAddress}`}
          </p>
        </div>
        <div className="text_box">
          <p className="text_title">휴대전화</p>
          <p className="text_content">{userIndividual.user_member_tel}</p>
        </div>
        <div className="text_box">
          <p className="text_title">이메일</p>
          <p className="text_content">{userIndividual.user_member_email}</p>
        </div>
        <div className="text_box">
          <p className="text_title">가입일</p>
          <p className="text_content">
            {dayjs(userIndividual.createdAt).format("YYYY.MM.DD")}
          </p>
        </div>
      </div>
    </div>
  );
};

export default IndividualDetail;
