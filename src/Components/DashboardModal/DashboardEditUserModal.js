import React from 'react';
import { Modal } from 'react-bootstrap';
import toast, { Toaster } from 'react-hot-toast';
import { getUsers, updateUser } from '../../services/dashboardUsers';

const DashboardEditUserModal = ({ show, onHide, user, setShow, setUsers }) => {
  const handleUpdate = (e) => {
    e.preventDefault();
    const formData = {
      firstName: e.target.firstName.value,
      lastName: e.target.lastName.value,
      email: e.target.email.value,
      phoneNumber:e.target.phone.value,
      designation: e.target.designation.value,
      organization: e.target.organization.value,
      pincode: e.target.pincode.value,
    };
    updateUser(user._id, formData)
      .then(res => {
        setShow(false)
        getUsers()
          .then(res => {
            setUsers(res.data);
            toast.success('User Update successfull!')
          })
      })
  }
  return (
    <>
      <Toaster
        position="top-right"
        reverseOrder={false}
      />
      <Modal
        show={show}
        onHide={onHide}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Update User</Modal.Title>
        </Modal.Header>
        <Modal.Body >
          <div className='d-flex justify-content-center'>
            <form className='ms-md-3 ms-xxl-5' onSubmit={handleUpdate}>
              <label htmlFor="">First Name </label> <br />
              <input className='signup_Input' defaultValue={user.firstName} name='firstName' placeholder='Lily' type="text" />
              <div>
                <label htmlFor="">Last Name </label> <br />
                <input className='signup_Input' defaultValue={user.lastName} name='lastName' placeholder='Blom' type="text" />
              </div>
              <div >
                <label htmlFor="">Email</label> <br />
                <input className={"signup_Input"} defaultValue={user.email} name='email' placeholder='Lilyblom201@gmail.com' type="email" />
              </div>
              <div >
                <label htmlFor="">Phone</label> <br />
                <input className={"signup_Input"} defaultValue={user.phoneNumber} name='phone' placeholder='Phone Number' type="number" />
              </div>
              <div >
                <label htmlFor="">Designation </label> <br />
                <input className='signup_Input' defaultValue={user.designation} name='designation' placeholder='Designation' type="text" />
                <div>
                  <label htmlFor="">School/Organization </label> <br />
                  <input className='signup_Input' defaultValue={user.organization} name='organization' placeholder='School/Organization' type="text" />
                </div>
              </div>
              <div>
                <label htmlFor="">Pincode </label> <br />
                <input className='signup_Input' min="0" defaultValue={user.pincode} name='pincode' placeholder='Pincode' type="number" />
              </div>
              <div className='d-flex justify-content-end my-3'>
                <button className='btn btn-primary'>Update</button>
              </div>
            </form>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default DashboardEditUserModal;