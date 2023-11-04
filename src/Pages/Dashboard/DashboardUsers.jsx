import React from 'react';
import { Spinner } from 'react-bootstrap';
import { FaEye, FaRegEdit, FaRegTrashAlt } from 'react-icons/fa';
import { deletUser, getSingleUser, getUsers, updateUser } from '../../services/dashboardUsers';
import DashboardEditUserModal from '../../Components/DashboardModal/DashboardEditUserModal';
import toast, { Toaster } from 'react-hot-toast';
import { Link } from 'react-router-dom'; 
// require("dotenv").config();
import axios from "axios";
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
  }
  
  React.useEffect(() => {
    setIsLoading(true)
    getUsers()
      .then(res => {
        setUsers(res?.data);
        setIsLoading(false)
      })
  }, [])

  const handleDelet = (id) => {
    deletUser(id)
      .then(res => {
        res && setUsers(users.filter(message => message._id !== id));
        res && toast.success('User Deleted!', {
          duration: 4000
        })
      })
  }

  
  function uploadCSVFile() {
    const fileInput = document.getElementById("csvInput");
    const file = fileInput.files[0];
    if (file) {
      const formData = new FormData();
      formData.append('avatar', file);
      console.log(file)
  
      axios.post(`/bulk-upload`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
        .then(response => {
          response && toast.success('Uploaded successfully', {
            duration: 4000
          })
          console.log(response.data.message);
        })
        .catch(error => {
          console.error('Error:', error);
        });
    }
  }

  


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
        setUsers={setUsers}
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
                <th scope="col">Phone number</th>
                <th scope="col">Designation</th>
                <th scope="col">School/Organization</th>
                <th scope="col">City</th>
                <th scope="col">Pincode</th>
                <th scope="col">Bulk uploaded</th>
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
                      <td>{item?.phoneNumber}</td>
                      <td>{item.designation}</td>
                      <td>{item.organization}</td>
                      <td>{item.city}</td>
                      <td>{item.pincode}</td>
                      <td>{item?.bulkUploaded===true?"Yes":"No"}</td>
                      <td>
                        <Link to={`/user-details/${item._id}`}>
                          <button className='btn p-0 me-2'>
                            <FaEye />
                          </button>
                        </Link>
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
      <div className='bulkinput' style={{display:"flex", alignItems:"center"}}>
      <input type="file" id="csvInput" accept=".csv" />
      <button className='btn btn-primary my-4' onClick={uploadCSVFile}>Upload</button>
</div>
     
    </>
  );
};

export default DashboardUsers;