import React, { useState } from 'react';
import {  Spinner } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import SaveIcon from '../asstes/icons/Save.svg';
import SavedIcon from '../asstes/icons/Saved.svg';
import { useAuth } from '../Context/AuthContext';
import { getMultitHiStr } from '../services/hindiStratigys';
import { getMultitStr } from '../services/stratigyes';
import { delUserSaves, getSaves, postSaves } from '../services/userSaves';
import { getMultiUsertStr } from '../services/userStratigy';
import { getMultiUserHindiStr } from '../services/userStratigyHi';
import './styles/saveStratigy.css';
import FilterStrHi from '../Components/Home/FilterStrHI';

const ProfileDataS = () => {
  const { user, setUser, stratigyFilData } = useAuth()
  const [filetr, setFilter] = useState(false)
  const [saveStratigy, setSaveStratigy] = useState([])
  const [saveUserStratigy, setSaveUserStratigy] = useState([])
  const [saveStratigyHi, setSaveStratigyi] = useState([])
  const [saveStratigyHiUser, setSaveStratigyiUser] = useState([])
  const [languageSelect, setLanguageSelect] = React.useState("en")
  const [react, setReact] = React.useState(user ? user?.saveId : []);
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(false)
  const language = localStorage.getItem("i18nextLng")
 
  React.useEffect(() => {
    if (language === "hi") {
      setLanguageSelect("hi")
    }
    else {
      setLanguageSelect("en")
    }
  }, [language])

  const handleFilter = () => {
    if (filetr) {
      setFilter(false)
    }
    else {
      setFilter(true)
    }
  }
  const [save, setSave] = useState([]);

  React.useEffect(() => {
    setIsLoading(true)
    getSaves()
      .then(res => {
        const saves = res?.data?.filter(ress => ress.user_id === user._id)
        const savesId = saves?.map(ress => ress.strategie_id)
       
        setSave(saves?.map(ress => ress.strategie_id))
        if (languageSelect === "en") {
          getMultitStr(savesId)
            .then(res => {
              setSaveStratigy(res.data);
              setIsLoading(false)
            })
            .catch(err => {
              setIsLoading(false)
              setSaveStratigy([])
            })
          getMultiUsertStr(savesId)
            .then(res => {
              setSaveUserStratigy(res.data);
              setIsLoading(false)
            })
            .catch(err => {
              setSaveUserStratigy([])
              setIsLoading(false)
            })
        }
        else {
          getMultitHiStr(savesId)
            .then(res => {
              setSaveStratigyi(res.data)
              setIsLoading(false)
            })
          getMultiUserHindiStr(savesId)
            .then(res => {
              setSaveStratigyiUser(res.data)
              setIsLoading(false)
            })
        }
      })

  }, [languageSelect])
// console.log(user._id)
  const handleApiSaves = (id) => {
    const data = {
      strategie_id: id,
      user_id: user._id
    }
    postSaves(data)
      .then(res => {
        getSaves()
          .then(res => {
            const saves = res?.data?.filter(ress => ress.user_id === user._id)
            const savesId = saves?.map(ress => ress.strategie_id)
            setSave(saves?.map(ress => ress.strategie_id))
            if (languageSelect === "en") {
              getMultitStr(savesId)
                .then(res => {
                  setSaveStratigy(res.data);
                })
                .catch(err => setSaveStratigy([]))
              getMultiUsertStr(savesId)
                .then(res => {
                  setSaveUserStratigy(res.data);
                })
                .catch(err => setSaveUserStratigy([]))
            }
            else {
              getMultitHiStr(savesId)
                .then(res => {
                  setSaveStratigyi(res.data)
                })
              getMultiUserHindiStr(savesId)
                .then(res => {
                  setSaveStratigyiUser(res.data)
                })
            }
          })
      })
  }
  const handleApiUnSaves = (id) => {
    delUserSaves(id)
      .then(res => {
        getSaves()
          .then(res => {
            const saves = res?.data?.filter(ress => ress.user_id === user._id)
            const savesId = saves?.map(ress => ress.strategie_id)
            setSave(saves?.map(ress => ress.strategie_id))
            if (languageSelect === "en") {
              getMultitStr(savesId)
                .then(res => {
                  setSaveStratigy(res.data);
                })
                .catch(err => setSaveStratigy([]))
              getMultiUsertStr(savesId)
                .then(res => {
                  setSaveUserStratigy(res.data);
                })
                .catch(err => setSaveUserStratigy([]))
            }
            else {
              getMultitHiStr(savesId)
                .then(res => {
                  setSaveStratigyi(res.data)
                })
              getMultiUserHindiStr(savesId)
                .then(res => {
                  setSaveStratigyiUser(res.data)
                })
            }
          })
      })
  }
  
  return (
    <div>
  {languageSelect === "en" ?
    <>
      <div tyle={{borderRadius:"15px"}} className='saveStrParent'>
        <div className='row py-2 align-items-center' style={{ alignItems: "center", position: 'relative' }}>
          <div s className='d-flex justify-content-center'>
            <span className='text-white text-center headText w-50'>{t("Saved Strategies")}</span>
          </div>
          <div className='filter_btn_container d-flex justify-content-end' style={{ position: "absolute", top: "100" }}>
          
          </div>
        </div>
    
      </div>
      {isLoading ?
        <div style={{ marginLeft: "650px", marginTop: "150px", marginBottom: "150px" }}>
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div> :
        (saveStratigy?.length === 0 && saveUserStratigy?.length === 0) ? 
          <h1 className='my-5 text-center py-5 text-danger'>{t("No Saved Strategies available.")}</h1> :
          (stratigyFilData?.length !== 0 ?
            <>
              {
                stratigyFilData?.map((res, index) => (
                  <div key={index} className='container'>
                    <div style={{ background: "whitesmoke" }} className='card_pad'>
                      <div className='my-4'>
                        <div className='d-flex justify-content-between my-4 '>
                          <Link to={`/single/${res._id}`} style={{ textDecoration: "none", color: 'black' }}>
                            <div className='me-1'>
                            
                              <div>
                                <div className='d-flex mb-3 str_text_left'>
                                  <p className='Strategy_count'>{t("strategy")}</p>
                                  <p className='counter_str'>{index + 1}</p>
                                </div>
                              </div>
                              <div className='d-block d-md-none mt-1'>
                                <div className=' mt-1' style={{ marginLeft: "20px" }}>
                                </div>
                              </div>
                            </div>
                          </Link>
                          <div className='col-9 ms-md-4 col-md-8 '>
                            <Link  style={{ textDecoration: "none", color: 'black' }}>
                              <p style={{color:"brown",fontSize:"19px",fontWeight:"500",margin:"14px 0px 0px"}}>Project-based Learning</p>
                              <p className='savestr_head'>Learning Outcome: {res["Learning Outcome"]}</p>
                              <p className='savestr_body'>
                                {res["Teaching Strategy"].slice(0, 150) + '...'}
                                <Link to={`/saveStratigy`} style={{cursor:"pointer", color:"green",textDecoration: "none", fontWeight:"600"}}>Load All</Link>
                              </p>
                            </Link>
                           
                          </div>
                          <div className='col-3 col-md-2 d-none d-md-block ms-5' style={{ marginTop: "40px" }}>
                          <div className=' align-items-center '>
                              {save?.includes(res._id) ? <img onClick={() => handleApiUnSaves(res._id)} style={{marginTop:"-32px", cursor: "pointer" }} className='me-2 me-md-3 save_like' src={SavedIcon} alt="" /> : <img onClick={() => handleApiSaves(res._id)} style={{ cursor: "pointer",marginTop:"-32px" }} className='me-2 me-md-3 save_like' src={SaveIcon} alt="" />}
                            </div>
                            <div className='d-flex flex-column align-items-center justify-content-center'>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              }
            </> : null
          )
      }
    </> : null
  }
</div>
  )
};
export default ProfileDataS