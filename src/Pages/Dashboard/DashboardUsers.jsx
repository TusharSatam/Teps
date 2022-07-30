import React from 'react';
import { Spinner } from 'react-bootstrap';
import { FaRegEdit, FaRegTrashAlt } from 'react-icons/fa';
import { deletUser, getSingleUser, getUsers } from '../../services/dashboardUsers';
import DashboardEditUserModal from '../../Components/DashboardModal/DashboardEditUserModal';
import toast, { Toaster } from 'react-hot-toast';

const DashboardUsers = () => {

  const [users, setUsers] = React.useState([]);
  const [singleUser, setSingleUser] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [editLoading, setEditIsLoading] = React.useState(false);
  const [editId, setEditId] = React.useState();
  const [show, setShow] = React.useState(false);
  const handleClose = () => setShow(false);


  const handleShow = (id) => {
    setEditId(id)
    setEditIsLoading(true)
    getSingleUser(id)
      .then(res => {
        setSingleUser(res.data[0]);
        setEditIsLoading(false)
        setShow(true)
      })
      ;
    console.log(id);
  }
  React.useEffect(() => {
    setIsLoading(true)
    getUsers()
      .then(res => {
        setUsers(res.data);
        setIsLoading(false)
      })
  }, [])

  const handleDelet = (id) => {
    deletUser(id)
      .then(res => {
        res && setUsers(users.filter(message => message._id !== id));
        res && toast.success('User Deleted!')
      })
  }
  console.log(users);
  return (
    <>
      <Toaster
        position="top-right"
        reverseOrder={false}
      />
      <DashboardEditUserModal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        user={singleUser}
        setShow={setShow}
      />
      <div className="container">
        <div className="d-flex justify-content-between">
          <h3>All Users</h3>
        </div>
        <div className="table-responsive">
          <table className="table table-hover">
            <thead>
              <tr>
                <th scope="col">Name</th>
                <th scope="col">Email</th>
                <th scope="col">Designation</th>
                <th scope="col">School/Organization</th>
                <th scope="col">City</th>
                <th scope="col">Pincode</th>
              </tr>
            </thead>
            <tbody>
              {
                isLoading ? <div style={{ marginLeft: "500px", marginTop: "150px" }}>
                  <Spinner animation="border" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </Spinner>
                </div> : users?.length === 0 ? <div>Empty User</div> :
                  users?.map((item, index) => (
                    <tr
                      key={index}
                    >
                      <td>{item.firstName} {item.lastName}</td>
                      <td>{item.email}</td>
                      <td>{item.designation}</td>
                      <td>{item.organization}</td>
                      <td>{item.city}</td>
                      <td>{item.pincode}</td>
                      <td>
                        <button onClick={() => handleDelet(item._id)} className='btn p-0 me-2'>
                          <FaRegTrashAlt />
                        </button>
                        {
                          editId === item._id && editLoading ? <Spinner className='w-25 h-25' animation="border" role="status">
                            <span className="visually-hidden ">Loading...</span>
                          </Spinner> :
                            <button className='btn p-0' onClick={() => handleShow(item._id)}><FaRegEdit /></button>
                        }
                      </td>
                    </tr>
                  ))
              }
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default DashboardUsers;