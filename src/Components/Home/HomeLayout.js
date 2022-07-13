import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { getAllStratigys } from '../../apis/stratigyes';
import { useAuth } from '../../Context/AuthContext';
import Article from '../LandingArticle/Article';
import './homelayout.css'
const HomeLayout = () => {
    const { t } = useTranslation();
    const [allStratigys, setAllStratigys] = React.useState([])
    const [selectSubject, setSelectSubject] = React.useState()
    const [selectGrade, setSelectGrade] = React.useState()
    const [selectTopic, setSelectTopic] = React.useState()
    const [selectSkill, setSelectSkill] = React.useState()
    const [selectSubTopic, setSelectSubTopic] = React.useState()
    const [selectSubSubTopic, setSelectSubSubTopic] = React.useState()
    const [selectedOption, setSelectedOption] = React.useState()
    const [error, setError] = React.useState('')
    const [error1, setError1] = React.useState(false)
    const [error2, setError2] = React.useState(false)
    const [error3, setError3] = React.useState(false)
    const [error4, setError4] = React.useState(false)
    const navigate = useNavigate();
    const location = useLocation();
    const { setStratigyFilData } = useAuth();
    React.useEffect(() => {
        getAllStratigys()
            .then(res => {
                setAllStratigys(res.data);
            })
        const selectedDropdown = localStorage.getItem('selectedDropdown');
        if (selectedDropdown) {
            setSelectedOption(JSON.parse(selectedDropdown))
        }
    }, [location.pathname])
    const uniqueSubject = Array.from(new Set(allStratigys.map(a => a.Subject)))
        .map(subject => {
            return allStratigys.find(a => a.Subject === subject)
        })
    const uniqueGrade = Array.from(new Set(allStratigys.map(a => a.Grade)))
        .map(grade => {
            return allStratigys.find(a => a.Grade === grade)
        });
    const handlesubFilter = (e) => {
        setSelectSubject(e.target.value);
    }
    const handlegradeFilter = (e) => {
        setSelectGrade(e.target.value)
    }
    const handleTopicFilter = (e) => {
        setSelectTopic(e.target.value)
    }
    const handleSkillFilter = (e) => {
        setSelectSkill(e.target.value)
    }
    const handleSubTopicFilter = (e) => {
        setSelectSubTopic(e.target.value)
    }
    const handleSubSUbTopicFilter = (e) => {
        setSelectSubSubTopic(e.target.value)
    }
    const aquaticCreatures = allStratigys.filter(function (creature) {
        return creature.Subject === selectSubject && creature.Grade === selectGrade;
    });
    const uniqueTopic = Array.from(new Set(aquaticCreatures?.map(a => a.Topic)))
        .map(topic => {
            return aquaticCreatures?.find(a => a.Topic === topic)
        });
    const uniqueSkill = Array.from(new Set(aquaticCreatures?.map(a => a.Skill)))
        .map(skill => {
            return aquaticCreatures?.find(a => a.Skill === skill)
        });

    const uniqueSubTopic = Array.from(new Set(aquaticCreatures?.map(a => a['Sub Topic'])))
        .map(sub_topic => {
            return aquaticCreatures?.find(a => a['Sub Topic'] === sub_topic)
        });
    const uniqueSubSubTopic = Array.from(new Set(aquaticCreatures?.map(a => a['Sub-sub topic'])))
        .map(sub_sub_topic => {
            return aquaticCreatures?.find(a => a['Sub-sub topic'] === sub_sub_topic)
        });

    const handleFindStratigys = () => {

        if (selectSubject && selectGrade && selectSkill && selectTopic && selectSubject && selectSubSubTopic) {
            const aquaticCreatures = allStratigys.filter(function (creature) {
                return creature.Subject === selectSubject && creature.Grade === selectGrade && creature.Topic === selectTopic && creature.Skill === selectSkill && creature['Sub Topic'] === selectSubTopic && creature['Sub-sub topic'] === selectSubSubTopic;
            });
            console.log(aquaticCreatures);
            setStratigyFilData(aquaticCreatures)
            if (aquaticCreatures.length !== 0) {
                if (location.pathname === '/home') {
                    navigate('/search')
                }
                window.localStorage.setItem('selectedDropdown', JSON.stringify({ selectSubject, selectGrade, selectTopic, selectSkill, selectSubTopic, selectSubSubTopic }));
            }
            else {
                setError("No strategies are available for this combination. Please try a different combination.")
            }
        }
        else {
            if (!selectSkill) { setError1(true) }
            if (!selectTopic) { setError2(true) }
            if (!selectSubTopic) { setError3(true) }
            if (!selectSubSubTopic) { setError4(true) }
            setError("Please fill all the boxes to proceed.")
        }

    }

    return (
        <>
            <div className='d-flex flex-column justify-content-center align-items-center my-5'>
                <div className={location.pathname === '/home' ? 'my-3' : 'my-3 pt-5'}>
                    <select onChange={handlesubFilter} defaultValue={location.pathname !== '/home' && selectedOption?.selectSubject} className='px-md-3 px-1 py-md-2 bg-light mx-md-3 select-border' name="" id="">
                        {
                            location.pathname === '/home' &&
                            <option value="" selected disabled>{t('subject')}</option>
                        }
                        {
                            uniqueSubject?.map((item, index) => (
                                <option key={index} >{item.Subject}</option>
                            ))
                        }
                    </select>
                    <select onChange={handlegradeFilter} defaultValue={selectedOption?.selectGrade} className='px-md-3 px-1 py-md-2 bg-light mx-2 mx-md-3 select-border ' name="" id="">
                        {
                            selectedOption && location.pathname !== '/home' ?
                                <>
                                    <option value="" selected disabled>{t('grade')}</option>
                                    <option value="" selected disabled>{selectedOption?.selectGrade}</option>
                                </> :
                                <>
                                    <option value="" selected disabled>{t('grade')}</option>
                                </>
                        }
                        {
                            uniqueGrade?.map((item, index) => (
                                <option key={index} >{item.Grade}</option>
                            ))
                        }
                    </select>
                    <select onChange={handleTopicFilter} defaultValue={selectedOption?.selectTopic} className={error2 ? 'px-md-3 px-1 py-md-2 bg-light mx-md-3 error-border' : 'px-md-3 px-1 py-md-2 bg-light mx-md-3 select-border'} name="" id="">
                        {
                            selectedOption && location.pathname !== '/home' ?
                                <>
                                    <option value="" selected disabled>{t('topic')}</option>
                                    <option value="" selected disabled>{selectedOption?.selectTopic}</option>
                                </> :
                                <option value="" selected disabled>{t('topic')}</option>

                        }
                        {
                            uniqueTopic?.map((item, index) => (
                                <option key={index} >{item.Topic}</option>
                            ))
                        }
                    </select>
                    <select onChange={handleSkillFilter} defaultValue={selectedOption?.selectSkill} className={error1 ? 'd-none d-md-inline px-1  px-md-3 py-md-2 bg-light mx-md-3 error-border' : 'd-none d-md-inline px-1  px-md-3 py-md-2 bg-light mx-md-3 select-border'} name="" id="">
                        {
                            selectedOption && location.pathname !== '/home' ?
                                <>
                                    <option value="" selected disabled>{t('skill')}</option>
                                    <option value="" selected disabled>{selectedOption?.selectSkill}</option>
                                </> :
                                <option value="" selected disabled>{t('skill')}</option>

                        }
                        {
                            uniqueSkill?.map((item, index) => (
                                <option key={index} >{item.Skill}</option>
                            ))
                        }
                    </select>
                </div>
                <div>
                    {/* <select onChange={handleSkillFilter} defaultValue={selectedOption?.selectSkill} className={error1 ? 'd-none d-md-inline px-1  px-md-3 py-md-2 bg-light mx-md-3 error-border' : 'd-none d-md-inline px-1  px-md-3 py-md-2 bg-light mx-md-3 select-border'} name="" id="">
                        {
                            selectedOption && location.pathname !== '/home' ?
                                <>
                                    <option value="" selected disabled>{t('skill')}</option>
                                    <option value="" selected disabled>{selectedOption?.selectSkill}</option>
                                </> :
                                <>
                                    <option value="" selected disabled>{t('skill')}</option>
                                </>
                        }
                        {
                            uniqueSkill?.map((item, index) => (
                                <option key={index} >{item.Skill}</option>
                            ))
                        }
                    </select> */}
                    <select onChange={handleSubTopicFilter} defaultValue={selectedOption?.selectSubTopic} className={error3 ? 'px-1 px-md-3 py-md-2 bg-light mx-2 mx-md-3 error-border' : 'px-1 px-md-3 py-md-2 bg-light mx-2 mx-md-3 select-border'} name="" id="">
                        {
                            selectedOption && location.pathname !== '/home' ?
                                <>
                                    <option value="" selected disabled>{t('sub_topic')}</option>
                                    <option value="" selected disabled>{selectedOption?.selectSubTopic}</option>
                                </> :
                                <>
                                    <option value="" selected disabled>{t('sub_topic')}</option>
                                </>
                        }
                        {
                            uniqueSubTopic?.map((item, index) => (
                                <option key={index} >{item['Sub Topic']}</option>
                            ))
                        }
                    </select>
                    <select onChange={handleSubSUbTopicFilter} defaultValue={selectedOption?.selectSubSubTopic} className={error4 ? 'px-1 px-md-3 py-md-2 bg-light mx-md-3 error-border' : 'px-1 px-md-3 py-md-2 bg-light mx-md-3 select-border'} name="" id="">
                        {
                            selectedOption && location.pathname !== '/home' ?
                                <>
                                    <option value="" selected disabled>{t('sub_sub_topic')}</option>
                                    <option value="" selected disabled>{selectedOption?.selectSubSubTopic}</option>
                                </> :
                                <>
                                    <option value="" selected disabled>{t('sub_sub_topic')}</option>
                                </>
                        }
                        {
                            uniqueSubSubTopic?.map((item, index) => (
                                <option key={index} >{item['Sub-sub topic']}</option>
                            ))
                        }
                    </select>
                </div>
            </div>
            <div>
                {
                    error && location.pathname === '/home' && <p className='error_text'>{error}</p>
                }
            </div>
            {
                location.pathname === '/home' ?
                    <div className='d-flex justify-content-center my-5'>
                        <button onClick={handleFindStratigys} className='submit_btn'>{t('find_strategies')}</button>
                    </div>
                    :
                    <div className='d-flex justify-content-center my-5 pb-5'>
                        <button onClick={handleFindStratigys} className='Sec_submit_btn'>{t('find_strategies')}</button>
                    </div>
            }
        </>
    );
};

export default HomeLayout;