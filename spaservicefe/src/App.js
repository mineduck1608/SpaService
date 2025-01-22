
import React, { useState, useEffect } from "react";
import Header from "./components/Header/header.tsx"; // Import the Header component
import Footer from "./components/Footer/footer.tsx";
import Carousel from "./components/Carousel/Carousel.tsx";
import Main from "./components/Main/main.tsx"

const App = () => {
  return (
    <div>
      <Header />
      <Carousel />
      <Main/>
      <Footer />
    </div>
  );
};

export default App;