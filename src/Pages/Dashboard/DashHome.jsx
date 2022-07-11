import React from 'react';
import { getUsers } from '../../apis/dashboardUsers';
import { getAllStratigys } from '../../apis/stratigyes';
import './styles/dashHome.css'

const DashHome = () => {
    const [user, setUser] = React.useState(0);
    const [stratigys, setStratigys] = React.useState(0);
    React.useEffect(() => {
        getUsers()
            .then(res => {
                setUser(res.data);
            })
        getAllStratigys()
            .then(res => {
                setStratigys(res.data)
            })
    }, [])
    return (
        <div className="container">
            <div className="row">
                <div className="col-md-3">
                    <div className="card-counter primary">
                        <i className="fa fa-code-fork"></i>
                        <span className="count-numbers">{stratigys?.length}</span>
                        <span className="count-name">Total Stratigys</span>
                    </div>
                </div>
                <div className="col-md-3">
                    <div className="card-counter info">
                        <i className="fa fa-users"></i>
                        <span className="count-numbers">{user?.length}</span>
                        <span className="count-name">Total Users</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashHome;