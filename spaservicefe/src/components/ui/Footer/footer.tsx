import React from "react";
import "./Footer.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faYoutube, faInstagram, faSquareFacebook } from "@fortawesome/free-brands-svg-icons";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-logo">
          <img src="./images/logos/SenSpa(White).png" alt="Sen Spa Logo" className="footer-logo-image" />
          <p className="footer-tagline">VIETNAM SPA EXPERIENCE</p>
          <div className="mt-4">
            <a href="https://facebook.com" className="text-white no-underline mx-2.5 inline-block text-2xl hover:text-[#976418]">
              <FontAwesomeIcon icon={faSquareFacebook} />
            </a>
            <a href="https://youtube.com" className="text-white no-underline mx-2.5 inline-block text-2xl hover:text-[#976418]">
              <FontAwesomeIcon icon={faYoutube} />
            </a>
            <a href="https://instagram.com" className="text-white no-underline mx-2.5 inline-block text-2xl hover:text-[#976418]">
              <FontAwesomeIcon icon={faInstagram} />
            </a>
          </div>
        </div>
        <div className="footer-info">
          <h4>SEN SPA SERVICE COMPANY LIMITED</h4>
          <p><strong>Address:</strong> 10B1 Le Thanh Ton, Ben Nghe Ward, District 1, HCMC</p>
          <p><strong>Phone:</strong> +84 28 38 251 250 | +84 28 3910 2174</p>
          <p><strong>Email:</strong> rsv@senspa.com.vn</p>
          <p><strong>Opening time:</strong> 09:30 AM - 20:00 PM</p>
          <p>All prices exclude 10% VAT and 5% Service Charge.<br />Only paying more 50% Additional Charge, VIP Room is at your side.</p>
        </div>
        <div className="footer-quick-links">
          <h4>QUICK LINK</h4>
          <ul>
            <li><a href="/about-us">About us</a></li>
            <li><a href="/service">Service</a></li>
            <li><a href="/product">Product</a></li>
            <li><a href="/promotion">Promotion</a></li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom bg-[#976418] w-full py-2.5 mt-2.5">
        <p>© 2020 SEN SPA. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;