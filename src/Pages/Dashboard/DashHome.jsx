import React, { useEffect, useState } from 'react';
import { getUsers } from '../../services/dashboardUsers';
import { getAllStratigys, getComment, getMultitStr } from '../../services/stratigyes';
import { Alert, Spinner } from 'react-bootstrap';
import { gapi } from "gapi-script";

import './styles/dashHome.css'
import { getAllHindiStratigys, getMultitHiStr } from '../../services/hindiStratigys';
import { getLastmonthLogin, getLastmonthReg } from '../../services/dashboardNumbers';
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
  const [lastLogin, setLastLogin] = React.useState(0);
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
      .then(function () { console.log("Sign-in successful"); },
        function (err) { console.error("Error signing in", err); });
  }
  function loadClient() {
    gapi.client.setApiKey("AIzaSyDSKxk75p9eKHSbW9FOLk2PgXw3aDuXTtc");
    return gapi.client.load("https://analyticsdata.googleapis.com/$discovery/rest?version=v1beta")
      .then(function () {
        console.log("GAPI client loaded for API");
        //execute()
      },
        function (err) { console.error("Error loading GAPI client for API", err); });
  }
  const execute = () => {
    console.log('k', gapi.client.analyticsdata)
    return gapi.client.analyticsdata.properties.runRealtimeReport({
      "property": "properties/346131718",
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
        console.log("Response1", response);
        setData(response.result)
      },
        function (err) { console.error("Execute error", err); });
  }

  const execute2 = () => {
    const startDate = "7daysAgo";
    const endDate = "today";
    return gapi.client.analyticsdata.properties.runReport({
      "property": "properties/346131718",
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
    gapi.auth2.init({ client_id: "35955249464-jdrpq4e1o11i7dohrns44m27uqnh6q5s.apps.googleusercontent.com" });
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
  useEffect(() => {
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
      getMultitStr([...outputArray, ...outputArray1])
        .then(res => {
          setTopPulled(res?.data);
        })
      getMultitHiStr([...outputArray, ...outputArray1])
        .then(res => {
          setTopPulled1(res?.data);
        })
    }
    if (outputArray.length !== 0 && outputArray1.length === 0) {
      getMultitStr(outputArray)
        .then(res => {
          setTopPulled(res?.data);
        })
      getMultitHiStr(outputArray)
        .then(res => {
          setTopPulled1(res?.data);
        })
    }
    if (outputArray.length === 0 && outputArray1.length !== 0) {
      getMultitStr(outputArray1)
        .then(res => {
          setTopPulled(res?.data);
        })
      getMultitHiStr(outputArray1)
        .then(res => {
          setTopPulled1(res?.data);
        })
    }
  }, [filter, spreaded])
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
  useEffect(() => {
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
      getMultitStr([...outputArray, ...outputArray1])
        .then(res => {
          setTopSearcPulled(res?.data);
        })
      getMultitHiStr([...outputArray, ...outputArray1])
        .then(res => {
          setTopSearcPulled1(res?.data);
        })
    }
    if (outputArray.length !== 0 && outputArray1.length === 0) {
      getMultitStr(outputArray)
        .then(res => {
          setTopSearcPulled(res?.data);
        })
      getMultitHiStr(outputArray)
        .then(res => {
          setTopSearcPulled1(res?.data);
        })
    }
    if (outputArray.length === 0 && outputArray1.length !== 0) {
      getMultitStr(outputArray1)
        .then(res => {
          setTopSearcPulled(res?.data);
        })
      getMultitHiStr(outputArray1)
        .then(res => {
          setTopSearcPulled1(res?.data);
        })
    }
  }, [searchStra, filter])

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

  const totalSecArray = avarageFullTime.map(res => res.time)
  let sum = 0;
  for (let index = 0; index < totalSecArray.length; index++) {
    sum += totalSecArray[index]
  }
  // console.log();
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

            <span className="count-numbers">{isLoading5 ? <Spinner className="text-light " animation="border" /> : lastLogin}</span>
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
            <span className="count-numbers">{(((sum / 60) / totalSecArray.length).toFixed(2)) > 60 ? `${(((sum / 3600) / totalSecArray.length).toFixed(2))} Hours` : `${(((sum / 60) / totalSecArray.length).toFixed(2))} Min`}</span>
            <span className="count-name">Average Time Spent</span>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card-counter info">
            <span className="count-numbers">{totalLoginses.length}</span>
            <span className="count-name">Total Logins</span>
          </div>
        </div>
        <div className="col-md-3">
          {
            admin.type === 'super-admin' && (topPulled?.length !== 0 ? <CSVLink className=' btn btn-primary me-4' data={csvData}>Download</CSVLink> : <Alert variant={"danger"}>
              Wait! Data is loading.
            </Alert>)
          }
          <p className="count-name">Top English strategies</p>
        </div>
        <div className="col-md-3">
          {
            admin.type === 'super-admin' && (topPulled1?.length !== 0 ? <CSVLink className=' btn btn-primary me-4' data={csvData1}>Download</CSVLink> : <Alert variant={"danger"}>
              Wait! Data is loading.
            </Alert>)
          }
          <p className="count-name">Top Hindi strategies</p>
        </div>
        <div className="col-md-3">
          {
            admin.type === 'super-admin' && (topSearcPulled?.length !== 0 ? <CSVLink className=' btn btn-primary me-4' data={csvData3}>Download</CSVLink> : <Alert variant={"danger"}>
              No Data Available for Download
            </Alert>)
          }
          <p className="count-name">Top Pulled English strategies</p>
        </div>
        <div className="col-md-3">
          {
            admin.type === 'super-admin' && (topSearcPulled1?.length !== 0 ? <CSVLink className=' btn btn-primary me-4' data={csvData4}>Download</CSVLink> : <Alert variant={"danger"}>
              No Data Available for Download
            </Alert>)
          }
          <p className="count-name">Top Pulled Hindi strategies</p>
        </div>
        <div className="col-md-3">
          <Link to="/browsers-devices"><button className='btn btn-primary'>See Device and Browser</button></Link>
        </div>
        <div className="col-md-3 mt-4">
          <button className='btn btn-primary' onClick={() => authenticate().then(loadClient())}>Login with Google</button>
          <button className='btn btn-primary mt-3' onClick={() => execute()}>Get GA Data</button>
        </div>
        <div className="col-md-3">
          <div className="card-counter info">

            <span className="count-numbers">{data?.rows[0].metricValues[1].value}</span>
            <span className="count-name">Total Unique Login</span>
          </div>
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
      </div>
    </div>
  );
};

export default DashHome;