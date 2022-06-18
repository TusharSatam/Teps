import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles/dashboard.css";
import SideBar from '../../Components/DashboardSidebar/SideBar'
import Content from '../../Components/DashboardContent/Content'

function Dashboard() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(true);
  const [previousWidth, setPrevWidth] = useState(-1);

  function updateWidth() {
    const width = window.innerWidth;
    const widthLimit = 576;
    const isMobile = width <= widthLimit;
    const wasMobile = previousWidth <= widthLimit;

    if (isMobile !== wasMobile) {
      setIsOpen(!isMobile);
    }

    setPrevWidth(width);
  }

  /**
   * Add event listener
   */
  useEffect(() => {
    updateWidth();
    window.addEventListener("resize", updateWidth());

    return () => {
      window.addEventListener("resize", updateWidth());
    };
  }, []);

  const toggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <SideBar toggle={toggle} isOpen={isOpen} />
      <div className="DashboardWrapper">
        <Content toggle={toggle} isOpen={isOpen} />
      </div>
    </>
  );
}

export default Dashboard;
