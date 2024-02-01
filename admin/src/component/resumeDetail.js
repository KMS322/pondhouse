import "../css/detail.css";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { LOAD_RESUME_REQUEST } from "../reducers/adminIndividual";
const ResumeDetail = ({ onSelectMenu, data }) => {
  const individualId = data.individualId;
  const { allUsers, userIndividuals } = useSelector((state) => state.adminUser);
  const { resume } = useSelector((state) => state.adminIndividual);
  const user = allUsers.find((id) => id.id === data.individualId);
  const individual = userIndividuals.find(
    (id) => id.IndividualId === data.individualId
  );
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({
      type: LOAD_RESUME_REQUEST,
      data: {
        individualId,
      },
    });
  }, []);
  return (
    <div className="detail individual">
      <div className="detail_container">
        <div
          className="back_btn"
          onClick={() => {
            onSelectMenu(data.previousComponent);
          }}
        >
          돌아가기
        </div>
        <div className="user_box">
          <p>아이디 : {user.user_member_id}</p>
          <p>이름 : {individual.user_member_name}</p>
        </div>

        <div className="title">이력서</div>
        {resume && (
          <>
            <div className="text_box">
              <p className="text_title">이력서 제목</p>
              <p className="text_content">{resume.user_resume_title}</p>
            </div>
            <div className="text_box">
              <p className="text_title">전공</p>
              <p className="text_content">{resume.user_resume_schoolMajor}</p>
            </div>
            <div className="text_box">
              <p className="text_title">재학기간</p>
              <p className="text_content">
                {`${resume.user_resume_schoolPeriod1Year}년 ${resume.user_resume_schoolPeriod1Month}월 ~ ${resume.user_resume_schoolPeriod2Year}년 ${resume.user_resume_schoolPeriod2Month}월`}
              </p>
            </div>
            <div className="text_box">
              <p className="text_title">최종학력</p>
              <p className="text_content">{resume.user_resume_schoolFinal}</p>
            </div>
            <div className="text_box">
              <p className="text_title">희망근무처</p>
              <p className="text_content">{resume.user_resume_hopeCompany}</p>
            </div>
            <div className="text_box">
              <p className="text_title">근무지역</p>
              <p className="text_content">
                {`1순위 : ${resume.user_resume_hopeRegion1} 2순위 : ${resume.user_resume_hopeRegion2}`}
              </p>
            </div>
            <div className="text_box">
              <p className="text_title">희망임금</p>
              <p className="text_content">
                {`임금주기 : ${resume.user_resume_hopePayType1} 임금 : ${Number(
                  resume.user_resume_hopePay
                ).toLocaleString()}원`}
              </p>
            </div>
            <div className="text_box">
              <p className="text_title">고용형태</p>
              <p className="text_content">
                {`${resume.user_resume_hopeWork1 ? "출근근무" : ""} ${
                  resume.user_resume_hopeWork2 ? "탄력근무" : ""
                } ${resume.user_resume_hopeWork3 ? "재택근무" : ""} ${
                  resume.user_resume_hopeWork4 ? "모두가능" : ""
                }`}
              </p>
            </div>
            <div className="text_box">
              <p className="text_title">취업희망 시기</p>
              <p className="text_content">
                {`${resume.user_resume_hopeStartYear}년 ${resume.user_resume_hopeStartMonth}월 ${resume.user_resume_hopeStartDay}일 부터`}
              </p>
            </div>
            <div className="text_box">
              <p className="text_title">근무 가능 시간</p>
              <p className="text_content">
                {`${resume.user_resume_hopeWorkTime1Hour} : ${resume.user_resume_hopeWorkTime1Minute} ~ ${resume.user_resume_hopeWorkTime2Hour} : ${resume.user_resume_hopeWorkTime2Minute} `}
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ResumeDetail;
