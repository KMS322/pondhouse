import "../css/table.css";
import "../css/allResumes.css";
import dayjs from "dayjs";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { LOAD_ALLRESUMES_REQUEST } from "../reducers/adminIndividual";
const AllResumes = ({ onSelectDetail }) => {
  const dispatch = useDispatch();
  const { allResumes } = useSelector((state) => state.adminIndividual);
  const { userIndividuals, allUsers } = useSelector((state) => state.adminUser);
  const previousComponent = "이력서 목록";
  useEffect(() => {
    dispatch({
      type: LOAD_ALLRESUMES_REQUEST,
    });
  }, []);

  return (
    <div className="section allResumes">
      <div className="table_container">
        <div className="row row_head">
          <p>No</p>
          <p>아이디</p>
          <p>이름</p>
          <p>이력서 제목</p>
          <p>지역</p>
          <p>등록일</p>
        </div>
        {allResumes &&
          allResumes.map((allResume, index) => {
            const userDetail = userIndividuals.find(
              (user) => user.IndividualId === allResume.IndividualId
            );
            const user = allUsers.find(
              (user) => user.id === allResume.IndividualId
            );
            const array = userDetail.user_member_jibunAddress.split(" ");
            const individualId = allResume.IndividualId;
            return (
              <div
                className={
                  index % 2 === 0 ? "content_row row" : "content_row row even"
                }
                onClick={(e) =>
                  onSelectDetail("이력서", {
                    individualId,
                    previousComponent,
                  })
                }
                key={index}
                style={{ cursor: "pointer" }}
              >
                <p>{allResume.id}</p>
                <p>{user.user_member_id}</p>
                <p>{userDetail.user_member_name}</p>
                <p>{allResume.user_resume_title}</p>
                <p>{array[0]}</p>
                <p>{dayjs(allResume.createdAt).format("YYYY.MM.DD")}</p>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default AllResumes;
