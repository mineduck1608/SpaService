import React, { useState, useEffect } from "react";
import './Header.css';

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
              <li><a href="/home" className="nav-link font-semibold text-xl">Home</a></li>
              <li><a href="/about" className="nav-link font-semibold text-xl">About Us</a></li>
              <li className="dropdown">
                <a href="/services" className="nav-link font-semibold text-xl">Service</a>
                <ul className="dropdown-menu">
                  <li><a href="/services/massage" className="dropdown-link font-semibold text-xl">Massage</a></li>
                  <li><a href="/services/sauna" className="dropdown-link font-semibold text-xl">Sauna</a></li>
                </ul>
              </li>
              <li><a href="/products" className="nav-link font-semibold text-xl">Product</a></li>
              <div className="logo">
                <img
                  src={isAtTop ? "./Logo/SenSpa(Black).png" : "./Logo/SenSpa(White).png"}
                  alt="Sen Spa Logo"
                  className={`logo-image ${isAtTop ? "large-logo" : "small-logo"}`}
                />
              </div>
              <li><a href="/recruitment" className="nav-link font-semibold text-xl">Recruitment</a></li>
              <li className="dropdown">
                <a href="/media" className="nav-link font-semibold text-xl">Media</a>
                <ul className="dropdown-menu">
                  <li><a href="/media/gallery" className="dropdown-link font-semibold text-xl">Gallery</a></li>
                  <li><a href="/media/videos" className="dropdown-link font-semibold text-xl">Videos</a></li>
                </ul>
              </li>
              <li><a href="/news" className="nav-link font-semibold text-xl">News</a></li>
              <li><a href="/contact" className="nav-link font-semibold text-xl">Contact</a></li>
            </ul>
          </nav>
        </div>
      </header>
    </>
  );
};

export default Header;
