import "../css/table.css";
import "../css/process.css";
import dayjs from "dayjs";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { LOAD_APPLIEDLISTS_REQUEST } from "../reducers/adminBusiness";
const Process = ({ onSelectDetail }) => {
  const dispatch = useDispatch();
  const { appliedLists } = useSelector((state) => state.adminBusiness);
  const { userBusinesses } = useSelector((state) => state.adminUser);
  useEffect(() => {
    dispatch({
      type: LOAD_APPLIEDLISTS_REQUEST,
    });
  }, []);
  const previousComponent = "구인신청 진행사항";

  return (
    <div className="section process">
      <div className="table_container">
        <div className="row row_head">
          <p>No</p>
          <p>회사명</p>
          <p>채용제목</p>
          <p>진행단계</p>
          <p>결제금액</p>
          <p>지역</p>
          <p>등록일</p>
        </div>
        {appliedLists &&
          appliedLists.map((list, index) => {
            const business =
              userBusinesses &&
              userBusinesses.find(
                (business) => business.BusinessId === list.BusinessId
              );
            const address = business.business_member_jibunAddress.split(" ");
            const businessId = list.BusinessId;
            return (
              <div
                className={
                  index % 2 === 0 ? "content_row row" : "content_row row even"
                }
                key={index}
                onClick={(e) =>
                  onSelectDetail("상세 진행사항", {
                    businessId,
                    previousComponent,
                    list,
                    business,
                  })
                }
                style={{ cursor: "pointer" }}
              >
                <p>{index + 1}</p>
                <p>{business.business_member_companyName}</p>
                <p>{list.business_application_name}</p>
                <p>{list.progressStep}</p>
                <p>{business.business_member_pay}</p>
                <p>{`${address[0]} ${address[1]} ${address[2]}`}</p>
                <p>{dayjs(business.createAt).format("YYYY.MM.DD")}</p>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Process;
