import "../css/table.css";
import "../css/applicationList.css";
import dayjs from "dayjs";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { LOAD_APPLICATION_REQUEST } from "../reducers/adminBusiness";
const ApplicationList = ({ onSelectMenu, data }) => {
  const businessId = data.businessId;
  const { application } = useSelector((state) => state.adminBusiness);
  const { userBusinesses } = useSelector((state) => state.adminUser);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({
      type: LOAD_APPLICATION_REQUEST,
      data: {
        businessId,
      },
    });
  }, []);
  console.log("userBusinesses : ", userBusinesses);
  const userDetail = userBusinesses.find(
    (user) => user.BusinessId === businessId
  );
  const array = userDetail.business_member_jibunAddress.split(" ");
  return (
    <div className="section applicationList">
      <div className="table_container">
        <div
          className="back_btn"
          onClick={() => {
            onSelectMenu("구인기업");
          }}
        >
          돌아가기
        </div>
        <div className="user_box">
          <p>회사 : {userDetail.business_member_companyName}</p>
        </div>
        <div className="row row_head">
          <p>No</p>
          <p>채용제목</p>
          <p>모집직종</p>
          <p>지역</p>
          <p>신청일</p>
          <p>등록일</p>
        </div>
        {application &&
          application.map((app, index) => {
            return (
              <div
                className={
                  index % 2 === 0 ? "content_row row" : "content_row row even"
                }
                // onClick={(e) =>
                //   onSelectDetail("공고내용", {
                //     businessId,
                //     previousComponent,
                //   })
                // }
                key={index}
                style={{ cursor: "pointer" }}
              >
                <p>{app.id}</p>
                <p>{app.business_application_name}</p>
                <p>{app.business_application_type}</p>
                <p>{array[0]}</p>
                <p>{app.applyDay ? app.applyDay : "신청전"}</p>
                <p>{dayjs(app.createdAt).format("YYYY.MM.DD")}</p>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default ApplicationList;
