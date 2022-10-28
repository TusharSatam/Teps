import React from 'react';
import OfflineIcon from '../asstes/icons/offline.svg'
import ChatIcon from '../asstes/icons/chat.svg'
import KnowledgeIcon from '../asstes/icons/knowledge.svg'
import Physical from '../asstes/icons/Motor-Physical.png'
import FavIcon from '../asstes/icons/Liked.svg'
import { useTranslation } from 'react-i18next';
import { useAuth } from '../Context/AuthContext';
import Filter from "../asstes/Filter.svg"
import HomeLayout from "../Components/Home/HomeLayout"
import { useState } from 'react';
const FavouriteStr = () => {
  const [filetr, setFilter] = useState(false)
  const { t } = useTranslation();
  const { user } = useAuth()
  const handleFilter = () => {
    if (filetr) {
      setFilter(false)
    }
    else {
      setFilter(true)
    }
  }
  return (
    <div>
      <div className='saveStrParent' >
        <div className='row py-2'>
          <div className='col-md-1'></div>
          <div className='col-8 col-md-10 text-white text-center headText mt-2 mt-md-0'>{user.firstName}{user.lastName}’s Favourite  Strategies</div>
          <div onClick={handleFilter} className='col-md-1 bg-white py-1 px-3' style={{ borderRadius: "27px", width: "90px", cursor: "pointer" }}>
            <span style={{ color: "#1AA05B" }}>Filter</span>
            <img src={Filter} alt="" />
          </div>
        </div>
        <div className={filetr ? 'd-block' : 'd-none'}>
          <HomeLayout />
        </div>
      </div>
      <div className='container'>
        <div style={{ background: "#FFFFFF" }} className='card_pad'>
          <div className='my-4'>
            <div className='d-flex justify-content-between my-4 '>
              <div className='me-1'>
                <div>
                  <div className='d-flex mb-3'>
                    <p className='Strategy_count'>{t("strategy")}</p>
                    <p className='counter_str'>{1}</p>
                  </div>
                  {/* <span className='unique_id'>ID {data._id.slice(19, 26)}</span> */}
                </div>
                <div className='d-block d-md-none mt-1'>
                  <div className='icon_heading_text me-1 p-1'>Developmental Domains</div>
                  <div className=' mt-1' style={{ marginLeft: "20px" }}>
                    <div className='res_btn_icon'>
                      <div className='d-flex flex-column res_inner_div p-1 '>
                        <img title="Cognitive Sensory" className='threeIcons mb-1' src={KnowledgeIcon} alt="" />
                        <img title="Motor-Physical" className='threeIcons mb-1' src={Physical} alt="" />
                      </div>
                    </div>
                    <div className='ms-1'>
                      <img title='Classroom' className='threeIcons' src={OfflineIcon} alt="" />
                    </div>
                  </div>
                </div>
              </div>
              <div className='col-9 ms-4 col-md-8 '>
                <p className='savestr_head'>Learning Outcome: Makes text-to-self connections with the character</p>
                <p className='savestr_body'>
                  Inform students what the term 'character' means: a person or animal that says, does and feels things in a story. Ask a few students to name and act like their favourite character from a story or movie. As you read the story, pause and ask students to repeat words said or actions done by characters in that story.
                </p>
                <div className='d-flex align-items-center my-3'>
                  <img style={{ cursor: "pointer" }} className="save_likes" src={FavIcon} alt="" />
                </div>
              </div>
              <div className='col-md-2 d-none d-md-block ms-5'>
                <div className='d-flex flex-column align-items-center justify-content-center'>
                  <div>
                    <span className='icons_heading'>Developmental Domains</span>
                  </div>
                  <div className='d-flex align-items-center justify-content-center mt-md-2'>
                    <div className='d-flex align-items-center justify-content-center border p-2 me-2'>
                      <img title="Motor-Physical" className='threeIcons ' src={Physical} alt="" />
                      <img title='Language & Communication' className='threeIcons ms-3' src={ChatIcon} alt="" />
                    </div>
                    <img title='Classroom' className='threeIcons' src={OfflineIcon} alt="" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='container'>
        <div style={{ background: "#FFFFFF" }} className='card_pad'>
          <div className='my-4'>
            <div className='d-flex justify-content-between my-4 '>
              <div className='me-1'>
                <div>
                  <div className='d-flex mb-3'>
                    <p className='Strategy_count'>{t("strategy")}</p>
                    <p className='counter_str'>{1}</p>
                  </div>
                  {/* <span className='unique_id'>ID {data._id.slice(19, 26)}</span> */}
                </div>
                <div className='d-block d-md-none mt-1'>
                  <div className='icon_heading_text me-1 p-1'>Developmental Domains</div>
                  <div className=' mt-1' style={{ marginLeft: "20px" }}>
                    <div className='res_btn_icon'>
                      <div className='d-flex flex-column res_inner_div p-1 '>
                        <img title="Cognitive Sensory" className='threeIcons mb-1' src={KnowledgeIcon} alt="" />
                        <img title="Motor-Physical" className='threeIcons mb-1' src={Physical} alt="" />
                      </div>
                    </div>
                    <div className='ms-1'>
                      <img title='Classroom' className='threeIcons' src={OfflineIcon} alt="" />
                    </div>
                  </div>
                </div>
              </div>
              <div className='col-9 ms-4 col-md-8 '>
                <p className='savestr_head'>Learning Outcome: Makes text-to-self connections with the character</p>
                <p className='savestr_body'>
                  Inform students what the term 'character' means: a person or animal that says, does and feels things in a story. Ask a few students to name and act like their favourite character from a story or movie. As you read the story, pause and ask students to repeat words said or actions done by characters in that story.
                </p>
                <div className='d-flex align-items-center my-3'>
                  <img style={{ cursor: "pointer" }} className="save_likes" src={FavIcon} alt="" />
                </div>
              </div>
              <div className='col-md-2 d-none d-md-block ms-5'>
                <div className='d-flex flex-column align-items-center justify-content-center'>
                  <div>
                    <span className='icons_heading'>Developmental Domains</span>
                  </div>
                  <div className='d-flex align-items-center justify-content-center mt-md-2'>
                    <div className='d-flex align-items-center justify-content-center border p-2 me-2'>
                      <img title="Motor-Physical" className='threeIcons ' src={Physical} alt="" />
                      <img title='Language & Communication' className='threeIcons ms-3' src={ChatIcon} alt="" />
                    </div>
                    <img title='Classroom' className='threeIcons' src={OfflineIcon} alt="" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='container'>
        <div style={{ background: "#FFFFFF" }} className='card_pad'>
          <div className='my-4'>
            <div className='d-flex justify-content-between my-4 '>
              <div className='me-1'>
                <div>
                  <div className='d-flex mb-3'>
                    <p className='Strategy_count'>{t("strategy")}</p>
                    <p className='counter_str'>{1}</p>
                  </div>
                  {/* <span className='unique_id'>ID {data._id.slice(19, 26)}</span> */}
                </div>
                <div className='d-block d-md-none mt-1'>
                  <div className='icon_heading_text me-1 p-1'>Developmental Domains</div>
                  <div className=' mt-1' style={{ marginLeft: "20px" }}>
                    <div className='res_btn_icon'>
                      <div className='d-flex flex-column res_inner_div p-1 '>
                        <img title="Cognitive Sensory" className='threeIcons mb-1' src={KnowledgeIcon} alt="" />
                        <img title="Motor-Physical" className='threeIcons mb-1' src={Physical} alt="" />
                      </div>
                    </div>
                    <div className='ms-1'>
                      <img title='Classroom' className='threeIcons' src={OfflineIcon} alt="" />
                    </div>
                  </div>
                </div>
              </div>
              <div className='col-9 ms-4 col-md-8 '>
                <p className='savestr_head'>Learning Outcome: Makes text-to-self connections with the character</p>
                <p className='savestr_body'>
                  Inform students what the term 'character' means: a person or animal that says, does and feels things in a story. Ask a few students to name and act like their favourite character from a story or movie. As you read the story, pause and ask students to repeat words said or actions done by characters in that story.
                </p>
                <div className='d-flex align-items-center my-3'>
                  <img style={{ cursor: "pointer" }} className="save_likes" src={FavIcon} alt="" />
                </div>
              </div>
              <div className='col-md-2 d-none d-md-block ms-5'>
                <div className='d-flex flex-column align-items-center justify-content-center'>
                  <div>
                    <span className='icons_heading'>Developmental Domains</span>
                  </div>
                  <div className='d-flex align-items-center justify-content-center mt-md-2'>
                    <div className='d-flex align-items-center justify-content-center border p-2 me-2'>
                      <img title="Motor-Physical" className='threeIcons ' src={Physical} alt="" />
                      <img title='Language & Communication' className='threeIcons ms-3' src={ChatIcon} alt="" />
                    </div>
                    <img title='Classroom' className='threeIcons' src={OfflineIcon} alt="" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='container'>
        <div style={{ background: "#FFFFFF" }} className='card_pad'>
          <div className='my-4'>
            <div className='d-flex justify-content-between my-4 '>
              <div className='me-1'>
                <div>
                  <div className='d-flex mb-3'>
                    <p className='Strategy_count'>{t("strategy")}</p>
                    <p className='counter_str'>{1}</p>
                  </div>
                  {/* <span className='unique_id'>ID {data._id.slice(19, 26)}</span> */}
                </div>
                <div className='d-block d-md-none mt-1'>
                  <div className='icon_heading_text me-1 p-1'>Developmental Domains</div>
                  <div className=' mt-1' style={{ marginLeft: "20px" }}>
                    <div className='res_btn_icon'>
                      <div className='d-flex flex-column res_inner_div p-1 '>
                        <img title="Cognitive Sensory" className='threeIcons mb-1' src={KnowledgeIcon} alt="" />
                        <img title="Motor-Physical" className='threeIcons mb-1' src={Physical} alt="" />
                      </div>
                    </div>
                    <div className='ms-1'>
                      <img title='Classroom' className='threeIcons' src={OfflineIcon} alt="" />
                    </div>
                  </div>
                </div>
              </div>
              <div className='col-9 ms-4 col-md-8 '>
                <p className='savestr_head'>Learning Outcome: Makes text-to-self connections with the character</p>
                <p className='savestr_body'>
                  Inform students what the term 'character' means: a person or animal that says, does and feels things in a story. Ask a few students to name and act like their favourite character from a story or movie. As you read the story, pause and ask students to repeat words said or actions done by characters in that story.
                </p>
                <div className='d-flex align-items-center my-3'>
                  <img style={{ cursor: "pointer" }} className="save_likes" src={FavIcon} alt="" />
                </div>
              </div>
              <div className='col-md-2 d-none d-md-block ms-5'>
                <div className='d-flex flex-column align-items-center justify-content-center'>
                  <div>
                    <span className='icons_heading'>Developmental Domains</span>
                  </div>
                  <div className='d-flex align-items-center justify-content-center mt-md-2'>
                    <div className='d-flex align-items-center justify-content-center border p-2 me-2'>
                      <img title="Motor-Physical" className='threeIcons ' src={Physical} alt="" />
                      <img title='Language & Communication' className='threeIcons ms-3' src={ChatIcon} alt="" />
                    </div>
                    <img title='Classroom' className='threeIcons' src={OfflineIcon} alt="" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FavouriteStr;