import "../css/header.css";
const Header = () => {
  return (
    <div className="header">
      <div className="header_container">
        <img src="/images/logo.png" alt="" />
        <div className="nav_box">
          <p>PORTFOLIO</p>
          <p>CONTACT</p>
        </div>
      </div>
    </div>
  );
};

export default Header;
