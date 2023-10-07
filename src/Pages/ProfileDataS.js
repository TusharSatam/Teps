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
import './styles/profileData.css';
import FilterStrHi from '../Components/Home/FilterStrHI';

const ProfileDataS = () => {
  const { user, setUser, stratigyFilData } = useAuth()
  const [filetr, setFilter] = useState(false)
  const [saveStratigy, setSaveStratigy] = useState([])
  const [saveUserStratigy, setSaveUserStratigy] = useState([])
  const [saveStratigyi, setSaveStratigyi] = useState([])
  const [saveStratigyHiUser, setSaveStratigyiUser] = useState([])
  const [languageSelect, setLanguageSelect] = React.useState("en");
  const [collapse,setCollapse] = useState(false);
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
  const [savesArr,setSavesArr] = useState([]);

  React.useEffect(() => {
    setIsLoading(true)
    getSaves()
      .then(res => {
        const saves = res?.data?.filter(ress => ress.user_id === user._id)
        const savesId = saves?.map(ress => ress.strategie_id)
        setSavesArr(res?.data);
        setSave(saves?.map(ress => ress.strategie_id))
        if (languageSelect === "en") {
          getMultitStr(savesId)
            .then(res => {
              setSaveStratigy(res.data);
              setIsLoading(false);
            })
            .catch(err => {
              setIsLoading(false)
              setSaveStratigy([])
            })
          // getMultiUsertStr(savesId)
          //   .then(res => {
          //     setSaveUserStratigy(res.data);
          //     setIsLoading(false)
          //   })
          //   .catch(err => {
          //     setSaveUserStratigy([])
          //     setIsLoading(false)
          //   })
        }
        else {
          getMultitHiStr(savesId)
            .then(res => {
              setSaveStratigy(res.data)
              setIsLoading(false)
            })
            .catch((err)=>{
              setSaveStratigy([])
              setIsLoading(false)
            });
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
    const requiredObj = savesArr.find(obj=>obj?.strategie_id===id);
    console.log({requiredObj})
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
      <div onClick={()=>{setCollapse(prev=>!prev)}} className='saveStrParent'>
        <div className='row py-2 align-items-center' id="div1">
          <div className='d-flex justify-content-start'>
            <span className='text-white headText w-50'>{t("Saved Strategies")}</span>
          </div>
          <div className='filter_btn_container d-flex justify-content-end' id="at">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
          <g clip-path="url(#clip0_4614_16349)" transform={collapse?"":"rotate(180, 12, 12)"}>

    <path d="M11.5 12.5456L15.0002 10L16 10.7272L11.5 14L7 10.7272L7.99984 10L11.5 12.5456Z" fill="white"/>
  </g>
  <defs>
    <clipPath id="clip0_4614_16349">
      <rect width="24" height="24" fill="white"/>
    </clipPath>
  </defs>
</svg>
          </div>
        </div>
    
      </div>
      {isLoading ?
        <div id="div2">
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div> :
        (saveStratigy?.length === 0 && saveUserStratigy?.length === 0) && collapse !==true ? 
          <h1 className='my-5 text-center py-5 text-danger'>{t("No Saved Strategies available.")}</h1> :
          (saveStratigy?.length !== 0 && collapse !==true?
            <>
              {
                saveStratigy?.map((res, index) => (
                  <div key={index} className='cardContainer'>
                    <div id="ws" className='card_pad'>
                      <div className='mt-4'>
                        <div className='d-flex justify-content-between'>
                          <div className='col-9 ms-md-4 col-md-8 '>
                            <Link id="nb">
                              <p id="bswm">Project-based Learning</p>
                              <p className='savestr_head'>Learning Outcome: {res["Learning Outcome"]}</p>
                              <p className='savestr_body'>
                                {res["Teaching Strategy"].slice(0, 150) + '...'}
                                <Link to={`/single/${res._id}`} id="pgnw">Read More...</Link>
                              </p>
                            </Link>
                           
                          </div>
                          <div className='col-3 col-md-2 d-none d-md-block ms-5' id="mt">
                          <div className=' align-items-center '>
                              {save?.includes(res._id) ? <img onClick={() => handleApiUnSaves(res._id)} id="pt" className='me-2 me-md-3 save_like' src={SavedIcon} alt="unlike" /> : <img onClick={() => handleApiSaves(res._id)} id="pt" className='me-2 me-md-3 save_like' src={SaveIcon} alt="like" />}
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