import "../css/nav.css";
import React, { useState } from "react";
const Nav = ({ onSelectMenu }) => {
  const [subMenu1, setSubMenu1] = useState(true);
  const [selectedMenu, setSelectedMenu] = useState("모든 유저");

  const handleSubMenuClick = (menu) => {
    onSelectMenu(menu);
    setSelectedMenu(menu);
  };

  const renderSubMenu = (menu) => (
    <div
      className={`sub_menu ${selectedMenu === menu ? "selected" : ""}`}
      style={selectedMenu === menu ? { border: "2px solid #cabd99" } : {}}
      onClick={() => handleSubMenuClick(menu)}
    >
      {menu}
    </div>
  );
  return (
    <div className="nav">
      <div
        className="menu"
        onClick={() => {
          setSubMenu1(!subMenu1);
          if (!subMenu1) {
            handleSubMenuClick("모든 유저");
          }
        }}
      >
        회원 관리
      </div>
      {subMenu1 ? (
        <>
          {renderSubMenu("모든 유저")}
          {renderSubMenu("구직자")}
          {renderSubMenu("구인기업")}
        </>
      ) : (
        ""
      )}
      <div
        className="menu"
        onClick={() => {
          handleSubMenuClick("이력서 목록");
        }}
      >
        이력서 목록
      </div>
      <div
        className="menu"
        onClick={() => {
          handleSubMenuClick("구인신청서 목록");
        }}
      >
        구인신청서 목록
      </div>
      <div
        className="menu"
        onClick={() => {
          handleSubMenuClick("구인신청 진행사항");
        }}
      >
        구인신청 진행사항
      </div>
    </div>
  );
};

export default Nav;
