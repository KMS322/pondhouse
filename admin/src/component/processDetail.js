import "../css/detail.css";
import "../css/table.css";
import "../css/processDetail.css";
import React, { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  LOAD_MATCHINGLISTS_REQUEST,
  DELETE_MATCHINGLIST_REQUEST,
  ADD_MATCHINGLIST_REQUEST,
} from "../reducers/adminBusiness";
import { LOAD_ALLRESUMES_REQUEST } from "../reducers/adminIndividual";
const ProcessDetail = ({ onSelectMenu, data }) => {
  const dispatch = useDispatch();
  const { matchingLists, deleteMatchingListDone, loadMatchingListsDone } =
    useSelector((state) => state.adminBusiness);
  const { userIndividuals } = useSelector((state) => state.adminUser);
  const { allResumes } = useSelector((state) => state.adminIndividual);
  const businessId = data.businessId;
  const [modalOpen, setModalOpen] = useState(false);
  const [modalData, setModalData] = useState();
  const handleModal = (data) => {
    setModalData(data);
    setModalOpen(true);
  };
  const uniqueMatchingLists = Array.from(
    new Set(matchingLists.map((list) => list.id))
  ).map((id) => matchingLists.find((list) => list.id === id));
  // console.log("matchingLists : ", matchingLists);
  useEffect(() => {
    dispatch({
      type: LOAD_MATCHINGLISTS_REQUEST,
      data: {
        businessId,
      },
    });
  }, [dispatch, deleteMatchingListDone]);
  useEffect(() => {
    dispatch({
      type: LOAD_ALLRESUMES_REQUEST,
    });
  }, []);

  let rank1, rank2, rank3, rank4;
  let rankList1, rankList2, rankList3, rankList4;

  const assignRank = (value, text) => {
    if (value === "1") {
      rank1 = text;
    } else if (value === "2") {
      rank2 = text;
    } else if (value === "3") {
      rank3 = text;
    } else if (value === "4") {
      rank4 = text;
    }
  };

  assignRank(data.list.business_application_rank1, "근무시작 가능 시기");

  if (rank1 === "근무시작 가능 시기") {
    assignRank(data.list.business_application_rank2, "경력");
    assignRank(data.list.business_application_rank3, "근무형태");
    assignRank(data.list.business_application_rank4, "거주지");
  } else {
    assignRank(data.list.business_application_rank2, "경력");
    assignRank(data.list.business_application_rank3, "근무형태");
    assignRank(data.list.business_application_rank4, "거주지");
  }

  function assignRankList(rank, data) {
    if (rank === "경력") {
      let career = "";
      if (data.list.business_application_career === "신입") {
        career = "신입";
      } else if (data.list.business_application_career === "관계없음") {
        career = "관계없음";
      } else {
        career = `${data.list.business_application_career1}년`;
      }
      return career;
    }
    return null;
  }

  rankList1 = assignRankList(rank1, data);

  if (rank1 === "경력") {
    rankList2 = assignRankList(rank2, data);

    if (rank2 === "근무시작 가능 시기") {
      rankList2 = `${data.list.business_application_startYear}년 ${data.list.business_application_startMonth}월`;

      if (rank3 === "근무형태") {
        let workType = "";
        if (data.list.business_application_workPlace === "출근·재택 병행") {
          workType = "모두가능";
        } else if (
          data.list.business_application_workPlace === "재택 근무 가능"
        ) {
          workType = "재택";
        } else if (
          data.list.business_application_workPlace ===
          "사업자 주소와 동일 (출근)"
        ) {
          workType = "출퇴근";
        }
        rankList3 = workType;

        if (rank4 === "거주지") {
          rankList4 = data.business.business_member_jibunAddress;
        }
      }
    }
  } else if (rank2 === "경력") {
    rankList2 = assignRankList(rank2, data);
  }

  const deleteList = useCallback(
    (e, id, cnt) => {
      const isConfirmed = window.confirm("삭제하시겠습니까?");
      const newCnt = cnt - 1;
      setUserCnt(newCnt);
      if (isConfirmed) {
        e.preventDefault();
        dispatch({
          type: DELETE_MATCHINGLIST_REQUEST,
          data: {
            id,
            newCnt,
          },
        });
      }
    },
    [dispatch]
  );

  const addList = useCallback(
    (e, id, cnt) => {
      const isConfirmed = window.confirm("추가하시겠습니까?");
      const newCnt = Number(cnt) + 1;
      setUserCnt(String(newCnt));
      if (isConfirmed) {
        e.preventDefault();
        dispatch({
          type: ADD_MATCHINGLIST_REQUEST,
          data: {
            id,
            newCnt,
          },
        });
      }
    },
    [dispatch]
  );

  const [userCnt, setUserCnt] = useState(data.list.individualCnt);

  return (
    <div className="detail processDetail">
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
          <p>회사명 : {data.business.business_member_companyName}</p>
          <p>채용제목 : {data.list.business_application_name}</p>
        </div>
        <div className="title">현재 단계 : {data.list.progressStep}</div>
        <p className="rank">채용 우선순위</p>
        <div className="rank_box">
          <p>1위</p>
          <p>{rank1}</p>
          <p>{rankList1}</p>
        </div>
        <div className="rank_box">
          <p>2위</p>
          <p>{rank2}</p>
          <p>{rankList2}</p>
        </div>
        <div className="rank_box">
          <p>3위</p>
          <p>{rank3}</p>
          <p>{rankList3}</p>
        </div>
        <div className="rank_box">
          <p>4위</p>
          <p>{rank4}</p>
          <p>{rankList4}</p>
        </div>
        <p className="rank">매칭된 구직자 리스트</p>
        <div className="table_container">
          <div className="row row_head">
            <p>No</p>
            <p>이름</p>
            <p>주소</p>
            <p>근무형태</p>
            <p>시작시기</p>
            <p>경력</p>
            <p>매칭점수</p>
            <p></p>
            <p></p>
          </div>
          {uniqueMatchingLists &&
            uniqueMatchingLists
              .filter((list) => Number(list.BusinessId) === businessId)
              .map((list, index) => {
                const user =
                  userIndividuals &&
                  userIndividuals.find(
                    (user) => user.IndividualId === Number(list.IndividualId)
                  );
                const resume =
                  allResumes &&
                  allResumes.find(
                    (user) => user.IndividualId === Number(list.IndividualId)
                  );
                const backgroundColor =
                  list && list.concurrence === "대기"
                    ? "#F5F2EB"
                    : list && list.concurrence === "동의"
                    ? "#CABD99"
                    : list && list.concurrence === "거절"
                    ? "#C8C8C8"
                    : "initial";
                if (list.showOn !== "off") {
                  return (
                    <div
                      className={
                        index % 2 === 0
                          ? "content_row row"
                          : "content_row row even"
                      }
                      key={index}
                    >
                      <p style={{ backgroundColor }}>{list.id}</p>
                      <p style={{ backgroundColor }}>{user.user_member_name}</p>
                      <p style={{ backgroundColor }}>
                        {user.user_member_jibunAddress}
                      </p>
                      <p style={{ backgroundColor }}>
                        {user.user_member_workType}
                      </p>
                      <p style={{ backgroundColor }}>{`${
                        resume && resume.user_resume_hopeStartYear
                      }년 ${resume && resume.user_resume_hopeStartMonth}월 ${
                        resume && resume.user_resume_hopeStartDay
                      }일`}</p>
                      <p style={{ backgroundColor }}>
                        {user.user_member_career}개월
                      </p>
                      <p style={{ backgroundColor }}>{list.point}점</p>
                      <p
                        className="btn"
                        onClick={() => {
                          handleModal(user);
                        }}
                      >
                        연락처
                      </p>
                      {userCnt >= index + 1 && list.showOn === "on" ? (
                        <p
                          className="btn"
                          onClick={(e) => {
                            deleteList(e, list.id, userCnt);
                          }}
                        >
                          삭제
                        </p>
                      ) : list.showOn === "on" ? (
                        <p
                          className="btn"
                          onClick={(e) => {
                            deleteList(e, list.id, userCnt);
                          }}
                        >
                          삭제
                        </p>
                      ) : (
                        <p
                          className="btn"
                          onClick={(e) => {
                            addList(e, list.id, userCnt);
                          }}
                        >
                          추가
                        </p>
                      )}
                    </div>
                  );
                }
              })}
        </div>
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

export default ProcessDetail;
