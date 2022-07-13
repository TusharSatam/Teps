import React from 'react';
import { Spinner } from 'react-bootstrap';
import { FaRegEdit, FaRegTrashAlt } from 'react-icons/fa';
import { deletUser, getSingleUser, getUsers } from '../../apis/dashboardUsers';
import DashboardEditUserModal from '../../Components/DashboardModal/DashboardEditUserModal';

const DashboardUsers = () => {

    const [users, setUsers] = React.useState([]);
    const [singleUser, setSingleUser] = React.useState([]);
    const [isLoading, setIsLoading] = React.useState(false);
    const [show, setShow] = React.useState(false);
    const handleClose = () => setShow(false);
    const handleShow = (id) => {
        getSingleUser(id)
            .then(res => {
                setSingleUser(res.data[0]);
            })
        setShow(true);
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
        setIsLoading(true)
        let text = "Are you sure for delete?";
        if (window.confirm(text) === true) {
            deletUser(id)
                .then(res => {
                    setUsers(users.filter(message => message._id !== id));
                    setIsLoading(false)
                })
        }
    }
    return (
        <>
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
                                            <td>{item.firstName}{item.lastName}</td>
                                            <td>{item.email}</td>
                                            <td>{item.designation}</td>
                                            <td>{item.city}</td>
                                            <td>{item.pincode}</td>
                                            <td>
                                                <button onClick={() => handleDelet(item._id)} className='btn p-0 me-2'>
                                                    <FaRegTrashAlt />
                                                </button>
                                                <button className='btn p-0' onClick={() => handleShow(item._id)}><FaRegEdit /></button>
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