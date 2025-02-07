import React, { useState, useEffect } from "react";
import '../../styles/main.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse } from '@fortawesome/free-solid-svg-icons';

const Header = () => {
  const [isAtTop, setIsAtTop] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      setIsAtTop(window.scrollY === 0);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <header className={`header ${isAtTop ? "at-top" : ""}`}>
        <div className={`header-container ${isAtTop ? "large" : "small"}`}>
          <nav className="navigation">
            <ul className="nav-list">
              <li><a href="/home" className="nav-link text-base"><FontAwesomeIcon icon={faHouse} className="mr-3 mb-0.5" />HOME</a></li>
              <li><a href="/about" className="nav-link text-base">ABOUT US</a></li>
              <li className="dropdown">
                <a href="/services" className="nav-link text-base">SERVICE</a>
                <ul className="dropdown-menu">
                  <li><a href="/services/massage" className="dropdown-link font-semibold text-base">Massage</a></li>
                  <li><a href="/services/sauna" className="dropdown-link font-semibold text-base">Sauna</a></li>
                </ul>
              </li>
              <li><a href="/products" className="nav-link text-base">PRODUCT</a></li>
              <div className="logo">
                <img
                  src={isAtTop ? "./Logo/SenSpa(Black).png" : "./Logo/SenSpa(White).png"}
                  alt="Sen Spa Logo"
                  className={`logo-image ${isAtTop ? "large-logo" : "small-logo"}`}
                />
              </div>
              <li><a href="/recruitment" className="nav-link text-base">RECRUITMENT</a></li>
              <li className="dropdown">
                <a href="/media" className="nav-link text-base">MEDIA</a>
                <ul className="dropdown-menu">
                  <li><a href="/media/gallery" className="dropdown-link font-semibold text-xl">Gallery</a></li>
                  <li><a href="/media/videos" className="dropdown-link font-semibold text-xl">Videos</a></li>
                </ul>
              </li>
              <li><a href="/news" className="nav-link text-base">NEWS</a></li>
              <li><a href="/contact" className="nav-link text-base">CONTACT</a></li>
            </ul>
          </nav>
        </div>
      </header>
    </>
  );
};

export default Header;
