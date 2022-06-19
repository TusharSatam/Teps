import React, { useState } from 'react';
import { useEffect } from 'react';
import { FaRegEdit, FaRegTrashAlt } from 'react-icons/fa';
import { getUsers } from '../../apis/dashboardUsers';

const DashboardUsers = () => {

    const [users, setUsers] = useState([]);

    useEffect(() => {
        getUsers()
            .then(res => {
                setUsers(res.data);
            })
    }, [])
    return (
        <>
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
                            {users?.length > 0 && users?.map((item, index) => (
                                <tr >
                                    <td>{item.firstName}{item.firstName}</td>
                                    <td>{item.email}</td>
                                    <td>{item.designation}</td>
                                    <td>{item.city}</td>
                                    <td>{item.pincode}</td>
                                    <td>
                                        <button className='btn'>
                                            <FaRegTrashAlt />
                                        </button>
                                        <button className='btn' ><FaRegEdit /></button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
};

export default DashboardUsers;