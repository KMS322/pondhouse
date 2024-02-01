import "../css/detail.css";
import React from "react";
import dayjs from "dayjs";
const BusinessDetail = ({ onSelectMenu, userData }) => {
  const { userBusiness, userDetail } = userData;
  console.log("userBusiness : ", userBusiness);
  return (
    <div className="detail individual">
      <div className="detail_container">
        <div
          className="back_btn"
          onClick={() => {
            onSelectMenu("구인기업");
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
          <p className="text_title">사업장명</p>
          <p className="text_content">
            {userBusiness.business_member_companyName}
          </p>
        </div>
        <div className="text_box">
          <p className="text_title">사업자등록번호</p>
          <p className="text_content">
            {userBusiness.business_member_companyNumber}
          </p>
        </div>
        <div className="text_box">
          <p className="text_title">대표자</p>
          <p className="text_content">{userBusiness.business_member_name}</p>
        </div>
        <div className="text_box">
          <p className="text_title">사업자</p>
          <p className="text_content">
            {userBusiness.business_member_companyState}
          </p>
        </div>
        <div className="text_box">
          <p className="text_title">근로자 수</p>
          <p className="text_content">
            {userBusiness.business_member_employeeNumber}
          </p>
        </div>
        <div className="text_box">
          <p className="text_title">사무실 형태</p>
          <p className="text_content">
            {userBusiness.business_member_officeState}
          </p>
        </div>
        <div className="text_box">
          <p className="text_title">주소</p>
          <p className="text_content">
            {`${userBusiness.business_member_jibunAddress} ${userBusiness.business_member_detailAddress}`}
          </p>
        </div>
        <div className="text_box">
          <p className="text_title">대표 전화번호</p>
          <p className="text_content">{userBusiness.business_member_tel}</p>
        </div>
        <div className="text_box">
          <p className="text_title">이메일</p>
          <p className="text_content">{userBusiness.business_member_email}</p>
        </div>
      </div>
    </div>
  );
};

export default BusinessDetail;
