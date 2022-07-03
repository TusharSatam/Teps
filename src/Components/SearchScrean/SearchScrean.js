import React from 'react';
import './searchscrean.css'
import likeIcon from '../../asstes/like.svg'
import icon1 from '../../asstes/Group 70.svg'
import icon2 from '../../asstes/Group 71.svg'
import { useTranslation } from 'react-i18next';
import { Accordion, Card } from 'react-bootstrap';
import ContextAwareToggle from '../BootStrapCollapseBtn/ContextAwareToggle';
import EmptyCheckbox from '../../asstes/Rectangle 161.svg'
import checkCheckbox from '../../asstes/iconmonstr-checkbox-8 2.svg'
import OnlineIcon from '../../asstes/icons/online.svg'
import OfflineIcon from '../../asstes/icons/offline.svg'
import ChatIcon from '../../asstes/icons/chat.svg'
import KnowledgeIcon from '../../asstes/icons/knowledge.svg'
import LikeIcon from '../../asstes/icons/Like.svg'
import SaveIcon from '../../asstes/icons/Save.svg'
const SearchScrean = () => {
    const [show, setShow] = React.useState(0);
    const [show1, setShow1] = React.useState(0);
    const [show2, setShow2] = React.useState(0);
    const [show3, setShow3] = React.useState(0);
    const [show4, setShow4] = React.useState(0);
    const { t } = useTranslation();
    const handleCheckbox = (e) => {
        setShow(show + 1)
    }
    const handleCheckbox1 = (e) => {
        setShow1(show1 + 1)
    }
    const handleCheckbox2 = (e) => {
        setShow2(show2 + 1)
    }
    const handleCheckbox3 = (e) => {
        setShow3(show3 + 1)
    }
    const handleCheckbox4 = (e) => {
        setShow4(show4 + 1)
    }
    return (
        <>
            <div className='stratigy_bg'>
                <div className='d-flex flex-column justify-content-center align-items-center py-5 my-5'>
                    <div className='my-3'>
                        <select className='px-md-3 px-1 py-md-2 bg-light mx-md-3 select-border' name="" id="">
                            <option value="" selected>{t('subject')}</option>
                            <option value="">data</option>
                            <option value="">data</option>
                            <option value="">data</option>
                        </select>
                        <select className='px-md-3 px-1 py-md-2 bg-light mx-2 mx-md-3 select-border ' name="" id="">
                            <option value="" selected>{t('grade')}</option>
                            <option value="">data</option>
                            <option value="">data</option>
                            <option value="">data</option>
                        </select>
                        <select className='px-md-3 px-1 py-md-2 bg-light mx-md-3 select-border' name="" id="">
                            <option value="" selected>{t('topic')}</option>
                            <option value="">data</option>
                            <option value="">data</option>
                            <option value="">data</option>
                        </select>
                        <select className='d-none d-md-inline px-1  px-md-3 py-md-2 bg-light mx-md-3 select-border' name="" id="">
                            <option value="" selected>{t('skill')}</option>
                            <option value="">data</option>
                            <option value="">data</option>
                            <option value="">data</option>
                        </select>
                    </div>
                    <div>
                        <select className='d-inline d-md-none px-1  px-md-3 py-md-2 bg-light mx-md-3 select-border' name="" id="">
                            <option value="" selected>{t('skill')}</option>
                            <option value="">data</option>
                            <option value="">data</option>
                            <option value="">data</option>
                        </select>
                        <select className=' px-1 px-md-3 py-md-2 bg-light mx-2 mx-md-3 select-border' name="" id="">
                            <option value="" selected>{t('sub_topic')}</option>
                            <option value="">data</option>
                            <option value="">data</option>
                            <option value="">data</option>
                        </select>
                        <select className=' px-1 px-md-3 py-md-2 bg-light mx-md-3 select-border' name="" id="">
                            <option value="" selected>{t('sub_sub_topic')}</option>
                            <option value="">data</option>
                            <option value="">data</option>
                            <option value="">data</option>
                        </select>
                    </div>
                </div>
            </div>
            {/* <div className='d-flex justify-content-end'>
                <select className='px-3 py-1 bg-light mx-3 ' name="" id="">
                    <option value="" selected>Language</option>
                    <option value="">English</option>
                    <option value="">Bangla</option>
                </select>
            </div> */}
            <div className='d-flex justify-content-end me-3'>
                <div id="google_translate_element"></div>
            </div>
            <div className='mb-md-5 container_title_sec'>
                {/* <p className='search-head'>{t("find_the_strategies")}</p> */}
                <p className='mt-md-5'> <span className='sub-title'>{t("sub_sub_topic")}:</span> <span className='sub-subtitle'>English grammar - Dialog building</span> </p>
                <p className='mt-md-4 sub_sub_title'> Learning Outcomes </p>
            </div>

            <div className='dropDownContainer mb-5'>
                <Accordion defaultActiveKey="0" alwaysOpen >
                    <Card className='border-0 '>
                        <Card.Header className='d-flex align-items-center border-bottom-0 ' style={{ background: "#FFFFFF" }}>
                            <ContextAwareToggle eventKey="1">{show % 2 !== 0 ? <img className="checkbox_size" onClick={handleCheckbox} src={checkCheckbox} alt="" /> : <img className='checkbox_size' onClick={handleCheckbox} src={EmptyCheckbox} alt="" />}</ContextAwareToggle>
                            <p className='mt-3 checkBox_title'>Identifies physical traits of characters in a text.</p>
                        </Card.Header>
                        <Accordion.Collapse eventKey="1" >
                            <Card.Body style={{ background: "#FFFFFF" }} className='border-bottom'>
                                <div className='my-4'>
                                    <div className='row my-4'>
                                        <div className='col-4 col-md-2'>
                                            <span className='Strategy_count'>{t("strategy")}</span> <span className='counter_str'>2</span>
                                            <div className='d-block d-md-none ms-4 mt-3'>
                                                <div className='col-2 d-flex align-items-center justify-content-center'>
                                                    <img className='threeIcons' src={KnowledgeIcon} alt="" />
                                                    <img className='mx-1 threeIcons' src={ChatIcon} alt="" />
                                                    <img className='threeIcons' src={OnlineIcon} alt="" />
                                                </div>
                                            </div>
                                        </div>
                                        <div className='col-8 Strategy_count_article'>
                                            <p>
                                                Inform students what the term 'character' means: a person or animal that says, does and feels things in a story. Ask a few students to name and act like their favourite character from a story or movie. As you read the story, pause and ask students to repeat words said or actions done by characters in that story.
                                            </p>
                                            <div className='d-flex align-items-center my-3'>
                                                <img className='me-3' src={SaveIcon} alt="" />
                                                <img src={LikeIcon} alt="" />
                                            </div>
                                        </div>
                                        <div className='col-md-2 d-none d-md-block'>
                                            <div className='d-flex align-items-center justify-content-center'>
                                                <img title='Knowledge' className='threeIcons' src={KnowledgeIcon} alt="" />
                                                <img title='Chat' className='mx-3 threeIcons' src={ChatIcon} alt="" />
                                                <img title='Online' className='threeIcons' src={OnlineIcon} alt="" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className='row my-4'>
                                        <div className='col-4 col-md-2'>
                                            <span className='Strategy_count'>{t("strategy")}</span> <span className='counter_str'>2</span>
                                            <div className='d-block d-md-none ms-4 mt-3'>
                                                <div className='col-2 d-flex align-items-center justify-content-center'>
                                                    <img className='threeIcons' src={KnowledgeIcon} alt="" />
                                                    <img className='mx-1 threeIcons' src={ChatIcon} alt="" />
                                                    <img className='threeIcons' src={OnlineIcon} alt="" />
                                                </div>
                                            </div>
                                        </div>
                                        <div className='col-8 Strategy_count_article'>
                                            <p>
                                                Inform students what the term 'character' means: a person or animal that says, does and feels things in a story. Ask a few students to name and act like their favourite character from a story or movie. As you read the story, pause and ask students to repeat words said or actions done by characters in that story.
                                            </p>
                                            <div className='d-flex align-items-center my-3'>
                                                <img className='me-3' src={SaveIcon} alt="" />
                                                <img src={LikeIcon} alt="" />
                                            </div>
                                        </div>
                                        <div className='col-md-2 d-none d-md-block'>
                                            <div className='d-flex align-items-center justify-content-center'>
                                                <img title='Knowledge' className='threeIcons' src={KnowledgeIcon} alt="" />
                                                <img title='Chat' className='mx-3 threeIcons' src={ChatIcon} alt="" />
                                                <img title='Online' className='threeIcons' src={OnlineIcon} alt="" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className='row my-4'>
                                        <div className='col-4 col-md-2'>
                                            <span className='Strategy_count'>{t("strategy")}</span> <span className='counter_str'>2</span>
                                            <div className='d-block d-md-none ms-4 mt-3'>
                                                <div className='col-2 d-flex align-items-center justify-content-center'>
                                                    <img className='threeIcons' src={KnowledgeIcon} alt="" />
                                                    <img className='mx-1 threeIcons' src={ChatIcon} alt="" />
                                                    <img className='threeIcons' src={OnlineIcon} alt="" />
                                                </div>
                                            </div>
                                        </div>
                                        <div className='col-8 Strategy_count_article'>
                                            <p>
                                                Inform students what the term 'character' means: a person or animal that says, does and feels things in a story. Ask a few students to name and act like their favourite character from a story or movie. As you read the story, pause and ask students to repeat words said or actions done by characters in that story.
                                            </p>
                                            <div className='d-flex align-items-center my-3'>
                                                <img className='me-3' src={SaveIcon} alt="" />
                                                <img src={LikeIcon} alt="" />
                                            </div>
                                        </div>
                                        <div className='col-md-2 d-none d-md-block'>
                                            <div className=' d-flex align-items-center justify-content-center'>
                                                <img title='Knowledge' className='threeIcons' src={KnowledgeIcon} alt="" />
                                                <img title='Chat' className='mx-3 threeIcons' src={ChatIcon} alt="" />
                                                <img title='Online' className='threeIcons' src={OnlineIcon} alt="" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Card.Body>
                        </Accordion.Collapse>
                    </Card>
                    <Card className='border-0'>
                        <Card.Header className='d-flex align-items-center border-bottom-0 border-top' style={{ background: "#FFFFFF" }}>
                            <ContextAwareToggle eventKey="2">{show1 % 2 !== 0 ? <img className='checkbox_size' onClick={handleCheckbox1} src={checkCheckbox} alt="" /> : <img className='checkbox_size' onClick={handleCheckbox1} src={EmptyCheckbox} alt="" />}</ContextAwareToggle>
                            <p className='mt-3 checkBox_title'>Makes text-to-self connections with the character.</p>
                        </Card.Header>
                        <Accordion.Collapse eventKey="2">
                            <Card.Body style={{ background: "#FFFFFF" }}>
                                <div className='my-4'>
                                    <div className='row my-4'>
                                        <div className='col-4 col-md-2'>
                                            <span className='Strategy_count'>{t("strategy")}</span> <span className='counter_str'>2</span>
                                            <div className='d-block d-md-none ms-4 mt-3'>
                                                <div className='col-2 d-flex align-items-center justify-content-center'>
                                                    <img className='threeIcons' src={KnowledgeIcon} alt="" />
                                                    <img className='mx-1 threeIcons' src={ChatIcon} alt="" />
                                                    <img className='threeIcons' src={OnlineIcon} alt="" />
                                                </div>
                                            </div>
                                        </div>
                                        <div className='col-8 Strategy_count_article'>
                                            <p>
                                                Inform students what the term 'character' means: a person or animal that says, does and feels things in a story. Ask a few students to name and act like their favourite character from a story or movie. As you read the story, pause and ask students to repeat words said or actions done by characters in that story.
                                            </p>
                                            <div className='d-flex align-items-center my-3'>
                                                <img className='me-3' src={SaveIcon} alt="" />
                                                <img src={LikeIcon} alt="" />
                                            </div>
                                        </div>
                                        <div className='col-md-2 d-none d-md-block'>
                                            <div className='d-flex align-items-center justify-content-center'>
                                                <img title='Knowledge' className='threeIcons' src={KnowledgeIcon} alt="" />
                                                <img title='Chat' className='mx-3 threeIcons' src={ChatIcon} alt="" />
                                                <img title='Online' className='threeIcons' src={OnlineIcon} alt="" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className='row my-4'>
                                        <div className='col-4 col-md-2'>
                                            <span className='Strategy_count'>{t("strategy")}</span> <span className='counter_str'>2</span>
                                            <div className='d-block d-md-none ms-4 mt-3'>
                                                <div className='col-2 d-flex align-items-center justify-content-center'>
                                                    <img className='threeIcons' src={KnowledgeIcon} alt="" />
                                                    <img className='mx-1 threeIcons' src={ChatIcon} alt="" />
                                                    <img className='threeIcons' src={OnlineIcon} alt="" />
                                                </div>
                                            </div>
                                        </div>
                                        <div className='col-8 Strategy_count_article'>
                                            <p>
                                                Inform students what the term 'character' means: a person or animal that says, does and feels things in a story. Ask a few students to name and act like their favourite character from a story or movie. As you read the story, pause and ask students to repeat words said or actions done by characters in that story.
                                            </p>
                                            <div className='d-flex align-items-center my-3'>
                                                <img className='me-3' src={SaveIcon} alt="" />
                                                <img src={LikeIcon} alt="" />
                                            </div>
                                        </div>
                                        <div className='col-md-2 d-none d-md-block'>
                                            <div className='d-flex align-items-center justify-content-center'>
                                                <img title='Knowledge' className='threeIcons' src={KnowledgeIcon} alt="" />
                                                <img title='Chat' className='mx-3 threeIcons' src={ChatIcon} alt="" />
                                                <img title='Online' className='threeIcons' src={OnlineIcon} alt="" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className='row my-4'>
                                        <div className='col-4 col-md-2'>
                                            <span className='Strategy_count'>{t("strategy")}</span> <span className='counter_str'>2</span>
                                            <div className='d-block d-md-none ms-4 mt-3'>
                                                <div className='col-2 d-flex align-items-center justify-content-center'>
                                                    <img className='threeIcons' src={KnowledgeIcon} alt="" />
                                                    <img className='mx-1 threeIcons' src={ChatIcon} alt="" />
                                                    <img className='threeIcons' src={OnlineIcon} alt="" />
                                                </div>
                                            </div>
                                        </div>
                                        <div className='col-8 Strategy_count_article'>
                                            <p>
                                                Inform students what the term 'character' means: a person or animal that says, does and feels things in a story. Ask a few students to name and act like their favourite character from a story or movie. As you read the story, pause and ask students to repeat words said or actions done by characters in that story.
                                            </p>
                                            <div className='d-flex align-items-center my-3'>
                                                <img className='me-3' src={SaveIcon} alt="" />
                                                <img src={LikeIcon} alt="" />
                                            </div>
                                        </div>
                                        <div className='col-md-2 d-none d-md-block'>
                                            <div className=' d-flex align-items-center justify-content-center'>
                                                <img title='Knowledge' className='threeIcons' src={KnowledgeIcon} alt="" />
                                                <img title='Chat' className='mx-3 threeIcons' src={ChatIcon} alt="" />
                                                <img title='Online' className='threeIcons' src={OnlineIcon} alt="" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Card.Body>
                        </Accordion.Collapse>
                    </Card>
                    <Card className='border-0'>
                        <Card.Header className='d-flex align-items-center border-bottom-0 border-top' style={{ background: "#FFFFFF" }}>
                            <ContextAwareToggle eventKey="3">{show2 % 2 !== 0 ? <img className='checkbox_size' onClick={handleCheckbox2} src={checkCheckbox} alt="" /> : <img className='checkbox_size' onClick={handleCheckbox2} src={EmptyCheckbox} alt="" />}</ContextAwareToggle>
                            <p className='mt-3 checkBox_title'>Makes text-to-word connections with the character.</p>
                        </Card.Header>
                        <Accordion.Collapse eventKey="3">
                            <Card.Body style={{ background: "#FFFFFF" }}>
                                <div className='my-4'>
                                    <div className='row my-4'>
                                        <div className='col-4 col-md-2'>
                                            <span className='Strategy_count'>{t("strategy")}</span> <span className='counter_str'>2</span>
                                            <div className='d-block d-md-none ms-4 mt-3'>
                                                <div className='col-2 d-flex align-items-center justify-content-center'>
                                                    <img className='threeIcons' src={KnowledgeIcon} alt="" />
                                                    <img className='mx-1 threeIcons' src={ChatIcon} alt="" />
                                                    <img className='threeIcons' src={OnlineIcon} alt="" />
                                                </div>
                                            </div>
                                        </div>
                                        <div className='col-8 Strategy_count_article'>
                                            <p>
                                                Inform students what the term 'character' means: a person or animal that says, does and feels things in a story. Ask a few students to name and act like their favourite character from a story or movie. As you read the story, pause and ask students to repeat words said or actions done by characters in that story.
                                            </p>
                                            <div className='d-flex align-items-center my-3'>
                                                <img className='me-3' src={SaveIcon} alt="" />
                                                <img src={LikeIcon} alt="" />
                                            </div>
                                        </div>
                                        <div className='col-md-2 d-none d-md-block'>
                                            <div className='d-flex align-items-center justify-content-center'>
                                                <img title='Knowledge' className='threeIcons' src={KnowledgeIcon} alt="" />
                                                <img title='Chat' className='mx-3 threeIcons' src={ChatIcon} alt="" />
                                                <img title='Online' className='threeIcons' src={OnlineIcon} alt="" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className='row my-4'>
                                        <div className='col-4 col-md-2'>
                                            <span className='Strategy_count'>{t("strategy")}</span> <span className='counter_str'>2</span>
                                            <div className='d-block d-md-none ms-4 mt-3'>
                                                <div className='col-2 d-flex align-items-center justify-content-center'>
                                                    <img className='threeIcons' src={KnowledgeIcon} alt="" />
                                                    <img className='mx-1 threeIcons' src={ChatIcon} alt="" />
                                                    <img className='threeIcons' src={OnlineIcon} alt="" />
                                                </div>
                                            </div>
                                        </div>
                                        <div className='col-8 Strategy_count_article'>
                                            <p>
                                                Inform students what the term 'character' means: a person or animal that says, does and feels things in a story. Ask a few students to name and act like their favourite character from a story or movie. As you read the story, pause and ask students to repeat words said or actions done by characters in that story.
                                            </p>
                                            <div className='d-flex align-items-center my-3'>
                                                <img className='me-3' src={SaveIcon} alt="" />
                                                <img src={LikeIcon} alt="" />
                                            </div>
                                        </div>
                                        <div className='col-md-2 d-none d-md-block'>
                                            <div className='d-flex align-items-center justify-content-center'>
                                                <img title='Knowledge' className='threeIcons' src={KnowledgeIcon} alt="" />
                                                <img title='Chat' className='mx-3 threeIcons' src={ChatIcon} alt="" />
                                                <img title='Online' className='threeIcons' src={OnlineIcon} alt="" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className='row my-4'>
                                        <div className='col-4 col-md-2'>
                                            <span className='Strategy_count'>{t("strategy")}</span> <span className='counter_str'>2</span>
                                            <div className='d-block d-md-none ms-4 mt-3'>
                                                <div className='col-2 d-flex align-items-center justify-content-center'>
                                                    <img className='threeIcons' src={KnowledgeIcon} alt="" />
                                                    <img className='mx-1 threeIcons' src={ChatIcon} alt="" />
                                                    <img className='threeIcons' src={OnlineIcon} alt="" />
                                                </div>
                                            </div>
                                        </div>
                                        <div className='col-8 Strategy_count_article'>
                                            <p>
                                                Inform students what the term 'character' means: a person or animal that says, does and feels things in a story. Ask a few students to name and act like their favourite character from a story or movie. As you read the story, pause and ask students to repeat words said or actions done by characters in that story.
                                            </p>
                                            <div className='d-flex align-items-center my-3'>
                                                <img className='me-3' src={SaveIcon} alt="" />
                                                <img src={LikeIcon} alt="" />
                                            </div>
                                        </div>
                                        <div className='col-md-2 d-none d-md-block'>
                                            <div className=' d-flex align-items-center justify-content-center'>
                                                <img title='Knowledge' className='threeIcons' src={KnowledgeIcon} alt="" />
                                                <img title='Chat' className='mx-3 threeIcons' src={ChatIcon} alt="" />
                                                <img title='Online' className='threeIcons' src={OnlineIcon} alt="" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Card.Body>
                        </Accordion.Collapse>
                    </Card>
                    <Card className='border-0'>
                        <Card.Header className='d-flex align-items-center border-bottom-0 border-top' style={{ background: "#FFFFFF" }}>
                            <ContextAwareToggle eventKey="4">{show3 % 2 !== 0 ? <img className='checkbox_size' onClick={handleCheckbox3} src={checkCheckbox} alt="" /> : <img className='checkbox_size' onClick={handleCheckbox3} src={EmptyCheckbox} alt="" />}</ContextAwareToggle>
                            <p className='mt-3 checkBox_title'>Visualises character actions using details from the text.</p>
                        </Card.Header>
                        <Accordion.Collapse eventKey="4">
                            <Card.Body style={{ background: "#FFFFFF" }}>
                                <div className='my-4'>
                                    <div className='row my-4'>
                                        <div className='col-4 col-md-2'>
                                            <span className='Strategy_count'>{t("strategy")}</span> <span className='counter_str'>2</span>
                                            <div className='d-block d-md-none ms-4 mt-3'>
                                                <div className='col-2 d-flex align-items-center justify-content-center'>
                                                    <img className='threeIcons' src={KnowledgeIcon} alt="" />
                                                    <img className='mx-1 threeIcons' src={ChatIcon} alt="" />
                                                    <img className='threeIcons' src={OnlineIcon} alt="" />
                                                </div>
                                            </div>
                                        </div>
                                        <div className='col-8 Strategy_count_article'>
                                            <p>
                                                Inform students what the term 'character' means: a person or animal that says, does and feels things in a story. Ask a few students to name and act like their favourite character from a story or movie. As you read the story, pause and ask students to repeat words said or actions done by characters in that story.
                                            </p>
                                            <div className='d-flex align-items-center my-3'>
                                                <img className='me-3' src={SaveIcon} alt="" />
                                                <img src={LikeIcon} alt="" />
                                            </div>
                                        </div>
                                        <div className='col-md-2 d-none d-md-block'>
                                            <div className='d-flex align-items-center justify-content-center'>
                                                <img title='Knowledge' className='threeIcons' src={KnowledgeIcon} alt="" />
                                                <img title='Chat' className='mx-3 threeIcons' src={ChatIcon} alt="" />
                                                <img title='Online' className='threeIcons' src={OnlineIcon} alt="" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className='row my-4'>
                                        <div className='col-4 col-md-2'>
                                            <span className='Strategy_count'>{t("strategy")}</span> <span className='counter_str'>2</span>
                                            <div className='d-block d-md-none ms-4 mt-3'>
                                                <div className='col-2 d-flex align-items-center justify-content-center'>
                                                    <img className='threeIcons' src={KnowledgeIcon} alt="" />
                                                    <img className='mx-1 threeIcons' src={ChatIcon} alt="" />
                                                    <img className='threeIcons' src={OnlineIcon} alt="" />
                                                </div>
                                            </div>
                                        </div>
                                        <div className='col-8 Strategy_count_article'>
                                            <p>
                                                Inform students what the term 'character' means: a person or animal that says, does and feels things in a story. Ask a few students to name and act like their favourite character from a story or movie. As you read the story, pause and ask students to repeat words said or actions done by characters in that story.
                                            </p>
                                            <div className='d-flex align-items-center my-3'>
                                                <img className='me-3' src={SaveIcon} alt="" />
                                                <img src={LikeIcon} alt="" />
                                            </div>
                                        </div>
                                        <div className='col-md-2 d-none d-md-block'>
                                            <div className='d-flex align-items-center justify-content-center'>
                                                <img title='Knowledge' className='threeIcons' src={KnowledgeIcon} alt="" />
                                                <img title='Chat' className='mx-3 threeIcons' src={ChatIcon} alt="" />
                                                <img title='Online' className='threeIcons' src={OnlineIcon} alt="" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className='row my-4'>
                                        <div className='col-4 col-md-2'>
                                            <span className='Strategy_count'>{t("strategy")}</span> <span className='counter_str'>2</span>
                                            <div className='d-block d-md-none ms-4 mt-3'>
                                                <div className='col-2 d-flex align-items-center justify-content-center'>
                                                    <img className='threeIcons' src={KnowledgeIcon} alt="" />
                                                    <img className='mx-1 threeIcons' src={ChatIcon} alt="" />
                                                    <img className='threeIcons' src={OnlineIcon} alt="" />
                                                </div>
                                            </div>
                                        </div>
                                        <div className='col-8 Strategy_count_article'>
                                            <p>
                                                Inform students what the term 'character' means: a person or animal that says, does and feels things in a story. Ask a few students to name and act like their favourite character from a story or movie. As you read the story, pause and ask students to repeat words said or actions done by characters in that story.
                                            </p>
                                            <div className='d-flex align-items-center my-3'>
                                                <img className='me-3' src={SaveIcon} alt="" />
                                                <img src={LikeIcon} alt="" />
                                            </div>
                                        </div>
                                        <div className='col-md-2 d-none d-md-block'>
                                            <div className=' d-flex align-items-center justify-content-center'>
                                                <img title='Knowledge' className='threeIcons' src={KnowledgeIcon} alt="" />
                                                <img title='Chat' className='mx-3 threeIcons' src={ChatIcon} alt="" />
                                                <img title='Online' className='threeIcons' src={OnlineIcon} alt="" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Card.Body>
                        </Accordion.Collapse>
                    </Card>
                    <Card className='border-0'>
                        <Card.Header className='d-flex align-items-center border-top' style={{ background: "#FFFFFF" }}>
                            <ContextAwareToggle eventKey="5">{show4 % 2 !== 0 ? <img className='checkbox_size' onClick={handleCheckbox4} src={checkCheckbox} alt="" /> : <img className='checkbox_size' onClick={handleCheckbox4} src={EmptyCheckbox} alt="" />}</ContextAwareToggle>
                            <p className='mt-3 checkBox_title'>Identifies characters in a text.</p>
                        </Card.Header>
                        <Accordion.Collapse eventKey="5">
                            <Card.Body style={{ background: "#FFFFFF" }}>
                                <div className='my-4'>
                                    <div className='row my-4'>
                                        <div className='col-4 col-md-2'>
                                            <span className='Strategy_count'>{t("strategy")}</span> <span className='counter_str'>2</span>
                                            <div className='d-block d-md-none ms-4 mt-3'>
                                                <div className='col-2 d-flex align-items-center justify-content-center'>
                                                    <img className='threeIcons' src={KnowledgeIcon} alt="" />
                                                    <img className='mx-1 threeIcons' src={ChatIcon} alt="" />
                                                    <img className='threeIcons' src={OnlineIcon} alt="" />
                                                </div>
                                            </div>
                                        </div>
                                        <div className='col-8 Strategy_count_article'>
                                            <p>
                                                Inform students what the term 'character' means: a person or animal that says, does and feels things in a story. Ask a few students to name and act like their favourite character from a story or movie. As you read the story, pause and ask students to repeat words said or actions done by characters in that story.
                                            </p>
                                            <div className='d-flex align-items-center my-3'>
                                                <img className='me-3' src={SaveIcon} alt="" />
                                                <img src={LikeIcon} alt="" />
                                            </div>
                                        </div>
                                        <div className='col-md-2 d-none d-md-block'>
                                            <div className='d-flex align-items-center justify-content-center'>
                                                <img title='Knowledge' className='threeIcons' src={KnowledgeIcon} alt="" />
                                                <img title='Chat' className='mx-3 threeIcons' src={ChatIcon} alt="" />
                                                <img title='Online' className='threeIcons' src={OnlineIcon} alt="" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className='row my-4'>
                                        <div className='col-4 col-md-2'>
                                            <span className='Strategy_count'>{t("strategy")}</span> <span className='counter_str'>2</span>
                                            <div className='d-block d-md-none ms-4 mt-3'>
                                                <div className='col-2 d-flex align-items-center justify-content-center'>
                                                    <img className='threeIcons' src={KnowledgeIcon} alt="" />
                                                    <img className='mx-1 threeIcons' src={ChatIcon} alt="" />
                                                    <img className='threeIcons' src={OnlineIcon} alt="" />
                                                </div>
                                            </div>
                                        </div>
                                        <div className='col-8 Strategy_count_article'>
                                            <p>
                                                Inform students what the term 'character' means: a person or animal that says, does and feels things in a story. Ask a few students to name and act like their favourite character from a story or movie. As you read the story, pause and ask students to repeat words said or actions done by characters in that story.
                                            </p>
                                            <div className='d-flex align-items-center my-3'>
                                                <img className='me-3' src={SaveIcon} alt="" />
                                                <img src={LikeIcon} alt="" />
                                            </div>
                                        </div>
                                        <div className='col-md-2 d-none d-md-block'>
                                            <div className='d-flex align-items-center justify-content-center'>
                                                <img title='Knowledge' className='threeIcons' src={KnowledgeIcon} alt="" />
                                                <img title='Chat' className='mx-3 threeIcons' src={ChatIcon} alt="" />
                                                <img title='Online' className='threeIcons' src={OnlineIcon} alt="" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className='row my-4'>
                                        <div className='col-4 col-md-2'>
                                            <span className='Strategy_count'>{t("strategy")}</span> <span className='counter_str'>2</span>
                                            <div className='d-block d-md-none ms-4 mt-3'>
                                                <div className='col-2 d-flex align-items-center justify-content-center'>
                                                    <img className='threeIcons' src={KnowledgeIcon} alt="" />
                                                    <img className='mx-1 threeIcons' src={ChatIcon} alt="" />
                                                    <img className='threeIcons' src={OnlineIcon} alt="" />
                                                </div>
                                            </div>
                                        </div>
                                        <div className='col-8 Strategy_count_article'>
                                            <p>
                                                Inform students what the term 'character' means: a person or animal that says, does and feels things in a story. Ask a few students to name and act like their favourite character from a story or movie. As you read the story, pause and ask students to repeat words said or actions done by characters in that story.
                                            </p>
                                            <div className='d-flex align-items-center my-3'>
                                                <img className='me-3' src={SaveIcon} alt="" />
                                                <img src={LikeIcon} alt="" />
                                            </div>
                                        </div>
                                        <div className='col-md-2 d-none d-md-block'>
                                            <div className=' d-flex align-items-center justify-content-center'>
                                                <img title='Knowledge' className='threeIcons' src={KnowledgeIcon} alt="" />
                                                <img title='Chat' className='mx-3 threeIcons' src={ChatIcon} alt="" />
                                                <img title='Online' className='threeIcons' src={OnlineIcon} alt="" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Card.Body>
                        </Accordion.Collapse>
                    </Card>
                </Accordion>
            </div>


            {/* <div className='container my-4'>
                <div className='row my-4'>
                    <div className='col-2'>
                        <span className='Strategy_count'>{t("strategy")}</span> <span className='counter_str'>1</span>
                    </div>
                    <div className='col-8 Strategy_count_article'>
                        <p>
                            This collaborative technique involves setting a scene and, with the students’ help,
                            writing a dialogue on the board including the language you want to focus on. In Unit
                            10.6, the teacher provides a framework for a dialogue between waiters and customers in
                            a restaurant. This is a familiar situation in which the indefinite pronouns something,
                            anything and nothing occur naturally. Students then either practise the dialogue in pairs
                            as it is or with variations (eg different choices of food and drink, a different type of
                            restaurant). A great way to push students towards memorising the language is to gradually
                            erase the text, word by word, until the students are repeating the dialogue from memory.
                        </p>
                        <div className='d-flex align-items-center my-3'>
                            <img className='me-3' src={SaveIcon} alt="" />
                            <img src={likeIcon} alt="" />
                        </div>
                    </div>
                    <div className='col-2 d-flex align-items-center justify-content-center'>
                                            <img width="60px" height="60px" src={KnowledgeIcon} alt="" />
                                            <img width="60px" height="60px" className='mx-3' src={ChatIcon} alt="" />
                                            <img width="60px" height="60px" src={OnlineIcon} alt="" />
                                        </div>
                </div>
                <div className='row my-4'>
                    <div className='col-2'>
                        <span className='Strategy_count'>{t("strategy")}</span> <span className='counter_str'>2</span>
                    </div>
                    <div className='col-8 Strategy_count_article'>
                        <p>
                            This collaborative technique involves setting a scene and, with the students’ help,
                            writing a dialogue on the board including the language you want to focus on. In Unit
                            10.6, the teacher provides a framework for a dialogue between waiters and customers in
                            a restaurant. This is a familiar situation in which the indefinite pronouns something,
                            anything and nothing occur naturally. Students then either practise the dialogue in pairs
                            as it is or with variations (eg different choices of food and drink, a different type of
                            restaurant). A great way to push students towards memorising the language is to gradually
                            erase the text, word by word, until the students are repeating the dialogue from memory.
                        </p>
                        <div className='d-flex align-items-center my-3'>
                            <img className='me-3' src={SaveIcon} alt="" />
                            <img src={likeIcon} alt="" />
                        </div>
                    </div>
                   <div className='col-2 d-flex align-items-center justify-content-center'>
                                            <img width="60px" height="60px" src={KnowledgeIcon} alt="" />
                                            <img width="60px" height="60px" className='mx-3' src={ChatIcon} alt="" />
                                            <img width="60px" height="60px" src={OnlineIcon} alt="" />
                                        </div>
                </div>
                <div className='row my-4'>
                    <div className='col-2'>
                        <span className='Strategy_count'>{t("strategy")}</span> <span className='counter_str'>3</span>
                    </div>
                    <div className='col-8 Strategy_count_article'>
                        <p>
                            This collaborative technique involves setting a scene and, with the students’ help,
                            writing a dialogue on the board including the language you want to focus on. In Unit
                            10.6, the teacher provides a framework for a dialogue between waiters and customers in
                            a restaurant. This is a familiar situation in which the indefinite pronouns something,
                            anything and nothing occur naturally. Students then either practise the dialogue in pairs
                            as it is or with variations (eg different choices of food and drink, a different type of
                            restaurant). A great way to push students towards memorising the language is to gradually
                            erase the text, word by word, until the students are repeating the dialogue from memory.
                        </p>
                        <div className='d-flex align-items-center my-3'>
                            <img className='me-3' src={SaveIcon} alt="" />
                            <img src={likeIcon} alt="" />
                        </div>
                    </div>
                    <div className='col-2 d-flex align-items-center justify-content-center'>
                                            <img width="60px" height="60px" src={KnowledgeIcon} alt="" />
                                            <img width="60px" height="60px" className='mx-3' src={ChatIcon} alt="" />
                                            <img width="60px" height="60px" src={OnlineIcon} alt="" />
                                        </div>
                </div>
                <div className='row my-4'>
                    <div className='col-2'>
                        <span className='Strategy_count'>{t("strategy")}</span> <span className='counter_str'>4</span>
                    </div>
                    <div className='col-8 Strategy_count_article'>
                        <p>
                            This collaborative technique involves setting a scene and, with the students’ help,
                            writing a dialogue on the board including the language you want to focus on. In Unit
                            10.6, the teacher provides a framework for a dialogue between waiters and customers in
                            a restaurant. This is a familiar situation in which the indefinite pronouns something,
                            anything and nothing occur naturally. Students then either practise the dialogue in pairs
                            as it is or with variations (eg different choices of food and drink, a different type of
                            restaurant). A great way to push students towards memorising the language is to gradually
                            erase the text, word by word, until the students are repeating the dialogue from memory.
                        </p>
                        <div className='d-flex align-items-center my-3'>
                            <img className='me-3' src={SaveIcon} alt="" />
                            <img src={likeIcon} alt="" />
                        </div>
                    </div>
                  <div className='col-2 d-flex align-items-center justify-content-center'>
                                            <img width="60px" height="60px" src={KnowledgeIcon} alt="" />
                                            <img width="60px" height="60px" className='mx-3' src={ChatIcon} alt="" />
                                            <img width="60px" height="60px" src={OnlineIcon} alt="" />
                                        </div>
                </div>
                <div className='row my-4 pb-5'>
                    <div className='col-2'>
                        <span className='Strategy_count'>{t("strategy")}</span> <span className='counter_str'>5</span>
                    </div>
                    <div className='col-8 Strategy_count_article pb-5'>
                        <p>
                            This collaborative technique involves setting a scene and, with the students’ help,
                            writing a dialogue on the board including the language you want to focus on. In Unit
                            10.6, the teacher provides a framework for a dialogue between waiters and customers in
                            a restaurant. This is a familiar situation in which the indefinite pronouns something,
                            anything and nothing occur naturally. Students then either practise the dialogue in pairs
                            as it is or with variations (eg different choices of food and drink, a different type of
                            restaurant). A great way to push students towards memorising the language is to gradually
                            erase the text, word by word, until the students are repeating the dialogue from memory.
                        </p>
                        <div className='d-flex align-items-center my-3'>
                            <img className='me-3' src={SaveIcon} alt="" />
                            <img src={likeIcon} alt="" />
                        </div>
                    </div>
                   <div className='col-2 d-flex align-items-center justify-content-center'>
                                            <img width="60px" height="60px" src={KnowledgeIcon} alt="" />
                                            <img width="60px" height="60px" className='mx-3' src={ChatIcon} alt="" />
                                            <img width="60px" height="60px" src={OnlineIcon} alt="" />
                                        </div>
                </div>
            </div> */}
        </>
    );
};

export default SearchScrean;