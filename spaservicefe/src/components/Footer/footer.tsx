import React from "react";
import "./Footer.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquareFacebook, faInstagram, faYoutube } from '@fortawesome/free-brands-svg-icons';


const Footer = () => {
  return (
    <footer>
      <div class="footer-container">
        <div class="footer-logo">
          <img src="./Logo/SenSpa(White).png" alt="Sen Spa Logo" class="footer-logo-image" />
          <div class="footer-social">
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" class="social-icon"><FontAwesomeIcon icon={faSquareFacebook} /></a>
          <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" class="social-icon"><FontAwesomeIcon icon={faYoutube} /></a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" class="social-icon"><FontAwesomeIcon icon={faInstagram} /></a>
        </div>
        </div>
        
        <div class="footer-info">
          <h4>SEN SPA SERVICE COMPANY LIMITED</h4>
          <p><strong>Address:</strong> 10B1 Le Thanh Ton, Ben Nghe Ward, District 1, HCMC</p>
          <p><strong>Phone:</strong> +84 28 38 251 250 | +84 28 3910 2174</p>
          <p><strong>Email:</strong> rsv@senspa.com.vn</p>
          <p><strong>Opening time:</strong> 09:30 AM - 20:00 PM</p>
        </div>
        <div class="footer-quick-links">
          <h4>QUICK LINK</h4>
          <ul>
            <li><a href="/about-us">About us</a></li>
            <li><a href="/service">Service</a></li>
            <li><a href="/product">Product</a></li>
            <li><a href="/promotion">Promotion</a></li>
          </ul>
        </div>
      </div>
      <div class="footer-notice-container">
        <p class="footer-notice">
          All prices exclude 10% VAT and 5% Service Charge.<br /> Only paying more 50% Additional Charge, VIP Room is at your side.
        </p>
      </div>
      <div class="footer-bottom">
        <p>© 2025 SEN SPA. All Rights Reserved.</p>
      </div>
    </footer>

  );
};

export default Footer;
