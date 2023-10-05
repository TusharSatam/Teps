
import React, { useState } from 'react';
import { Spinner } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import { useAuth } from '../Context/AuthContext';
import { getMultitHiStr } from '../services/hindiStratigys';
import { getUserStbyID, getUserCreated} from '../services/userCreated';
import { getMultiUsertStr } from '../services/userStratigy';
import { getMultiUserHindiStr } from '../services/userStratigyHi';
import './styles/saveStratigy.css';
import { getEdits } from '../services/userEdited';
const ProfileDataE = () => {

    const { user, stratigyFilData } = useAuth()
    
    const [saveStratigy, setSaveStratigy] = useState([])
    const [saveUserStratigy, setSaveUserStratigy] = useState([])
    const [saveStratigyHi, setSaveStratigyi] = useState([])
    const [saveStratigyHiUser, setSaveStratigyiUser] = useState([])
    const [languageSelect, setLanguageSelect] = React.useState("en")
   
    const { t } = useTranslation();
    const [isLoading, setIsLoading] = useState(false)
    const language = localStorage.getItem("i18nextLng")
   
      const [save, setSave] = useState([]);
    React.useEffect(() => {
        setIsLoading(true)
        getEdits(user._id)
          .then(res => {
            const saves = res?.data?.filter(ress => ress.user_id === user._id)
            const savesId = saves?.map(ress => ress.strategie_id)
           
            setSave(saves?.map(ress => ress.strategie_id))
            if (languageSelect === "en") {
              
                getEdits(user._id)
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
      return (
        <>
       <div>
  {languageSelect === "en" ? (
    <>
      <div className='saveStrParent'>
        <div className='row py-2 align-items-center' id="div1">
          <div className='d-flex justify-content-center'>
            <span className='text-white text-center headText w-50'>
             {t("Edited Strategies")}
            </span>
          </div>

           </div>
        
      </div>
      {isLoading ? (
        <div id="div2">
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
      ) : (
        (saveStratigy?.length === 0 && saveUserStratigy?.length === 0) ? (
          <h1 className='my-5 text-center py-5 text-danger'>{t("No Saved Strategies available.")}</h1>
        ) : (
          stratigyFilData?.length !== 0 ? (
            <>
              {
                stratigyFilData?.map((res, index) => (
                  <div key={index} className='container'>
                    <div id="ws" className='card_pad'>
                      <div className='my-4'>
                        <div className='d-flex justify-content-between my-4 '>
                          <Link to={`/single/${res._id}`} id="nb">
                            <div className='me-1'>
                              <div>
                                <div className='d-flex mb-3 str_text_left'>
                                  <p className='Strategy_count'>{t("strategy")}</p>
                                  <p className='counter_str'>{index + 1}</p>
                                </div>
                              </div>
                              <div className='d-block d-md-none mt-1'>
                                <div className=' mt-1' id="ml">
                                </div>
                              </div>
                            </div>
                          </Link>
                          <div className='col-9 ms-md-4 col-md-8 '>
                            <Link  id="nb">
                              <p id="bswm">Project-based Learning</p>
                              <p className='savestr_head'>Learning Outcome: {res["Learning Outcome"]}</p>
                              <p className='savestr_body'>
                                {res["Teaching Strategy"].slice(0, 150) + '...'}
                                <Link to={`/editedStratigy`} id="pgnw">Load All</Link>
                              </p>
                            </Link>
                          </div>
                          <div className='col-3 col-md-2 d-none d-md-block ms-5' id="mt">
                            <div className='d-flex flex-column align-items-center justify-content-center'>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              }
            </>
          ) : null
        )
      )}
    </>
  ) : null}
</div>

        
        </>



      );
      
                    }
export default ProfileDataE 