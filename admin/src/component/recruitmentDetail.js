import "../css/detail.css";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { LOAD_RECRUITMENT_REQUEST } from "../reducers/adminBusiness";

const RecruitmentDetail = ({ onSelectMenu, data }) => {
  const businessId = data.businessId;
  const { recruitment } = useSelector((state) => state.adminBusiness);
  const dispatch = useDispatch();
  console.log("recruitment : ", recruitment);
  useEffect(() => {
    dispatch({
      type: LOAD_RECRUITMENT_REQUEST,
      data: {
        businessId,
      },
    });
  }, []);
  return (
    <div className="detail business">
      <div className="detail_container">
        <div
          className="back_btn"
          onClick={() => {
            onSelectMenu("구인기업");
          }}
        >
          돌아가기
        </div>
        <div className="title">채용담당</div>
        {recruitment && (
          <>
            <div className="text_box">
              <p className="text_title">성명</p>
              <p className="text_content">
                {recruitment.business_recruitment_name}
              </p>
            </div>
            <div className="text_box">
              <p className="text_title">전화</p>
              <p className="text_content">
                {recruitment.business_recruitment_tel}
              </p>
            </div>
            <div className="text_box">
              <p className="text_title">이메일</p>
              <p className="text_content">
                {recruitment.business_recruitment_email}
              </p>
            </div>
            <div className="text_box">
              <p className="text_title">휴대전화</p>
              <p className="text_content">
                {recruitment.business_recruitment_phone}
              </p>
            </div>
            <div className="text_box">
              <p className="text_title">사회보험</p>
              <p className="text_content">
                {`${
                  (recruitment.business_recruitment_insurance1 && "고용보험") ||
                  ""
                } 
                ${
                  (recruitment.business_recruitment_insurance2 && "산재보험") ||
                  ""
                }
                ${
                  (recruitment.business_recruitment_insurance3 && "건강보험") ||
                  ""
                }
                ${
                  (recruitment.business_recruitment_insurance4 && "국민연금") ||
                  ""
                }
                ${
                  (recruitment.business_recruitment_insurance5 &&
                    "해당사항 없음") ||
                  ""
                }`}
              </p>
            </div>
            <div className="text_box">
              <p className="text_title">복리후생</p>
              <p className="text_content">
                {`${
                  (recruitment.business_recruitment_welfare1 && "통근버스") ||
                  ""
                } 
                ${
                  (recruitment.business_recruitment_welfare2 && "차량유지비") ||
                  ""
                }
                ${(recruitment.business_recruitment_welfare3 && "기숙사") || ""}
                ${(recruitment.business_recruitment_welfare4 && "교육비") || ""}
                ${
                  (recruitment.business_recruitment_welfare5 &&
                    "모성 보호 시설") ||
                  ""
                }
                ${
                  (recruitment.business_recruitment_welfare6 &&
                    "자녀 학자금 지원") ||
                  ""
                }
                ${
                  (recruitment.business_recruitment_welfare7 && "주택자금") ||
                  ""
                }
                ${
                  (recruitment.business_recruitment_welfare8 &&
                    "직원대출제도") ||
                  ""
                }
                ${(recruitment.business_recruitment_welfare9 && "기타") || ""}
                ${recruitment.business_recruitment_welfare10}
                `}
              </p>
            </div>
            <div className="text_box">
              <p className="text_title">식사제공</p>
              <p className="text_content">
                {recruitment.business_recruitment_meal}
              </p>
            </div>
            <div className="text_box">
              <p className="text_title">장애인용 복지시설</p>
              <p className="text_content">
                {`${
                  (recruitment.business_recruitment_handicapped1 && "주차장") ||
                  ""
                }
                ${
                  (recruitment.business_recruitment_handicapped2 && "승강기") ||
                  ""
                }
                ${
                  (recruitment.business_recruitment_handicapped3 &&
                    "건물 내부 경사로") ||
                  ""
                }
                ${
                  (recruitment.business_recruitment_handicapped4 && "화장실") ||
                  ""
                }
                ${
                  (recruitment.business_recruitment_handicapped5 && "기타") ||
                  ""
                }
                ${recruitment.business_recruitment_handicapped6} 
                `}
              </p>
            </div>
            <div className="text_box">
              <p className="text_title">전산활용</p>
              <p className="text_content">
                {`${
                  (recruitment.business_recruitment_program1 && "문서 작성") ||
                  ""
                }
                ${
                  (recruitment.business_recruitment_program2 &&
                    "스프레드시트") ||
                  ""
                }
                ${
                  (recruitment.business_recruitment_program3 &&
                    "프레젠테이션") ||
                  ""
                }
                ${
                  (recruitment.business_recruitment_program4 &&
                    "회계프로그램") ||
                  ""
                }
                ${(recruitment.business_recruitment_program5 && "기타") || ""}
                ${recruitment.business_recruitment_program6} 
                `}
              </p>
            </div>
            <div className="text_box">
              <p className="text_title">회계프로그램</p>
              <p className="text_content">
                {recruitment.business_recruitment_accountingProgram}
                <br />
                수준 : {recruitment.business_recruitment_accountingProgramLevel}
              </p>
            </div>
            <div className="text_box">
              <p className="text_title">운전</p>
              <p className="text_content">
                {(recruitment.business_recruitment_abilityDrive1 &&
                  "운전면허증") ||
                  ""}
                {(recruitment.business_recruitment_abilityDrive2 &&
                  "차량소지자") ||
                  ""}
              </p>
            </div>
            <div className="text_box">
              <p className="text_title">전공</p>
              <p className="text_content">
                {recruitment.business_recruitment_major2}
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default RecruitmentDetail;
