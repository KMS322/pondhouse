import "../css/table.css";
import "../css/allApplications.css";
import dayjs from "dayjs";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { LOAD_ALLAPPLICATIONS_REQUEST } from "../reducers/adminBusiness";
const AllApplications = ({ onSelectDetail }) => {
  const dispatch = useDispatch();
  const { allApplications } = useSelector((state) => state.adminBusiness);
  const { userBusinesses, allUsers } = useSelector((state) => state.adminUser);
  const previousComponent = "구인신청서 목록";
  useEffect(() => {
    dispatch({
      type: LOAD_ALLAPPLICATIONS_REQUEST,
    });
  }, []);

  return (
    <div className="section allApplications">
      <div className="table_container">
        <div className="row row_head">
          <p>No</p>
          <p>아이디</p>
          <p>회사명</p>
          <p>신청서 제목</p>
          <p>지역</p>
          <p>등록일</p>
        </div>
        {allApplications &&
          allApplications.map((allApplication, index) => {
            const user = allUsers.find(
              (user) => user.id === allApplication.BusinessId
            );
            const userDetail = userBusinesses.find(
              (user) => user.BusinessId === allApplication.BusinessId
            );
            const array = userDetail.business_member_jibunAddress.split(" ");
            const businessId = allApplication.BusinessId;
            return (
              <div
                className={
                  index % 2 === 0 ? "content_row row" : "content_row row even"
                }
                onClick={(e) =>
                  onSelectDetail("공고내용", {
                    businessId,
                    previousComponent,
                  })
                }
                key={index}
                style={{ cursor: "pointer" }}
              >
                <p>{allApplication.id}</p>
                <p>{user.user_member_id}</p>
                <p>{userDetail.business_member_companyName}</p>
                <p>{allApplication.business_application_title}</p>
                <p>{array[0]}</p>
                <p>{dayjs(allApplication.createdAt).format("YYYY.MM.DD")}</p>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default AllApplications;
