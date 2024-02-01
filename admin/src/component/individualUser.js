import "../css/table.css";
import "../css/individualUser.css";
import React, { useState } from "react";
import { useSelector } from "react-redux";

const IndividualUser = ({ onSelectDetail }) => {
  const { allUsers, userIndividuals } = useSelector((state) => state.adminUser);

  const age = (num) => {
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentAge = currentYear - parseInt(num.substring(0, 4), 10) + 1;

    return currentAge;
  };

  const [modalOpen, setModalOpen] = useState(false);
  const [modalData, setModalData] = useState();
  const handleModal = (data) => {
    setModalData(data);
    setModalOpen(true);
  };
  return (
    <div className="section individualUser">
      <div className="table_container">
        <div className="row row_head">
          <p>No</p>
          <p>이름</p>
          <p>주소</p>
          <p>경력</p>
          <p>근무형태</p>
          <p>나이</p>
        </div>
        {userIndividuals &&
          userIndividuals.map((userIndividual, index) => {
            const array = userIndividual.user_member_jibunAddress.split(" ");
            const userDetail = allUsers.find(
              (user) => user.id === userIndividual.IndividualId
            );
            const individualId = userIndividual.IndividualId;
            const previousComponent = "구직자";
            return (
              <div
                className={
                  index % 2 === 0 ? "content_row row" : "content_row row even"
                }
                key={index}
                style={{ cursor: "pointer" }}
                onClick={() => {
                  onSelectDetail("구직자 정보 상세", {
                    userIndividual,
                    userDetail,
                  });
                }}
              >
                <p>{userIndividual.id}</p>
                <p>{userIndividual.user_member_name}</p>
                <p>{`${array[0]} ${array[1]} ${array[2]}`}</p>
                <p>{`${Math.floor(userIndividual.user_member_career / 12)}년 ${
                  userIndividual.user_member_career % 12
                }개월`}</p>
                <p>{userIndividual.user_member_workType}</p>
                <p>{age(userIndividual.user_member_num)}세</p>
                <p
                  className="btn"
                  onClick={(e) =>
                    e.stopPropagation() ||
                    onSelectDetail("이력서", {
                      individualId,
                      previousComponent,
                    })
                  }
                >
                  이력서
                </p>
                <p
                  className="btn"
                  onClick={(e) =>
                    e.stopPropagation() ||
                    onSelectDetail("경력사항", {
                      individualId,
                    })
                  }
                >
                  경력사항
                </p>
                <p
                  className="btn"
                  onClick={(e) => {
                    e.stopPropagation() || handleModal(userIndividual);
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
          <p>이름 : {modalData.user_member_name}</p>
          <p>연락처 : {modalData.user_member_tel}</p>
          <p>이메일 : {modalData.user_member_email}</p>
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

export default IndividualUser;
