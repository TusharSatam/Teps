import moment from 'moment';
import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { Alert, Spinner } from 'react-bootstrap';
import { CSVLink } from 'react-csv';
import { useParams } from 'react-router-dom';
import { useAuth } from '../../Context/AuthContext';
import { getLastmonthAvgr, getLastmonthLogin } from '../../services/dashboardNumbers';
import { getSingleUser } from '../../services/dashboardUsers';
import { getMultitHiStr } from '../../services/hindiStratigys';
import { averageTime } from '../../services/pulledStratigy';
import { getComment, getMultitStr } from '../../services/stratigyes';
import { totalLogins } from '../../services/totalLogins';
import { getLikes } from '../../services/userLikes';
import { getSaves } from '../../services/userSaves';

const UserDetails = () => {
  const { admin } = useAuth()
  const { id } = useParams()
  const [isLoading, setIsLoading] = useState(false)
  const [regestrationTime, setRegestrationTime] = useState([])
  const [userLikes, setUserLikes] = useState([])
  const [userSaves, setUserSaves] = useState([])
  const [userComments, setUserCommentd] = useState([])
  useEffect(() => {
    setIsLoading(true);
    getSingleUser(id)
      .then(res => {
        setRegestrationTime(res.data[0])
        setIsLoading(false);
      })
    getLikes()
      .then(res => {
        setUserLikes(res.data);
      })
    getSaves()
      .then(res => {
        setUserSaves(res.data);
      })
    getComment()
      .then(res => {
        setUserCommentd(res.data);
      })
  }, [])
  const userLike = userLikes?.filter(res => res.user_id === id)
  const userSave = userSaves?.filter(res => res.user_id === id)
  const userComment = userComments?.filter(res => res.user_id === id)
  const userLikesIds = userLike.map(res => res.strategie_id)
  const userSaveIds = userSave.map(res => res.strategie_id)
  const userLikesIdsHi = userLike.map(res => res.strategie_id)
  const userSaveIdsHi = userSave.map(res => res.strategie_id)
  const [useLikesStr, setseLikesStr] = useState([])
  const [userSavesId, setuserSavesId] = useState([])
  const [useLikesStrHi, setseLikesStrHi] = useState([])
  const [userSavesIdHi, setuserSavesIdHi] = useState([])
  const [show, setShow] = useState(false)
  const getStrData = () => {
    setShow(true)
    getMultitStr(userLikesIds)
      .then(res => {
        setseLikesStr(res.data)
      })
    getMultitStr(userSaveIds)
      .then(res => {
        setuserSavesId(res.data)
      })
    getMultitHiStr(userLikesIdsHi)
      .then(res => {
        setseLikesStrHi(res.data)
      })
    getMultitHiStr(userSaveIdsHi)
      .then(res => {
        setuserSavesIdHi(res.data)
      })
  }
  const [avarageFullTime, setAvaregeFulltime] = useState([])
  const [totalLoginses, setTotalLoginses] = useState([])
  useEffect(() => {
    averageTime()
      .then(res => {
        setAvaregeFulltime(res.data);
      })
    totalLogins()
      .then(res => {
        setTotalLoginses(res.data);
      })
  }, [])
  const userTotalLogin = totalLoginses.filter(res => res.user_id === id)
  const avarageFullTimeUser = avarageFullTime.filter(res => res.user_id === id)

  const totalSecArray = avarageFullTimeUser.map(res => res.time)
  let sum = 0;
  for (let index = 0; index < totalSecArray.length; index++) {
    sum += totalSecArray[index]
  }
  const current = new Date();

  const month = current.getMonth();
  const year = current.getFullYear()
  const [isLoading5, setIsLoading5] = useState()
  const [lastLogin, setLastLogin] = useState()

  React.useEffect(() => {
    setIsLoading5(true)
    getLastmonthLogin(month, year)
      .then(res => {
        setIsLoading5(false)
        setLastLogin(res?.data?.lastmonthLogin);
      })
  }, [])
  const lastmonthLogin = lastLogin?.filter(res => res.user_id === id)
  const [isLoading10, setIsLoading10] = useState(false)
  const [lastAvgr, setLastAvgr] = useState([])
  React.useEffect(() => {
    setIsLoading10(true)
    getLastmonthAvgr(month, year)
      .then(res => {
        setIsLoading10(false)
        setLastAvgr(res?.data?.lastmonthAvrg);
      })
  }, [])
  const totalSecArray2 = lastAvgr?.map(res => res.time)
  let sum2 = 0;
  for (let index = 0; index < totalSecArray2.length; index++) {
    sum2 += totalSecArray2[index]
  }
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-3 text-white ">
          <div className="bg-primary p-2">
            <i className="fa fa-code-fork"></i>
            <span className="fs-5">{isLoading ? <Spinner className="text-light " animation="border" /> : moment(regestrationTime?.regesterTime).format('MMMM Do YYYY, h:mm a')}</span>
            <br /><br /> <span className="count-name">Registration Date & time</span>
          </div>
        </div>
        <div className="col-md-3 text-white ">
          <div className="bg-primary p-2">
            <i className="fa fa-code-fork"></i>
            <span className="fs-5">{isLoading ? <Spinner className="text-light " animation="border" /> : moment(userTotalLogin[userTotalLogin.length]?.date).format('MMMM Do YYYY, h:mm a')}</span>
            <br /><br /> <span className="count-name">Last Login</span>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card-counter info">
            <span className="count-numbers">{userLike?.length}</span>
            <span className="count-name">Total Likes</span>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card-counter info">
            <span className="count-numbers">{userSave?.length}</span>
            <span className="count-name">Total Saves</span>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card-counter info">
            <span className="count-numbers">{userComment?.length}</span>
            <span className="count-name">Total Comments</span>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card-counter info">
            <span className="count-numbers">{userTotalLogin?.length}</span>
            <span className="count-name">Total Logins</span>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card-counter info">
            <span className="count-numbers">{isLoading5 ? <Spinner className="text-light " animation="border" /> : lastmonthLogin?.length}</span>
            <span className="count-name">Logins in last month</span>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card-counter info">
            <span className="count-numbers">{(((sum2 / 60) / totalSecArray2.length).toFixed(2)) > 60 ? `${(((sum2 / 3600) / totalSecArray2.length).toFixed(2))} Hours` : `${isNaN((((sum2 / 60) / totalSecArray2.length).toFixed(2))) ? "0" : (((sum2 / 60) / totalSecArray2.length).toFixed(2))} Min`}</span>
            <span className="count-name">Average Time Spent(Last Month)</span>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card-counter info">
            <span className="count-numbers">{(((sum / 60) / totalSecArray.length).toFixed(2)) > 60 ? `${(((sum / 3600) / totalSecArray.length).toFixed(2))} Hours` : `${(((sum / 60) / totalSecArray.length).toFixed(2))} Min`}</span>
            <span className="count-name">Average Time Spent(Life Time)</span>
          </div>
        </div>
        <div className='row mt-3'>
          {
            show === false ?
              <div className="col-md-3">
                <button onClick={getStrData} className='btn btn-primary'>See Like and Save Strategy</button>
              </div> : ""
          }
          {
            (useLikesStr.length !== 0 || userSavesId.length !== 0 || useLikesStrHi.length !== 0 || userSavesIdHi.length !== 0) &&
            <>
              <div className="col-md-3">
                {
                  admin.type === 'super-admin' && (<CSVLink className=' btn btn-primary me-4' data={useLikesStr}>Download</CSVLink>)
                }
                <p className="count-name">Likes English strategies</p>
              </div>
              <div className="col-md-3">
                {
                  admin.type === 'super-admin' && <CSVLink className=' btn btn-primary me-4' data={userSavesId}>Download</CSVLink>

                }
                <p className="count-name">Saves English strategies</p>
              </div>
              <div className="col-md-3">
                {
                  admin.type === 'super-admin' && (<CSVLink className=' btn btn-primary me-4' data={useLikesStrHi}>Download</CSVLink>)
                }
                <p className="count-name">Likes Hindi strategies</p>
              </div>
              <div className="col-md-3">
                {
                  admin.type === 'super-admin' && <CSVLink className=' btn btn-primary me-4' data={userSavesIdHi}>Download</CSVLink>

                }
                <p className="count-name">Saves Hindi strategies</p>
              </div>
            </>
          }
        </div>
      </div>
    </div>
  );
};

export default UserDetails;