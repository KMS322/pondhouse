import "../css/detail.css";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { LOAD_CAREER_REQUEST } from "../reducers/adminIndividual";
const CareerDetail = ({ onSelectMenu, data }) => {
  const individualId = data.individualId;
  const { career } = useSelector((state) => state.adminIndividual);
  console.log("career : ", career);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({
      type: LOAD_CAREER_REQUEST,
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
            onSelectMenu("구직자");
          }}
        >
          돌아가기
        </div>
        <div className="title">경력사항</div>
        {career && (
          <>
            <div className="text_box">
              <p className="text_title" style={{ fontWeight: "700" }}>
                경력사항1.
              </p>
            </div>
            <div className="text_box">
              <p className="text_title">근무처</p>
              <p className="text_content">{career.user_career_company1}</p>
            </div>
            <div className="text_box">
              <p className="text_title">직위</p>
              <p className="text_content">{career.user_career_position1}</p>
            </div>
            <div className="text_box">
              <p className="text_title">담당 사업장 형태와 업태</p>
              <p className="text_content">{career.user_career_companyState1}</p>
            </div>
            <div className="text_box">
              <p className="text_title">사용 프로그램</p>
              <p className="text_content">{career.user_career_program1}</p>
            </div>
            <div className="text_box">
              <p className="text_title">근무기간</p>
              <p className="text_content">{`${career.user_career_period11Year}년 ${career.user_career_period11Month}월 ~ ${career.user_career_period12Year}년 ${career.user_career_period12Month}월`}</p>
            </div>
            <div className="text_box">
              <p className="text_title" style={{ fontWeight: "700" }}>
                보유자격1.
              </p>
            </div>
            <div className="text_box">
              <p className="text_title">자격명</p>
              <p className="text_content">{career.user_career_license1}</p>
            </div>
            <div className="text_box">
              <p className="text_title">취득일</p>
              <p className="text_content">{`${career.user_career_license1Year}년 ${career.user_career_license1Month}월 ${career.user_career_license1Day}일`}</p>
            </div>
            <div className="text_box">
              <p className="text_title">발급기관</p>
              <p className="text_content">
                {career.user_career_license1Organization}
              </p>
            </div>
            <div className="text_box">
              <p className="text_title" style={{ fontWeight: "700" }}>
                교육훈련 이수현황
              </p>
            </div>
            <div className="text_box">
              <p className="text_title">훈련 과정명</p>
              <p className="text_content">{career.user_career_trainingName1}</p>
            </div>
            <div className="text_box">
              <p className="text_title">훈련기간</p>
              <p className="text_content">{`${career.user_career_trainingPeriod11Year}년 ${career.user_career_trainingPeriod11Month}월 ~ ${career.user_career_trainingPeriod12Year}년 ${career.user_career_trainingPeriod12Month}월`}</p>
            </div>
            <div className="text_box">
              <p className="text_title">세부훈련내용</p>
              <p className="text_content">
                {career.user_career_trainingDetail1}
              </p>
            </div>
            <div className="text_box">
              <p className="text_title">훈련기관명</p>
              <p className="text_content">
                {career.user_career_trainingOrganization}
              </p>
            </div>
            <div className="text_box">
              <p className="text_title" style={{ fontWeight: "700" }}>
                이직경력
              </p>
            </div>
            <div className="text_box">
              <p className="text_title">최종이직시기</p>
              <p className="text_content">{`${career.user_career_changeYear}년 ${career.user_career_changeMonth}월`}</p>
            </div>
            <div className="text_box">
              <p className="text_title">이직사유</p>
              <p className="text_content">{career.user_career_changeReason}</p>
            </div>
            <div className="text_box">
              <p className="text_title" style={{ fontWeight: "700" }}>
                회계 및 세무 지식
              </p>
            </div>
            <div className="text_box">
              <p className="text_title">회계지식</p>
              <p className="text_content">{career.user_career_knowCount}</p>
            </div>
            <div className="text_box">
              <p className="text_title">세무(법)지식</p>
              <p className="text_content">{career.user_career_knowTax}</p>
            </div>
            <div className="text_box">
              <p className="text_title" style={{ fontWeight: "700" }}>
                그 외 능력
              </p>
            </div>
            <div className="text_box">
              <p className="text_title">전산활용능력</p>
              <p className="text_content">{`
              ${career.user_career_abilityProcess1 ? "문서작성" : ""} 
              ${
                career.user_career_abilityProcess2 ? "스프레드시트" : ""
              }          
              ${
                career.user_career_abilityProcess3 ? "프레젠테이션" : ""
              }          
              ${
                career.user_career_abilityProcess4 ? "회계프로그램" : ""
              }          
              ${career.user_career_abilityProcess5 ? "기타" : ""}
              `}</p>
            </div>
            <div className="text_box">
              <p className="text_title">운전능력</p>
              <p className="text_content">{`
              ${career.user_career_abilityDrive1 ? "운전면허증" : ""} 
              ${career.user_career_abilityDrive2 ? "차량소지자" : ""} 
              `}</p>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default CareerDetail;
