import React from "react";
import { Navbar, Button, Nav } from "react-bootstrap";
import { FaAlignLeft } from "react-icons/fa";
import { useAuth } from "../../Context/AuthContext";


function NavBar(props) {
  const { Adminlogout, setHumBurgs, humBurgs, admin } = useAuth()
  const handleHumBurgs = () => {
    props.toggle()
    if (humBurgs) {
      setHumBurgs(false)
    }
    else {
      setHumBurgs(true)
    }
  }
  return (
    <Navbar
      bg="light"
      className="navbar shadow-sm p-3 mb-5 bg-white rounded"
      expand
    >
      <Button variant="outline-info" onClick={handleHumBurgs}>
        <FaAlignLeft />
      </Button>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      {
        admin.type === 'super-admin' ? <h3 style={{ marginLeft: "350px" }} className="justify-content-center">Super Admin</h3> : <h3 style={{ marginLeft: "350px" }} className="text-center">Admin</h3>
      }
      <Navbar.Collapse className="justify-content-end" id="responsive-navbar-nav">
        <Nav className="ml-auto" navbar>
          <Button onClick={Adminlogout} className="btn-sm btn-dark">Logout</Button>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default NavBar;
