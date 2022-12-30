import React from 'react';
import { getUsers } from '../../services/dashboardUsers';
import { getAllStratigys } from '../../services/stratigyes';
import { Spinner } from 'react-bootstrap';

import './styles/dashHome.css'
import { getAllHindiStratigys } from '../../services/hindiStratigys';
import { getLastmonthLogin, getLastmonthReg, getTotalLikes, getTotalSaves } from '../../services/dashboardNumbers';
import axios from 'axios';

const DashHome = () => {
  const [user, setUser] = React.useState(0);
  const [stratigys, setStratigys] = React.useState(0);
  const [hindiStratigys, setHindiStratigys] = React.useState(0);
  const [isLoading, setIsLoading] = React.useState(false);
  const [isLoading2, setIsLoading2] = React.useState(false);
  const [isLoading3, setIsLoading3] = React.useState(false);
  const [isLoading4, setIsLoading4] = React.useState(false);
  const [isLoading5, setIsLoading5] = React.useState(false);
  const [lastRegester, setLastRegester] = React.useState(0);
  const [isLoading6, setIsLoading6] = React.useState(false);
  const [totalLikes, setTotalLikes] = React.useState(0);
  const [isLoading7, setIsLoading7] = React.useState(false);
  const [totalSaves, setTotalSaves] = React.useState(0);
  const [lastLogin, setLastLogin] = React.useState(0);


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
    setIsLoading3(true)
    getAllHindiStratigys()
      .then(res => {
        setIsLoading3(false)
        setHindiStratigys(res.data);
      })
  }, [])

  const current = new Date();
  const month = current.getMonth();
  const year = current.getFullYear()
  React.useEffect(() => {
    setIsLoading4(true)
    getLastmonthReg(month, year)
      .then(res => {
        setIsLoading4(false)
        setLastRegester(res?.data?.lastmonthRegester);
      })
  }, [])

  React.useEffect(() => {
    setIsLoading5(true)
    getLastmonthLogin(month, year)
      .then(res => {
        setIsLoading5(false)
        setLastLogin(res?.data?.lastmonthLogin);
      })
  }, [])

  React.useEffect(() => {
    setIsLoading6(true)
    getTotalLikes()
      .then(res => {
        setIsLoading6(false)
        setTotalLikes(res?.data?.totalLikes);
      })
  }, [])

  React.useEffect(() => {
    setIsLoading7(true)
    getTotalSaves()
      .then(res => {
        setIsLoading7(false)
        setTotalSaves(res?.data?.totalSave);
      })
  }, [])

  React.useEffect(() => {
    axios.post("https://analyticsdata.googleapis.com/v1beta/properties/346131718:runRealtimeReport",
      {
        "dimensions": [{ "name": "country" }],
        "metrics": [{ "name": "activeUsers" }]
      },
      {
        "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzOTRkMDRjN2I1MTViYWZkYzZmY2ZkMiIsImVtYWlsIjoia2FtcnV6LnphbWFuODk5MUBnbWFpbC5jb20iLCJqd3RLZXkiOiIxYTBiMTE2Zi1lODIyLTQ0MTQtYTZlNC1hYzk0ZGJjYmJmZmYiLCJpYXQiOjE2NzEzMDEwNDQsImV4cCI6MTcwMjgzNzA0NH0.JFMDdrQ9YWSQfqpTc7yoeih4v5rznKGvSwtzekk5efs"
      },

    )
      .then(res => {
        console.log(res);
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
        <div className="col-md-3">
          <div className="card-counter info">
            <i className="fa fa-users"></i>
            <span className="count-numbers">{isLoading4 ? <Spinner className="text-light " animation="border" /> : lastRegester}</span>
            <span className="count-name">Registrations in last month</span>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card-counter info">
            <i className="fa fa-users"></i>
            <span className="count-numbers">{isLoading5 ? <Spinner className="text-light " animation="border" /> : lastLogin}</span>
            <span className="count-name">Logins in last month</span>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card-counter info">
            <i className="fa fa-users"></i>
            <span className="count-numbers">{isLoading6 ? <Spinner className="text-light " animation="border" /> : totalLikes}</span>
            <span className="count-name">Total strategies liked</span>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card-counter info">
            <i className="fa fa-users"></i>
            <span className="count-numbers">{isLoading7 ? <Spinner className="text-light " animation="border" /> : totalSaves}</span>
            <span className="count-name">Total strategies Saved</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashHome;