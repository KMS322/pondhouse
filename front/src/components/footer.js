import "../css/footer.css";
const Footer = () => {
  return (
    <div className="footer">
      <div className="article_container">
        <div className="logo_box">
          <img src="/images/logo.png" alt="" />
          <p>Copyright ©PONDWEDDINGHOUSE.All Rights Reserved.</p>
        </div>
        <div className="nav_box">
          <div className="nav">
            <p>ABOUT</p>
            <p>PORTFOLIO</p>
            <p>CONTACT</p>
          </div>
          <p>
            저희 비디오에 관심을 가져주셔서 감사합니다.
            <br />
            폰드하우스의 영상은 모두 합법적인 소스와 소프트웨어로 제작됩니다.
          </p>
        </div>
        <div className="info_box">
          <p>PHONE 010-7747-5367</p>
          <p>studiofrogg@gmail.com</p>
          <div className="num_box">
            <p>사업자등록번호 224-62-00375</p>
            <p>대표자 강구형5</p>
          </div>
          <p>대구광역시 동구 경안로 722 3층 STUDIOFROG</p>
          <div className="insta_box">
            <img src="/images/insta.png" alt="" />
            <p>INSTA film_pond_house</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
