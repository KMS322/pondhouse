import "../css/main.css";
import SubHeader from "./subHeader";
import Nav from "./nav";
import React, { useState, useEffect } from "react";
import AllUser from "./allUser";
import IndividualUser from "./individualUser";
import BusinessUser from "./businessUser";
import IndividualDetail from "./individualDetail";
import ResumeDetail from "./resumeDetail";
import CareerDetail from "./careerDetail";
import BusinessDetail from "./businessDetail";
import ApplicationList from "./applicationList";
import ApplicationDetail from "./applicationDetail";
import RecruitmentDetail from "./recruitmentDetail";
import AllResumes from "./allResumes";
import AllApplications from "./allApplications";
import Process from "./process";
import ProcessDetail from "./processDetail";

const MainComponent = () => {
  const [currentComponent, setCurrentComponent] = useState("모든 유저");
  const [sendData, setSendData] = useState("");
  const handleMenuSelect = (selectedMenu) => {
    setCurrentComponent(selectedMenu);
  };
  const handleDetailSelect = (selectedDetail, userData) => {
    setCurrentComponent(selectedDetail);
    setSendData(userData);
  };
  let selectedComponent;
  switch (currentComponent) {
    case "모든 유저":
      selectedComponent = <AllUser />;
      break;
    case "구직자":
      selectedComponent = (
        <IndividualUser onSelectDetail={handleDetailSelect} />
      );
      break;
    case "구직자 정보 상세":
      selectedComponent = (
        <IndividualDetail onSelectMenu={handleMenuSelect} userData={sendData} />
      );
      break;
    case "이력서":
      selectedComponent = (
        <ResumeDetail onSelectMenu={handleMenuSelect} data={sendData} />
      );
      break;
    case "경력사항":
      selectedComponent = (
        <CareerDetail onSelectMenu={handleMenuSelect} data={sendData} />
      );
      break;
    case "구인기업":
      selectedComponent = <BusinessUser onSelectDetail={handleDetailSelect} />;
      break;
    case "구인기업 정보 상세":
      selectedComponent = (
        <BusinessDetail onSelectMenu={handleMenuSelect} userData={sendData} />
      );
      break;
    case "공고목록":
      selectedComponent = (
        <ApplicationList onSelectMenu={handleMenuSelect} data={sendData} />
      );
      break;
    case "공고내용":
      selectedComponent = (
        <ApplicationDetail onSelectMenu={handleMenuSelect} data={sendData} />
      );
      break;
    case "채용담당":
      selectedComponent = (
        <RecruitmentDetail onSelectMenu={handleMenuSelect} data={sendData} />
      );
      break;
    case "이력서 목록":
      selectedComponent = <AllResumes onSelectDetail={handleDetailSelect} />;
      break;
    case "구인신청서 목록":
      selectedComponent = (
        <AllApplications onSelectDetail={handleDetailSelect} />
      );
      break;
    case "구인신청 진행사항":
      selectedComponent = <Process onSelectDetail={handleDetailSelect} />;
      break;
    case "상세 진행사항":
      selectedComponent = (
        <ProcessDetail onSelectMenu={handleMenuSelect} data={sendData} />
      );
      break;
    default:
      selectedComponent = null;
  }
  return (
    <>
      <SubHeader data={currentComponent} />
      <div className="container">
        <Nav onSelectMenu={handleMenuSelect} />
        {selectedComponent}
      </div>
    </>
  );
};

export default MainComponent;
