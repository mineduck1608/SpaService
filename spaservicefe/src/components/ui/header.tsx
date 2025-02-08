import React, { useState, useEffect } from "react";
import '../../styles/main.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse, faAngleDown } from '@fortawesome/free-solid-svg-icons';

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
                <a href="/services" className="nav-link text-base">SERVICE <FontAwesomeIcon icon={faAngleDown} className="ml-2 text-xs mb-0.5" /></a>
                <ul className="dropdown-menu bg-white/20 backdrop-blur-sm rounded-tl-lg rounded-br-lg min-w-[220px]">
                  <li>
                    <a href="/services/fullbody" className="dropdown-link text-base group flex items-center transition-transform duration-1000 hover:translate-x-2 hover:bg-transparent">
                      <span className="opacity-0 group-hover:opacity-100 transition-opacity">-</span>
                      Chăm sóc toàn thân
                    </a>
                  </li>
                  <li>
                    <a href="/services/facial" className="dropdown-link text-base group flex items-center transition-transform duration-1000 hover:translate-x-2 hover:bg-transparent">
                      <span className="opacity-0 group-hover:opacity-100 transition-opacity">-</span>
                      Chăm sóc da mặt
                    </a>
                  </li>
                  <li>
                    <a href="/services/hand&foot" className="dropdown-link text-base group flex items-center transition-transform duration-1000 hover:translate-x-2 hover:bg-transparent">
                      <span className="opacity-0 group-hover:opacity-100 transition-opacity">-</span>
                      Hand & Foot Relaxation
                    </a>
                  </li>
                  <li>
                    <a href="/services/package" className="dropdown-link text-base group flex items-center transition-transform duration-1000 hover:translate-x-2 hover:bg-transparent">
                      <span className="opacity-0 group-hover:opacity-100 transition-opacity">-</span>
                      Package Service
                    </a>
                  </li>
                  <li>
                    <a href="/services/vip" className="dropdown-link text-base group flex items-center transition-transform duration-1000 hover:translate-x-2 hover:bg-transparent">
                      <span className="opacity-0 group-hover:opacity-100 transition-opacity">-</span>
                      VIP service
                    </a>
                  </li>
                </ul>
              </li>
              <li><a href="/products" className="nav-link text-base">PRODUCT</a></li>
              <div className="logo">

                <img
                  src={isAtTop ? "./Logo/SenSpa(White).png" : "./Logo/SenSpa(Black).png"}
                  alt="Sen Spa Logo"
                  className={`logo-image ${isAtTop ? "large-logo" : "small-logo"}`}
                />
              </div>
              <li><a href="/recruitment" className="nav-link text-base">RECRUITMENT</a></li>
              <li className="dropdown">
                <a href="/media" className="nav-link text-base">
                  MEDIA
                  <FontAwesomeIcon icon={faAngleDown} className="ml-2 text-xs mb-0.5" />
                </a>
                <ul className="dropdown-menu bg-white/20 backdrop-blur-sm rounded-tl-lg rounded-br-lg min-w-[150px]">
                  <li>
                    <a href="/media/gallery" className="dropdown-link text-base group flex items-center transition-transform duration-1000 hover:translate-x-2 hover:bg-transparent">
                      <span className="opacity-0 group-hover:opacity-100 transition-opacity">-</span>
                      Gallery
                    </a>
                  </li>
                  <li>
                    <a href="/media/videos" className="dropdown-link text-base group flex items-center transition-transform duration-1000 hover:translate-x-2 hover:bg-transparent">
                      <span className="opacity-0 group-hover:opacity-100 transition-opacity">-</span>
                      Videos
                    </a>
                  </li>
                  <li>
                    <a href="/media/news" className="dropdown-link text-base group flex items-center transition-transform duration-1000 hover:translate-x-2 hover:bg-transparent">
                      <span className="opacity-0 group-hover:opacity-100 transition-opacity">-</span>
                      E-Brochure
                    </a>
                  </li>
                </ul>
              </li>
              <li><a href="/news" className="nav-link text-base">NEWS</a></li>
              <li><a href="/contact" className="nav-link text-base">CONTACT</a></li>
            </ul>
          </nav>
        </div>
      </header>

      <main className="content">
        <section style={{ padding: "50px", backgroundColor: "#f5f5f5", textAlign: "center" }}>
          <h1>Welcome to Sen Spa</h1>
          <p>Relax and rejuvenate with our premium spa services.</p>
        </section>
        <section style={{ height: "1000px", backgroundColor: "#eaeaea", textAlign: "center", paddingTop: "50px" }}>
          <h2>Our Services</h2>
          <p>Explore a wide range of relaxing and rejuvenating experiences tailored just for you.</p>
        </section>
        <section style={{ height: "800px", backgroundColor: "#dcdcdc", textAlign: "center", paddingTop: "50px" }}>
          <h2>Contact Us</h2>
          <p>We are here to help you. Reach out to us for more information.</p>
        </section>
      </main>

    </>
  );
};

export default Header;