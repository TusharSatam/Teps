import React, { useEffect, useState } from 'react';
import { getUsers } from '../../services/dashboardUsers';
import { getAllStratigys, getComment, getMultitStr } from '../../services/stratigyes';
import { Alert, Spinner } from 'react-bootstrap';
import { gapi } from "gapi-script";

import './styles/dashHome.css'
import { getAllHindiStratigys, getMultitHiStr } from '../../services/hindiStratigys';
import { getLastmonthAvgr, getLastmonthLogin, getLastmonthReg } from '../../services/dashboardNumbers';
import { getLikes } from '../../services/userLikes';
import { getSaves } from '../../services/userSaves';
import axios from 'axios';
import { GoogleLogin, useGoogleLogin } from '@react-oauth/google';
import { Link, useLocation } from 'react-router-dom';
import AnalyticsDash from './AnalyticsDash';
import { CSVLink } from 'react-csv';
import { useAuth } from '../../Context/AuthContext';
import { averageTime, getPulledStr } from '../../services/pulledStratigy';
import { totalLogins } from '../../services/totalLogins';
import moment from 'moment';
import { getUserStratigys } from '../../services/userStratigy';
import { getUserStratigysHi } from '../../services/userStratigyHi';
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
  const [totalLikes, setTotalLikes] = React.useState([]);
  const [totalComments, setTotalComments] = React.useState([]);
  const [isLoading7, setIsLoading7] = React.useState(false);
  const [isLoading8, setIsLoading8] = React.useState(false);
  const [totalSaves, setTotalSaves] = React.useState([]);
  const [lastLogin, setLastLogin] = React.useState([]);
  const [token, setToken] = React.useState('')
  const { admin } = useAuth()
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

  React.useEffect(() => {
    setIsLoading6(true)
    getLikes()
      .then(res => {
        setIsLoading6(false)
        setTotalLikes(res?.data);
      })
  }, [])

  React.useEffect(() => {
    setIsLoading7(true)
    getSaves()
      .then(res => {
        setIsLoading7(false)
        setTotalSaves(res?.data);
      })
  }, [])

  React.useEffect(() => {
    setIsLoading8(true)
    getComment()
      .then(res => {
        setIsLoading8(false)
        setTotalComments(res?.data);
      })
  }, [])



  const handleClick = () => {
    axios.get("https://www.googleapis.com/analytics/v3/data/realtime?ids=ga:346131718&&metrics=rt:city",
      {
        headers: {
          "Content-type": "application/json",
          "Authorization": `Bearer ${token}`
        }
      }
    )
      .then(res => {
        console.log(res);
      })
  }

  const googleLogin = useGoogleLogin({
    onSuccess: async (codeResponse) => {
      setToken(codeResponse.access_token)
    },
    onError: errorResponse => console.log(errorResponse),
  });
  let location = useLocation();

  useEffect(() => {
    window.gtag('event', 'page_view', {
      page_title: 'home',
      page_path: location.pathname + location.search,
      page_location: window.location.href
    })
  }, [location]);




  const [data, setData] = useState()
  const [data2, setData2] = useState()

  //   Make sure the client is loaded and sign-in is complete before calling this method.
  const authenticate = () => {
    return gapi.auth2.getAuthInstance()
      .signIn({ scope: "https://www.googleapis.com/auth/analytics https://www.googleapis.com/auth/analytics.readonly" })
      .then(function () {
        loadClient()
        console.log("Sign-in successful");
      },
        function (err) { console.error("Error signing in", err); });
  }
  function loadClient() {
    gapi.client.setApiKey("AIzaSyBuWz5biNvtQfMCzysItTKxIxHwGJtAUWs");
    return gapi.client.load("https://analyticsdata.googleapis.com/$discovery/rest?version=v1beta")
      .then(function () {
        console.log("GAPI client loaded for API");
        execute()
      },
        function (err) { console.error("Error loading GAPI client for API", err); });
  }
  const [dataLoading, setDataLoading] = useState(false);
  const execute = () => {
    setDataLoading(true)
    return gapi?.client?.analyticsdata?.properties?.runRealtimeReport({
      "property": "properties/351098594",
      "resource": {
        "dimensions": [
          {
            "name": "appVersion"
          },
          {
            "name": "deviceCategory"
          },
          {
            "name": "platform"
          },
          {
            "name": "unifiedScreenName"
          },
        ]
        ,
        "metrics": [
          {
            "name": "screenPageViews",
          },
          {
            "name": "activeUsers",
          },
        ]
      }
    })
      .then(function (response) {
        // Handle the results here (response.result has the parsed body).
        setDataLoading(false);
        setData(response.result)
      },
        function (err) { console.error("Execute error", err); });
  }

  const execute2 = () => {
    const startDate = "7daysAgo";
    const endDate = "today";
    return gapi.client.analyticsdata.properties.runReport({
      "property": "properties/351098594",
      "dateRanges": [{ startDate, endDate }],
      "metrics": [
        {
          "name": "bounceRate",
        },
      ]

    })
      .then(function (response) {
        // Handle the results here (response.result has the parsed body).
        console.log("Response2", response);
        setData2(response.result)
      },
        function (err) { console.error("Execute error", err); });
  }

  gapi.load("client:auth2", function () {
    gapi.auth2.init({ client_id: "750670617713-ui98njvoppd8evq323752skbaok6lr10.apps.googleusercontent.com" });
  });

  const topLikestratigy = totalLikes?.map(res => res.strategie_id)
  const topSaveStratigy = totalSaves?.map(res => res.strategie_id)
  const topCommentsStratigy = totalComments?.map(res => res.strategie_id)
  const spreaded = [...topLikestratigy, ...topSaveStratigy, ...topCommentsStratigy];
  const filter = spreaded.filter(el => {
    return (topLikestratigy.includes(el) && topSaveStratigy.includes(el)) && topCommentsStratigy.includes(el);
  })



  const [topPulled, setTopPulled] = useState([])
  const [topPulled1, setTopPulled1] = useState([])
  const [show, setShow] = useState(false)
  const getSearchData = () => {
    setShow(true)
    var outputArray = [];
    var count = 0;
    var start = false;
    for (let j = 0; j < filter.length; j++) {
      for (let k = 0; k < outputArray.length; k++) {
        if (filter[j] == outputArray[k]) {
          start = true;
        }
      }
      count++;
      if (count == 1 && start == false) {
        outputArray.push(filter[j]);
      }
      start = false;
      count = 0;
    }
    const filterLess = spreaded.filter(el => {
      return (!outputArray.includes(el));
    })

    var outputArray1 = [];
    var count1 = 0;
    var start1 = false;
    for (let j = 0; j < filterLess.length; j++) {
      for (let k = 0; k < outputArray1.length; k++) {
        if (filterLess[j] == outputArray1[k]) {
          start1 = true;
        }
      }
      count1++;
      if (count1 == 1 && start1 == false) {
        outputArray1.push(filterLess[j]);
      }
      start1 = false;
      count1 = 0;
    }

    if (outputArray.length !== 0 && outputArray1.length !== 0) {
      getMultitStr([...outputArray, ...outputArray1].filter(res => res !== undefined))
        .then(res => {
          setTopPulled(res?.data);
        })
      getMultitHiStr([...outputArray, ...outputArray1].filter(res => res !== undefined))
        .then(res => {
          setTopPulled1(res?.data);
        })
    }
    if (outputArray.length !== 0 && outputArray1.length === 0) {
      getMultitStr(outputArray.filter(res => res !== undefined))
        .then(res => {
          setTopPulled(res?.data);
        })
      getMultitHiStr(outputArray.filter(res => res !== undefined))
        .then(res => {
          setTopPulled1(res?.data);
        })
    }
    if (outputArray.length === 0 && outputArray1.length !== 0) {
      getMultitStr(outputArray1.filter(res => res !== undefined))
        .then(res => {
          setTopPulled(res?.data);
        })
      getMultitHiStr(outputArray1.filter(res => res !== undefined))
        .then(res => {
          setTopPulled1(res?.data);
        })
    }
  }
  const csvData = topPulled ? topPulled : [];
  const csvData1 = topPulled1 ? topPulled1 : [];

  const [searchStra, setSearchStra] = useState([])
  useEffect(() => {
    getPulledStr()
      .then(res => {
        setSearchStra(res.data);
      })
  }, [])
  const [topSearcPulled, setTopSearcPulled] = useState([])
  const [topSearcPulled1, setTopSearcPulled1] = useState([])
  const [show2, setShow2] = useState(false)
  const pulledData = () => {
    setShow2(true)
    const searchableData = searchStra.map(res => res.strategie_id)
    var outputArray = [];
    var count = 0;
    var start = false;
    for (let j = 0; j < filter.length; j++) {
      for (let k = 0; k < outputArray.length; k++) {
        if (filter[j] == outputArray[k]) {
          start = true;
        }
      }
      count++;
      if (count == 1 && start == false) {
        outputArray.push(filter[j]);
      }
      start = false;
      count = 0;
    }
    const filterLess = searchableData.filter(el => {
      return (!outputArray.includes(el));
    })

    var outputArray1 = [];
    var count1 = 0;
    var start1 = false;
    for (let j = 0; j < filterLess.length; j++) {
      for (let k = 0; k < outputArray1.length; k++) {
        if (filterLess[j] == outputArray1[k]) {
          start1 = true;
        }
      }
      count1++;
      if (count1 == 1 && start1 == false) {
        outputArray1.push(searchableData[j]);
      }
      start1 = false;
      count1 = 0;
    }

    if (outputArray.length !== 0 && outputArray1.length !== 0) {
      getMultitStr([...outputArray, ...outputArray1].filter(res => res !== undefined))
        .then(res => {
          setTopSearcPulled(res?.data);
        })
      getMultitHiStr([...outputArray, ...outputArray1].filter(res => res !== undefined))
        .then(res => {
          setTopSearcPulled1(res?.data);
        })
    }
    if (outputArray.length !== 0 && outputArray1.length === 0) {
      getMultitStr(outputArray.filter(res => res !== undefined))
        .then(res => {
          setTopSearcPulled(res?.data);
        })
      getMultitHiStr(outputArray.filter(res => res !== undefined))
        .then(res => {
          setTopSearcPulled1(res?.data);
        })
    }
    if (outputArray.length === 0 && outputArray1.length !== 0) {
      getMultitStr(outputArray1.filter(res => res !== undefined))
        .then(res => {
          setTopSearcPulled(res?.data);
        })
      getMultitHiStr(outputArray1.filter(res => res !== undefined))
        .then(res => {
          setTopSearcPulled1(res?.data);
        })
    }
  }

  const csvData3 = topSearcPulled ? topSearcPulled : [];
  const csvData4 = topSearcPulled1 ? topSearcPulled1 : [];
  const searchableData = searchStra.map(res => res.strategie_id)


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

  const totalSecArray = avarageFullTime?.map(res => res.time)
  let sum = 0;
  for (let index = 0; index < totalSecArray.length; index++) {
    sum += totalSecArray[index]
  }
  const totalSecArray2 = lastAvgr?.map(res => res.time)
  let sum2 = 0;
  for (let index = 0; index < totalSecArray2.length; index++) {
    sum2 += totalSecArray2[index]
  }
  const [enStr, setEnStr] = React.useState([])

  React.useEffect(() => {
    setIsLoading2(true)
    getUserStratigys()
      .then(res => {
        setEnStr(res.data?.filter(res => res.Approve === true))
        setIsLoading2(false)
        console.log(res.data?.posts);
      })
  }, [])
  const [userHiStr, setUserHiStr] = useState([])
  React.useEffect(() => {
    setIsLoading3(true)
    getUserStratigysHi()
      .then(res => {
        setUserHiStr(res.data?.filter(res => res.Approve === true))
        setIsLoading3(false)
      })
  }, [])

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-3">
          <div className="card-counter primary">
            <span className="count-numbers">{isLoading2 ? <Spinner className="text-light " animation="border" /> : (stratigys?.length + enStr.length)}</span>
            <span className="count-name">English Strategies</span>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card-counter primary">
            <span className="count-numbers">{isLoading3 ? <Spinner className="text-light " animation="border" /> : (hindiStratigys?.length + userHiStr.length)}</span>
            <span className="count-name">Hindi Strategies</span>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card-counter info">
            <span className="count-numbers">{isLoading ? <Spinner className="text-light " animation="border" /> : user?.length}</span>
            <span className="count-name">Total Users</span>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card-counter info">
            <span className="count-numbers">{isLoading4 ? <Spinner className="text-light " animation="border" /> : lastRegester}</span>
            <span className="count-name">Registrations in last month</span>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card-counter info">
            <span className="count-numbers">{isLoading5 ? <Spinner className="text-light " animation="border" /> : lastLogin.length}</span>
            <span className="count-name">Logins in last month</span>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card-counter info">
            <span className="count-numbers">{isLoading6 ? <Spinner className="text-light " animation="border" /> : totalLikes?.length}</span>
            <span className="count-name">Total strategies liked</span>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card-counter info">
            <span className="count-numbers">{isLoading7 ? <Spinner className="text-light " animation="border" /> : totalSaves?.length}</span>
            <span className="count-name">Total strategies Saved</span>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card-counter info">
            <span className="count-numbers">{isLoading8 ? <Spinner className="text-light " animation="border" /> : totalComments?.length}</span>
            <span className="count-name">Total strategies Comments</span>
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
            <span className="count-name">Average Time Spent(lifeTime)</span>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card-counter info">
            <span className="count-numbers">{totalLoginses.length}</span>
            <span className="count-name">Total Logins</span>
          </div>
        </div>
        {
          data?.rows[0].metricValues[1].value ?
            <div className="col-md-3">
              <div className="card-counter info">
                <span className="count-numbers">{data?.rows[0].metricValues[1].value}</span>
                <span className="count-name">Total Unique Login</span>
              </div>
            </div>
            :
            <div className="col-md-3">
            </div>
        }

        {
          dataLoading ? <div className="col-md-3">
            <div className="card-counter info d-flex justify-content-center align-items-center">
              <span className="count-numbers "> <Spinner className="text-light" animation="border" /></span>
            </div>
          </div> :
            !data?.rows[0].metricValues[1].value &&
            <div className="col-md-3 mt-4">
              <button className='btn btn-primary w-100' onClick={() => authenticate()}>Get Total Unique Login</button>
              {/* <button className='btn btn-primary mt-3 w-100' onClick={() => execute()}>Get GA Data</button> */}
            </div>
        }
        <div className="col-md-3 mt-4">
          <Link to="/browsers-devices"><button className='btn btn-primary w-100'>See Device and Browser</button></Link>
        </div>

        {/* <div className="col-md-3">
          <div className="card-counter info">

            <span className="count-numbers">{data?.rows[0]?.metricValues[0].value}</span>
            <span className="count-name">Total Unique Page View</span>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card-counter info">

            <span className="count-numbers">{data?.rows[0]?.dimensionValues[1].value}</span>
            <span className="count-name">Usage Devices</span>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card-counter info">

            <span className="count-numbers">{data?.rows[0]?.dimensionValues[2].value}</span>
            <span className="count-name">Usage Browser</span>
          </div>
        </div> */}

        {/* <GoogleLogin
            onSuccess={credentialResponse => {
              setToken(credentialResponse.credential);
            }}
            onError={() => {
              console.log('Login Failed');
            }}
          />
          <button onClick={googleLogin}>submit</button>
          <button onClick={handleClick}>submit</button> */}
        {/* <AnalyticsDash /> */}
        <div className='row  my-5'>
          {
            show === false ?
              <div className="col-md-3">
                <button onClick={getSearchData} className='btn btn-primary w-100'>See Top Strategies</button>
              </div> : <>
                <div className="col-md-3">
                  {
                    admin.type === 'super-admin' && <CSVLink className=' btn btn-primary me-4' data={csvData}>Download</CSVLink>
                  }
                  <p className="count-name">Top English strategies</p>
                </div>
                <div className="col-md-3">
                  {
                    admin.type === 'super-admin' && <CSVLink className=' btn btn-primary me-4' data={csvData1}>Download</CSVLink>
                  }
                  <p className="count-name">Top Hindi strategies</p>
                </div>
              </>
          }
          {
            show2 === false ?
              <div className="col-md-3">
                <button onClick={pulledData} className='btn btn-primary  w-100'>See Top Pulled Strategies</button>
              </div> : <>
                <div className="col-md-3">
                  {
                    admin.type === 'super-admin' && <CSVLink className=' btn btn-primary me-4' data={csvData3}>Download</CSVLink>
                  }
                  <p className="count-name">Top Pulled English strategies</p>
                </div>
                <div className="col-md-3">
                  {
                    admin.type === 'super-admin' && <CSVLink className=' btn btn-primary me-4' data={csvData4}>Download</CSVLink>
                  }
                  <p className="count-name">Top Pulled Hindi strategies</p>
                </div>
              </>
          }


        </div>
      </div>
    </div>
  );
};

export default DashHome;