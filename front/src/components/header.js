import "../css/header.css";
import { useNavigate } from "react-router-dom";
const Header = () => {
  const navigate = useNavigate();
  return (
    <div className="header">
      <div className="header_container">
        <img
          src="/images/logo.png"
          alt=""
          onClick={() => {
            navigate("/");
          }}
        />
        <div className="nav_box">
          <p
            onClick={() => {
              navigate("/portfolio");
            }}
          >
            PORTFOLIO
          </p>
          <p>CONTACT</p>
        </div>
      </div>
    </div>
  );
};

export default Header;
