import "../css/detail.css";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { LOAD_APPLICATION_REQUEST } from "../reducers/adminBusiness";

const ApplicationDetail = ({ onSelectMenu, data }) => {
  const businessId = data.businessId;
  const { allUsers, userBusinesses } = useSelector((state) => state.adminUser);
  const { application } = useSelector((state) => state.adminBusiness);
  const user = allUsers.find((id) => id.id === data.businessId);
  const business = userBusinesses.find(
    (id) => id.BusinessId === data.businessId
  );
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({
      type: LOAD_APPLICATION_REQUEST,
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
            onSelectMenu(data.previousComponent);
          }}
        >
          돌아가기
        </div>
        <div className="user_box">
          <p>아이디 : {user.user_member_id}</p>
          <p>회사 이름 : {business.business_member_companyName}</p>
        </div>
        <div className="title">공고내용</div>
        {application && (
          <>
            <div className="text_box">
              <p className="text_title">모집 직종</p>
              <p className="text_content">
                {application.business_application_type}
              </p>
            </div>
            <div className="text_box">
              <p className="text_title">모집인원</p>
              <p className="text_content">
                {application.business_application_number} 명
              </p>
            </div>
            <div className="text_box">
              <p className="text_title">근무시기</p>
              <p className="text_content">
                {`${application.business_application_startYear}년 ${application.business_application_startMonth}월 부터`}
              </p>
            </div>
            <div className="text_box">
              <p className="text_title">예상 근무기간</p>
              <p className="text_content">
                {application.business_application_expectPeriod}
              </p>
            </div>
            <div className="text_box">
              <p className="text_title">직무 내용</p>
              <p className="text_content">
                {`${
                  (application.business_application_workContent1 &&
                    "기상·신고") ||
                  ""
                } ${
                  (application.business_application_workContent2 && "결산") ||
                  ""
                }
                ${
                  (application.business_application_workContent3 && "조정") ||
                  ""
                }
                ${
                  (application.business_application_workContent4 &&
                    "회계감사") ||
                  ""
                }
                ${
                  (application.business_application_workContent5 &&
                    "세무조사") ||
                  ""
                }
                ${
                  (application.business_application_workContent6 && "컨설팅") ||
                  ""
                }
                ${
                  (application.business_application_workContent7 &&
                    "연구개발비정산") ||
                  ""
                }`}
              </p>
            </div>
            <div className="text_box">
              <p className="text_title">사용 프로그램</p>
              <p className="text_content">
                {`${
                  (application.business_application_program && "더죤") || ""
                } ${application.business_application_program1}`}
              </p>
            </div>
            <div className="text_box">
              <p className="text_title">경력</p>
              <p className="text_content">
                {application.business_application_career}
              </p>
            </div>
            <div className="text_box">
              <p className="text_title">학력</p>
              <p className="text_content">
                {application.business_application_schoolFinal}
              </p>
            </div>
            <div className="text_box">
              <p className="text_title">자격·면허</p>
              <p className="text_content">
                {application.business_application_schoolLisence}
              </p>
            </div>
            <div className="text_box">
              <p className="text_title">임금</p>
              <p className="text_content">
                {`${application.business_application_payType} : ${application.business_application_payMin}원 ~ ${application.business_application_payMax}원`}
              </p>
            </div>
            <div className="text_box">
              <p className="text_title">근무 시간</p>
              <p className="text_content">
                {`${application.business_application_workTime1Hour} : ${application.business_application_workTime1Minute} ~ ${application.business_application_workTime2Hour} : ${application.business_application_workTime2Minute}`}
                <br />
                {`${application.business_application_workTimeDay}일 ${application.business_application_workTimeHour}`}
              </p>
            </div>
            <div className="text_box">
              <p className="text_title">휴게 시간</p>
              <p className="text_content">
                {`${application.business_application_breakTime1Hour} : ${application.business_application_breakTime1Minute} ~ ${application.business_application_breakTime2Hour} : ${application.business_application_breakTime2Minute}`}
              </p>
            </div>
            <div className="text_box">
              <p className="text_title">근무 장소</p>
              <p className="text_content">
                {application.business_application_workPlace}
              </p>
            </div>
            <div className="text_box">
              <p className="text_title">퇴직 급여</p>
              <p className="text_content">
                {application.business_application_severancePay}
              </p>
            </div>
            <div className="text_box">
              <p className="text_title">고용 형태</p>
              <p className="text_content">
                {application.business_application_employmentType}
              </p>
            </div>
            <div className="text_box">
              <p className="text_title">채용우선순위</p>
              <p className="text_content">
                {`근무시작 가능 시기 : ${application.business_application_rank1}`}
                <br />
                {`경력 : ${application.business_application_rank2}`}
                <br />
                {`근무형태 : ${application.business_application_rank3}`}
                <br />
                {`거주지 : ${application.business_application_rank4}`}
                <br />
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ApplicationDetail;
