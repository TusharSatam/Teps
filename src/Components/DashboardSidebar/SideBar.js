import React from "react";

import { Nav, Button } from "react-bootstrap";
import classNames from "classnames";
import { Link } from "react-router-dom";
import Logo from '../../asstes/things_logo.svg'


const SideBar = ({ isOpen, toggle }) => {
  return (
    <div className={classNames("sidebar", { "is-open": isOpen })}>
      <div className="sidebar-header">
        <Button
          variant="link"
          onClick={toggle}
          style={{ color: "#fff", textDecoration: "none" }}
          className="mt-3"
        >
          &#10005;
        </Button>
        <h3>
          <Link to={"/"} className="navLogo">
            <img src={Logo} alt="" className="logo_mob" />
          </Link>
        </h3>
      </div>

      <Nav className="flex-column pt-2">

        <Nav.Item
          className={(isActive) =>
            "nav-link" + (!isActive ? " active " : "active")
          }
        >
          <Link className="dash_sidebar_a nav-link d-none d-md-block" to="/admin-home">
            Home
          </Link>
          <Link onClick={toggle} className="dash_sidebar_a nav-link d-block d-md-none" to="/admin-home">
            Home
          </Link>
        </Nav.Item>

        <Nav.Item>
          <Link className="dash_sidebar_a nav-link d-none d-md-block" to="/admin-en-stratigy">
            English Strategies
          </Link>
          <Link onClick={toggle} className="dash_sidebar_a nav-link d-block d-md-none" to="/admin-en-stratigy">
            English Strategies
          </Link>
        </Nav.Item>
        <Nav.Item>
          <Link className="dash_sidebar_a nav-link d-none d-md-block" to="/admin-hi-stratigy">
            Hindi Strategies
          </Link>
          <Link onClick={toggle} className="dash_sidebar_a nav-link d-block d-md-none" to="/admin-hi-stratigy">
            Hindi Strategies
          </Link>
        </Nav.Item>

        {/* <Nav.Item>
          <Link className="dash_sidebar_a nav-link" to="/admin-orders">
            Orders
          </Link>
        </Nav.Item> */}

        {/* <Nav.Item className="">
          <Link className="dash_sidebar_a nav-link" to="/admin-stratigy-dropDown">
            Find Stratigys
          </Link>
        </Nav.Item> */}
        <Nav.Item className="">
          <Link className="dash_sidebar_a nav-link d-none d-md-block" to="/admin-users">
            All Users
          </Link>
          <Link onClick={toggle} className="dash_sidebar_a nav-link d-block d-md-none" to="/admin-users">
            All Users
          </Link>
        </Nav.Item>

        {/* <Nav.Item>
          <Link className="dash_sidebar_a nav-link" to="/">
            FAQ
          </Link>
        </Nav.Item>

        <Nav.Item>
          <Link className="dash_sidebar_a nav-link" to="/">
            Contact
          </Link>
        </Nav.Item> */}
      </Nav>
    </div>
  );
};

export default SideBar;
