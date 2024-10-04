import "../css/header.css";
import "../css/header_mobile.css";
import { useNavigate } from "react-router-dom";
const Header = ({ page }) => {
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
            style={{
              borderBottom: page === "/portfolio" ? "1px solid #707070" : "",
            }}
          >
            PORTFOLIO
          </p>
          <p
            onClick={() => {
              navigate("/contact");
            }}
            style={{
              borderBottom: page === "/contact" ? "1px solid #707070" : "",
            }}
          >
            CONTACT
          </p>
        </div>
      </div>
    </div>
  );
};

export default Header;
