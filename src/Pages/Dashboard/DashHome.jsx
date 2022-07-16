import React from 'react';
import { getUsers } from '../../apis/dashboardUsers';
import { getAllStratigys } from '../../apis/stratigyes';
import { Spinner } from 'react-bootstrap';

import './styles/dashHome.css'
import { getAllHindiStratigys } from '../../apis/hindiStratigys';

const DashHome = () => {
    const [user, setUser] = React.useState(0);
    const [stratigys, setStratigys] = React.useState(0);
    const [hindiStratigys, setHindiStratigys] = React.useState(0);
    const [isLoading, setIsLoading] = React.useState(false);
    const [isLoading2, setIsLoading2] = React.useState(false);
    const [isLoading3, setIsLoading3] = React.useState(false);


    React.useEffect(() => {
        setIsLoading2(true)
        getAllStratigys()
            .then(res => {
                setIsLoading2(false)
                setStratigys(res.data)
            })
    }, [])
    React.useEffect(() => {
        setIsLoading(true)
        getUsers()
            .then(res => {
                setIsLoading(false)
                setUser(res.data);
            })
    }, [])
    React.useEffect(() => {
        setIsLoading(true)
        getAllHindiStratigys()
            .then(res => {
                setIsLoading3(false)
                setHindiStratigys(res.data);
            })
    }, [])

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-3">
                    <div className="card-counter primary">
                        <i className="fa fa-code-fork"></i>
                        <span className="count-numbers">{isLoading2 ? <Spinner className="text-light " animation="border" /> : stratigys?.length}</span>
                        <span className="count-name">English Strategies</span>
                    </div>
                </div>
                <div className="col-md-3">
                    <div className="card-counter primary">
                        <i className="fa fa-code-fork"></i>
                        <span className="count-numbers">{isLoading3 ? <Spinner className="text-light " animation="border" /> : hindiStratigys?.length}</span>
                        <span className="count-name">Hindi Strategies</span>
                    </div>
                </div>
                <div className="col-md-3">
                    <div className="card-counter info">
                        <i className="fa fa-users"></i>
                        <span className="count-numbers">{isLoading ? <Spinner className="text-light " animation="border" /> : user?.length}</span>
                        <span className="count-name">Total Users</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashHome;