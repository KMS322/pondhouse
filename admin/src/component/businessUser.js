import "../css/table.css";
import "../css/businessUser.css";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

const BusinessUser = ({ onSelectDetail }) => {
  const dispatch = useDispatch();
  const { allUsers, userBusinesses } = useSelector((state) => state.adminUser);
  const previousComponent = "구인기업";
  const [modalOpen, setModalOpen] = useState(false);
  const [modalData, setModalData] = useState();
  const handleModal = (data) => {
    setModalData(data);
    setModalOpen(true);
  };

  return (
    <div className="section businessUser">
      <div className="table_container">
        <div className="row row_head">
          <p>No</p>
          <p>회사명</p>
          <p>주소</p>
          <p>근무형태</p>
          <p>보수</p>
        </div>
        {userBusinesses &&
          userBusinesses.map((userBusiness, index) => {
            const array = userBusiness.business_member_jibunAddress.split(" ");
            const userDetail = allUsers.find(
              (user) => user.id === userBusiness.BusinessId
            );
            const business = userBusinesses.find(
              (user) => user.BusinessId === userBusiness.BusinessId
            );
            const businessId = userBusiness.BusinessId;
            return (
              <div
                className={
                  index % 2 === 0 ? "content_row row" : "content_row row even"
                }
                key={index}
                style={{ cursor: "pointer" }}
                onClick={() => {
                  onSelectDetail("구인기업 정보 상세", {
                    userBusiness,
                    userDetail,
                  });
                }}
              >
                <p>{userBusiness.id}</p>
                <p>{userBusiness.business_member_companyName}</p>
                <p>{`${array[0]} ${array[1]} ${array[2]}`}</p>
                <p>{business.business_member_workType}</p>
                <p>{userBusiness.business_member_pay}</p>
                <p
                  className="btn"
                  // onClick={(e) =>
                  //   e.stopPropagation() ||
                  //   onSelectDetail("공고내용", {
                  //     businessId,
                  //     previousComponent,
                  //   })
                  // }
                  onClick={(e) =>
                    e.stopPropagation() ||
                    onSelectDetail("공고목록", {
                      businessId,
                      previousComponent,
                    })
                  }
                >
                  공고목록
                </p>
                <p
                  className="btn"
                  onClick={(e) =>
                    e.stopPropagation() ||
                    onSelectDetail("채용담당", {
                      businessId,
                    })
                  }
                >
                  채용담당
                </p>
                <p
                  className="btn"
                  onClick={(e) => {
                    e.stopPropagation() || handleModal(userBusiness);
                  }}
                >
                  연락처
                </p>
              </div>
            );
          })}
      </div>
      {modalOpen && modalData && (
        <div className="modal">
          <p>회사명 : {modalData.business_member_companyName}</p>
          <p>연락처 : {modalData.business_member_tel}</p>
          <p>이메일 : {modalData.business_member_email}</p>
          <button
            onClick={() => {
              setModalOpen(false);
            }}
          >
            확인
          </button>
        </div>
      )}
    </div>
  );
};

export default BusinessUser;
