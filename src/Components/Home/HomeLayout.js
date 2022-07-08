import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';
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
    const navigate = useNavigate();
    const { setStratigyFilData } = useAuth();
    React.useEffect(() => {
        getAllStratigys()
            .then(res => {
                setAllStratigys(res.data);
            })
    }, [])

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

    // console.log(selectTopic, selectSkill, selectSubTopic, selectSubSubTopic);

    const handleFindStratigys = () => {
        const aquaticCreatures = allStratigys.filter(function (creature) {
            return creature.Subject === selectSubject && creature.Grade === selectGrade && creature.Topic === selectTopic && creature.Skill === selectSkill && creature['Sub Topic'] === selectSubTopic && creature['Sub-sub topic'] === selectSubSubTopic;
        });
        window.localStorage.setItem('filterData', JSON.stringify(aquaticCreatures));
        setStratigyFilData(aquaticCreatures)
        if (aquaticCreatures.length !== 0) {
            navigate('/search')
        }
    }




    return (
        <>
            <div className='d-flex flex-column justify-content-center align-items-center my-5'>
                <div className='my-3'>
                    <select onChange={handlesubFilter} className='px-md-3 px-1 py-md-2 bg-light mx-md-3 select-border' name="" id="">
                        <option value="" selected>{t('subject')}</option>
                        {
                            uniqueSubject?.map((item, index) => (
                                <option key={index} >{item.Subject}</option>
                            ))
                        }
                    </select>
                    <select onChange={handlegradeFilter} className='px-md-3 px-1 py-md-2 bg-light mx-2 mx-md-3 select-border ' name="" id="">
                        <option value="" selected>{t('grade')}</option>
                        {
                            uniqueGrade?.map((item, index) => (
                                <option key={index} >{item.Grade}</option>
                            ))
                        }
                    </select>
                    <select onChange={handleTopicFilter} className='px-md-3 px-1 py-md-2 bg-light mx-md-3 select-border' name="" id="">
                        <option value="" selected>{t('topic')}</option>
                        {
                            uniqueTopic?.map((item, index) => (
                                <option key={index} >{item.Topic}</option>
                            ))
                        }
                    </select>
                    <select onChange={handleSkillFilter} className='d-none d-md-inline px-1  px-md-3 py-md-2 bg-light mx-md-3 select-border' name="" id="">
                        <option value="" selected>{t('skill')}</option>
                        {
                            uniqueSkill?.map((item, index) => (
                                <option key={index} >{item.Skill}</option>
                            ))
                        }
                    </select>
                </div>
                <div>
                    <select onChange={handleSkillFilter} className='d-inline d-md-none px-1  px-md-3 py-md-2 bg-light mx-md-3 select-border' name="" id="">
                        <option value="" selected>{t('skill')}</option>
                        {
                            uniqueSkill?.map((item, index) => (
                                <option key={index} >{item.Skill}</option>
                            ))
                        }
                    </select>
                    <select onChange={handleSubTopicFilter} className=' px-1 px-md-3 py-md-2 bg-light mx-2 mx-md-3 select-border' name="" id="">
                        <option value="" selected>{t('sub_topic')}</option>
                        {
                            uniqueSubTopic?.map((item, index) => (
                                <option key={index} >{item['Sub Topic']}</option>
                            ))
                        }
                    </select>
                    <select onChange={handleSubSUbTopicFilter} className=' px-1 px-md-3 py-md-2 bg-light mx-md-3 select-border' name="" id="">
                        <option value="" selected>{t('sub_sub_topic')}</option>
                        {
                            uniqueSubSubTopic?.map((item, index) => (
                                <option key={index} >{item['Sub-sub topic']}</option>
                            ))
                        }
                    </select>
                </div>
            </div>
            <div className='d-flex justify-content-center my-5 pt-5'>
                <button onClick={handleFindStratigys} className='submit_btn'>{t('find_strategies')}</button>
                {/* <Link to='/search'><button className='submit_btn'>{t('find_strategies')}</button></Link> */}
            </div>
            <Article />
        </>
    );
};

export default HomeLayout;