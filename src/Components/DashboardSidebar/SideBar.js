import React from "react";

import { Nav, Button } from "react-bootstrap";
import classNames from "classnames";
import { Link } from "react-router-dom";
import Logo from '../../asstes/things_logo.svg'
import { useAuth } from "../../Context/AuthContext";
import Dropdown from 'react-bootstrap/Dropdown';


const SideBar = ({ isOpen, toggle }) => {
  const { admin } = useAuth()
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
        {
          admin.type === 'super-admin' &&
          <>
            <Dropdown>
              <Dropdown.Toggle variant="bg-transparent border-0 fw-bold" style={{ color: "black" }} id="dropdown-basic">
                Requests by admin panel
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item>
                  <Link style={{ color: "black" }} className="fw-bold dash_sidebar_a nav-link d-none d-md-block" to="/super-req">
                    Delete English strategies
                  </Link>
                  <Link onClick={toggle} className="dash_sidebar_a nav-link d-block d-md-none" to="/super-req">
                    Delete English strategies
                  </Link>
                </Dropdown.Item>
                <Dropdown.Item>
                  <Link style={{ color: "black" }} className="fw-bold dash_sidebar_a nav-link d-none d-md-block" to="/super-req-hi">
                    Delete Hindi strategies
                  </Link>
                  <Link style={{ color: "black" }} onClick={toggle} className="fw-bold dash_sidebar_a nav-link d-block d-md-none" to="/super-req-hi">
                    Delete Hindi strategies
                  </Link>
                </Dropdown.Item>
                <Dropdown.Item>
                  <Link style={{ color: "black" }} className="fw-bold dash_sidebar_a nav-link d-none d-md-block" to="/super-upEn-str">
                    Add English Strategies
                  </Link>
                  <Link onClick={toggle} className="dash_sidebar_a nav-link d-block d-md-none" to="/super-upEn-str">
                    Add English Strategies
                  </Link>
                </Dropdown.Item>
                <Dropdown.Item>
                  <Link style={{ color: "black" }} className="fw-bold dash_sidebar_a nav-link d-none d-md-block" to="/super-upHi-str">
                    Add Hindi Strategies
                  </Link>
                  <Link onClick={toggle} className="dash_sidebar_a nav-link d-block d-md-none" to="/super-upHi-str">
                    Add Hindi Strategies
                  </Link>
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </>
        }
        <Dropdown>
          <Dropdown.Toggle variant="bg-transparent border-0 fw-bold" style={{ color: "black" }} id="dropdown-basic">
            Strategies by User
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item>
              <Link style={{ color: "black" }} className="fw-bold dash_sidebar_a nav-link d-none d-md-block" to="/reqbyuser-en">
                English strategies req
              </Link>
              <Link onClick={toggle} className="dash_sidebar_a nav-link d-block d-md-none" to="/reqbyuser-en">
                English strategies req
              </Link>
            </Dropdown.Item>
            <Dropdown.Item>
              <Link style={{ color: "black" }} className="fw-bold dash_sidebar_a nav-link d-none d-md-block" to="/reqbyuser-hi">
                Hindi strategies req
              </Link>
              <Link style={{ color: "black" }} onClick={toggle} className="fw-bold dash_sidebar_a nav-link d-block d-md-none" to="/reqbyuser-hi">
                Hindi strategies req
              </Link>
            </Dropdown.Item>
            <Dropdown.Item>
              <Link style={{ color: "black" }} className="fw-bold dash_sidebar_a nav-link d-none d-md-block" to="/approve-en">
                Approved Strategies En
              </Link>
              <Link onClick={toggle} className="dash_sidebar_a nav-link d-block d-md-none" to="/approve-en">
                Approved Strategies En
              </Link>
            </Dropdown.Item>
            <Dropdown.Item>
              <Link style={{ color: "black" }} className="fw-bold dash_sidebar_a nav-link d-none d-md-block" to="/approve-hi">
                Approved Strategies Hi
              </Link>
              <Link onClick={toggle} className="dash_sidebar_a nav-link d-block d-md-none" to="/approve-hi">
                Approved Strategies Hi
              </Link>
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>

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
