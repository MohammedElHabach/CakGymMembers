import { Link } from "react-router-dom";
import "./Footer.css";
import React from "react";
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
const Footer = () => {
    const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-row">
          <div className="footer-col">
            <h4>CAK Gym</h4>
            <p>
              TAILORED COACHING TO FIT NEEDS, WITH FOLLOW UP AND GUIDANCE
              THROUGH EVERY STEP.
            </p>
          </div>
          <div className="footer-col">
            <h4>Reach us</h4>
            <ul>
              <li>
                <Link style={{display:"flex",alignItems:"center"}}><LocalPhoneIcon/>&nbsp;+961 01 821 904</Link>
              </li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>Other Branches</h4>
            <ul>
              <li>
                <Link target="_blank" to="https://instagram.com/cak_kitchen?igshid=MzRlODBiNWFlZA==">CAKitchen</Link>
              </li>
              <li>
                <Link target="_blank" to="https://instagram.com/caksupplementstore?igshid=MzRlODBiNWFlZA==">CAK Sup</Link>
              </li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>follow-us</h4>
            <div className="social-links">
              <Link target="_blank" to="https://instagram.com/cak_gym?igshid=MzRlODBiNWFlZA==">
                <i className="fa-brands fa-instagram"></i>
              </Link>
              <Link target="_blank" to="https://www.facebook.com/cakgym?mibextid=LQQJ4d">
                <i className="fa-brands fa-facebook-f"></i>
              </Link>
            </div>
          </div>
        </div>
      </div>
      
      <p className="copyrights">Copyright &copy; {currentYear}  | All Rights Reserved</p>
    </footer>
  );
};

export default Footer;
