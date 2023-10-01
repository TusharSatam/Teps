import React from 'react';
import { Spinner } from 'react-bootstrap';
import { FaEye, FaRegEdit, FaRegTrashAlt } from 'react-icons/fa';
import { deletUser, getSingleUser, getUsers, updateUser } from '../../services/dashboardUsers';
import DashboardEditUserModal from '../../Components/DashboardModal/DashboardEditUserModal';
import toast, { Toaster } from 'react-hot-toast';
import { Link } from 'react-router-dom';

const DashboardUsers = () => {

  const [users, setUsers] = React.useState([]);
  const [singleUser, setSingleUser] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [editLoading, setEditIsLoading] = React.useState(false);
  const [editId, setEditId] = React.useState();
  const [show, setShow] = React.useState(false);
  const handleClose = () => setShow(false);

  const generateRandomUsers = (numUsers) => {
    const firstNames = [
      'John', 'Jane', 'Michael', 'Emily', 'David',
      'Sarah', 'Robert', 'Laura', 'James', 'Jennifer'
    ];
  
    const lastNames = [
      'Doe', 'Doe', 'Smith', 'Johnson', 'Brown',
      'Davis', 'Wilson', 'Taylor', 'Harris', 'Clark'
    ];
  
    const emails = [
      'john@example.com', 'jane@example.com', 'michael@example.com', 'emily@example.com', 'david@example.com',
      'sarah@example.com', 'robert@example.com', 'laura@example.com', 'james@example.com', 'jennifer@example.com'
    ];
  
    const designations = [
      'Teacher', 'Principal', 'Administrator', 'Staff', 'Librarian',
      'Counselor', 'Coach', 'Janitor', 'Nurse', 'IT Specialist'
    ];
  
    const organizations = [
      'School A', 'School B', 'Organization X', 'Institution Y',
      'Academy Z', 'Learning Center', 'Educational Foundation', 'Training Institute',
      'Childcare Center', 'Community College'
    ];
  
    const cities = [
      'New York', 'Los Angeles', 'Chicago', 'San Francisco',
      'Houston', 'Miami', 'Seattle', 'Boston', 'Denver', 'Atlanta'
    ];
  
    const pincodes = [
      '10001', '90210', '60601', '94102',
      '77001', '33101', '98101', '02108', '80202', '30301'
    ];
  
    const randomUsers = [];
  
    for (let i = 0; i < numUsers; i++) {
      const randomFName = firstNames[Math.floor(Math.random() * firstNames.length)];
      const randomLName = lastNames[Math.floor(Math.random() * lastNames.length)];
      const randomEmail = emails[Math.floor(Math.random() * emails.length)];
      const randomDesignation = designations[Math.floor(Math.random() * designations.length)];
      const randomOrganization = organizations[Math.floor(Math.random() * organizations.length)];
      const randomCity = cities[Math.floor(Math.random() * cities.length)];
      const randomPincode = pincodes[Math.floor(Math.random() * pincodes.length)];
  
      const randomUser = {
        firstName: randomFName,
        lastName: randomLName,
        email: randomEmail,
        designation: randomDesignation,
        organization: randomOrganization,
        city: randomCity,
        pincode: randomPincode,
      };
  
      randomUsers.push(randomUser);
    }
  
    return randomUsers;
  };
  
  const addRandomUsers = () => {
    const randomUsers = generateRandomUsers(15);
    let data=prevUsers=>[...prevUsers,...randomUsers]
    updateUser(data);
    setUsers(prevUsers => [...prevUsers, ...randomUsers]);
  };
  
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
        setUsers(res.data);
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
      <button className='btn btn-primary' onClick={addRandomUsers}>Generate</button>
    </>
  );
};

export default DashboardUsers;