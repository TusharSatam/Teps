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
      className="navbar shadow-sm p-3 mb-5 bg-white rounded d-flex justify-content-between"
      expand
    >
      <Button variant="outline-info" onClick={handleHumBurgs}>
        <FaAlignLeft />
      </Button>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      {
        admin.type === 'super-admin' ? <h2  className="justify-content-center adminType"><u>Super Admin</u> </h2> : <h2 className="text-center adminType"><u>Admin</u></h2>
      }
        <Nav className="ml-auto" navbar>
          <Button onClick={Adminlogout} className="btn-sm btn-dark adminLogout">Logout</Button>
        </Nav>
    </Navbar>
  );
}

export default NavBar;
