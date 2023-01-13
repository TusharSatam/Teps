import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { getAllStratigys } from '../../services/stratigyes';
import { useAuth } from '../../Context/AuthContext';
import Article from '../LandingArticle/Article';
import './homelayout.css'
const FilterStr = ({ stratigy }) => {
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
  const [error5, setError5] = React.useState(false)
  const [error6, setError6] = React.useState(false)
  const navigate = useNavigate();
  const location = useLocation();
  const { setStratigyFilData } = useAuth();
  React.useEffect(() => {
    setAllStratigys(stratigy)
  }, [stratigy])
  React.useEffect(() => {
    if (location.pathname !== '/home') {
      if (selectedOption) {
        setSelectSubject(selectedOption?.selectSubject)
        setSelectGrade(selectedOption?.selectGrade)
        setSelectTopic(selectedOption?.selectTopic)
        setSelectSkill(selectedOption?.selectSkill)
        setSelectSubTopic(selectedOption?.selectSubTopic)
        setSelectSubSubTopic(selectedOption?.selectSubSubTopic)
      }
    }
  }, [selectedOption, location.pathname])
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
    setSelectGrade('')
    setSelectTopic('')
    setSelectSkill('')
    setSelectSubTopic('')
    setSelectSubSubTopic('')
    localStorage.removeItem('selectedDropdown');
  }

  const handlegradeFilter = (e) => {
    setSelectGrade(e.target.value)
    setSelectTopic('')
    setSelectSkill('')
    setSelectSubTopic('')
    setSelectSubSubTopic('')
    localStorage.removeItem('selectedDropdown');
  }
  const handleTopicFilter = (e) => {
    setSelectTopic(e.target.value)
    setSelectSubTopic('')
    setSelectSubSubTopic('')
    localStorage.removeItem('selectedDropdown');
  }
  const handleSkillFilter = (e) => {
    setSelectSkill(e.target.value)
    setSelectTopic('')
    setSelectSubTopic('')
    setSelectSubSubTopic('')
    localStorage.removeItem('selectedDropdown');
  }
  const handleSubTopicFilter = (e) => {
    setSelectSubTopic(e.target.value)
    setSelectSubSubTopic('')
    localStorage.removeItem('selectedDropdown');
  }
  const handleSubSUbTopicFilter = (e) => {
    setSelectSubSubTopic(e.target.value)
    localStorage.removeItem('selectedDropdown');
  }
  const aquaticCreatures = allStratigys.filter(function (creature) {
    return creature.Subject === selectSubject && creature.Grade === selectGrade;
  })
  const uniqueSkill = Array.from(new Set(aquaticCreatures?.map(a => a.Skill)))
    .map(skill => {
      return aquaticCreatures?.find(a => a.Skill === skill)
    });
  const aquaticCreaturesSkill = allStratigys.filter(function (creature) {
    return creature.Subject === selectSubject && creature.Grade === selectGrade && creature.Skill === selectSkill;
  })
  const uniqueTopic = Array.from(new Set(aquaticCreaturesSkill?.map(a => a.Topic)))
    .map(topic => {
      return aquaticCreaturesSkill?.find(a => a.Topic === topic)
    });

  const aquaticCreaturesTopic = allStratigys.filter(function (creature) {
    return creature.Subject === selectSubject && creature.Grade === selectGrade && creature.Skill === selectSkill && creature.Topic === selectTopic;
  })

  const uniqueSubTopic = Array.from(new Set(aquaticCreaturesTopic?.map(a => a['Sub Topic'])))
    .map(sub_topic => {
      return aquaticCreaturesTopic?.find(a => a['Sub Topic'] === sub_topic)
    });
  const aquaticCreaturesSubTopic = allStratigys.filter(function (creature) {
    return creature.Subject === selectSubject && creature.Grade === selectGrade && creature.Skill === selectSkill && creature['Sub Topic'] === selectSubTopic;
  })
  const uniqueSubSubTopic = Array.from(new Set(aquaticCreaturesSubTopic?.map(a => a['Sub-sub topic'])))
    .map(sub_sub_topic => {
      return aquaticCreaturesSubTopic?.find(a => a['Sub-sub topic'] === sub_sub_topic)
    });

  const handleFindStratigys = () => {
    if (selectSubject && selectGrade && selectSkill && selectTopic && selectSubject && selectSubSubTopic) {
      const aquaticCreatures = allStratigys.filter(function (creature) {
        return creature.Subject === selectSubject && creature.Grade === selectGrade && creature.Topic === selectTopic && creature.Skill === selectSkill && creature['Sub Topic'] === selectSubTopic && creature['Sub-sub topic'] === selectSubSubTopic;
      });
      setStratigyFilData(aquaticCreatures)
      if (aquaticCreatures) {
        window.localStorage.setItem('filterSaveData', JSON.stringify(aquaticCreatures));
      }
      if (aquaticCreatures.length !== 0) {
        window.localStorage.setItem('selectedDropdown', JSON.stringify({ selectSubject, selectGrade, selectTopic, selectSkill, selectSubTopic, selectSubSubTopic }));
      }
      else {
        setError("No strategies are available for this combination. Please try a different combination.")
      }
    }
    else {
      if (!selectSubject) { setError5(true) }
      if (!selectGrade) { setError6(true) }
      if (!selectSkill) { setError1(true) }
      if (!selectTopic) { setError2(true) }
      if (!selectSubTopic) { setError3(true) }
      if (!selectSubSubTopic) { setError4(true) }
      setError("Please fill all the boxes to proceed.")
    }
  }


  return (
    <>
      <div className={location.pathname === '/saveStratigy' || location.pathname === '/favouriteStratigy' ? 'container d-flex flex-column justify-content-center align-items-md-center' : 'container d-flex flex-column justify-content-center align-items-md-center my-3 my-md-5'}>
        <div className={location.pathname === '/home' ? 'my-3 my-md-3 d-flex' : location.pathname === '/saveStratigy' || location.pathname === '/favouriteStratigy' ? 'my-3 d-flex' : 'my-3 pt-3 pt-md-5 d-flex'}>
          <select value={selectSubject} onChange={handlesubFilter} defaultValue={location.pathname !== '/home' && selectedOption?.selectSubject} className={error5 ? ' d-none d-md-block px-md-3 px-1 py-md-2 bg-light mx-md-3 error-border me-3' : 'd-none d-md-block px-md-3 px-1 py-md-2 bg-light mx-md-3 select-border me-3'} name="" id="">
            {
              selectedOption && location.pathname !== '/home' ?
                <>
                  <option value="" selected disabled>{t('Subject')}</option>
                </> :
                <option value="" selected disabled>{t('Subject')}</option>

            }
            {
              uniqueSubject?.map((item, index) => (
                <option key={index} >{item.Subject}</option>
              ))
            }
          </select>
          <select value={selectSubject} onChange={handlesubFilter} defaultValue={location.pathname !== '/home' && selectedOption?.selectSubject} className={error5 ? 'd-block d-md-none px-md-3 px-1 py-md-2 bg-light mx-md-3 error-border me-3 w-50' : 'd-block d-md-none px-md-3 px-1 py-md-2 bg-light mx-md-3 select-border me-3 w-50'} name="" id="">
            {
              selectedOption && location.pathname !== '/home' ?
                <>
                  <option value="" selected disabled>{t('Subject')}</option>
                  {localStorage.getItem('selectedDropdown') && !selectSubject && <option value="" selected disabled>{selectedOption?.selectSubject}</option>}
                </> :
                <option value="" selected disabled>{t('Subject')}</option>

            }
            {
              uniqueSubject?.map((item, index) => (
                <option key={index} >{item.Subject}</option>
              ))
            }
          </select>
          <select value={selectGrade} onChange={handlegradeFilter} defaultValue={location.pathname !== '/home' && selectedOption?.selectGrade} className={error6 ? 'd-block d-md-none px-md-3 px-1 py-md-2 bg-light ms-2 ms-md-3 error-border w-50' : 'd-block d-md-none px-md-3 px-1 py-md-2 bg-light ms-2 ms-md-3 select-border w-50'} name="" id="">
            {
              selectedOption && location.pathname !== '/home' ?
                <>
                  <option value="" selected disabled>{t('Grade')}</option>
                  {localStorage.getItem('selectedDropdown') && !selectGrade && <option value="" selected disabled>{selectedOption?.selectGrade}</option>}
                </> :
                <option value="" selected disabled>{t('Grade')}</option>

            }
            {
              uniqueGrade?.map((item, index) => (
                <option key={index} >{item.Grade}</option>
              ))
            }
          </select>
          <select value={selectGrade} onChange={handlegradeFilter} defaultValue={location.pathname !== '/home' && selectedOption?.selectGrade} className={error6 ? 'd-none d-md-block px-md-3 px-1 py-md-2 bg-light mx-2 mx-md-3 error-border ' : 'd-none d-md-block px-md-3 px-1 py-md-2 bg-light mx-2 mx-md-3 select-border '} name="" id="">
            {
              selectedOption && location.pathname !== '/home' ?
                <>
                  <option value="" selected disabled>{t('Grade')}</option>
                  {localStorage.getItem('selectedDropdown') && !selectGrade && <option value="" selected disabled>{selectedOption?.selectGrade}</option>}
                </> :
                <option value="" selected disabled>{t('Grade')}</option>

            }
            {
              uniqueGrade?.map((item, index) => (
                <option key={index} >{item.Grade}</option>
              ))
            }
          </select>
          <select value={selectSkill} onChange={handleSkillFilter} defaultValue={selectedOption?.selectSkill} className={error1 ? 'd-none d-md-block px-1  px-md-3 py-md-2 bg-light mx-md-3 error-border' : 'd-none d-md-inline px-1  px-md-3 py-md-2 bg-light mx-md-3 select-border'} name="" id="">
            {
              selectedOption && location.pathname !== '/home' ?
                <>
                  <option value="" selected disabled>{t('Skill')}</option>
                  {localStorage.getItem('selectedDropdown') && !selectSkill && <option value="" selected disabled>{selectedOption?.selectSkill}</option>}
                </> :
                <option value="" selected disabled>{t('Skill')}</option>

            }
            {
              uniqueSkill?.map((item, index) => (
                <option key={index} >{item.Skill}</option>
              ))
            }
          </select>
          <select value={selectTopic} onChange={handleTopicFilter} defaultValue={selectedOption?.selectTopic} className={error2 ? 'd-none d-md-block px-md-3 px-1 py-md-2 bg-light mx-md-3 error-border' : 'd-none d-md-block px-md-3 px-1 py-md-2 bg-light mx-md-3 select-border'} name="" id="">
            {
              selectedOption && location.pathname !== '/home' ?
                <>
                  <option value="" selected disabled>{t('Topic')}</option>
                  {localStorage.getItem('selectedDropdown') && !selectTopic && <option value="" selected disabled>{selectedOption?.selectTopic}</option>}
                </> :
                <option value="" selected disabled>{t('Topic')}</option>

            }
            {
              uniqueTopic?.map((item, index) => (
                <option key={index} >{item.Topic}</option>
              ))
            }
          </select>
        </div>
        <div className='mb-3'>
          <select value={selectSkill} onChange={handleSkillFilter} defaultValue={selectedOption?.selectSkill} className={error1 ? 'd-block d-md-none px-1  px-md-3 py-md-2 bg-light error-border me-2  w-100' : 'd-block d-md-none px-1  px-md-3 py-md-2 bg-light select-border me-2 w-100'} name="" id="">
            {
              selectedOption && location.pathname !== '/home' ?
                <>
                  <option value="" selected disabled>{t('Skill')}</option>
                  {localStorage.getItem('selectedDropdown') && !selectSkill && <option value="" selected disabled>{selectedOption?.selectSkill}</option>}
                </> :
                <>
                  <option value="" selected disabled>{t('Skill')}</option>
                </>
            }
            {
              uniqueSkill?.map((item, index) => (
                <option key={index} >{item.Skill}</option>
              ))
            }
          </select>
          <select value={selectTopic} onChange={handleTopicFilter} defaultValue={selectedOption?.selectTopic} className={error2 ? 'd-block d-md-none px-md-3 py-md-2 bg-light error-border me-4 w-100 mt-3' : 'd-block d-md-none px-md-3  py-md-2 bg-light select-border me-4 mt-3 w-100'} style={{ paddingLeft: "2px", paddingRight: "5px" }} name="" id="">
            {
              selectedOption && location.pathname !== '/home' ?
                <>
                  <option value="" selected disabled>{t('Topic')}</option>
                  {localStorage.getItem('selectedDropdown') && !selectTopic && <option value="" selected disabled>{selectedOption?.selectTopic}</option>}
                </> :
                <option value="" selected disabled>{t('Topic')}</option>

            }
            {
              uniqueTopic?.map((item, index) => (
                <option key={index} >{item.Topic}</option>
              ))
            }
          </select>
        </div>
        <div className='d-block justify-content-center align-items-center d-md-none'>
          <div>
            <select value={selectSubTopic} onChange={handleSubTopicFilter} defaultValue={selectedOption?.selectSubTopic} className={error3 ? 'px-1 px-md-3 py-md-2 bg-light error-border w-100' : 'px-1 px-md-3 py-md-2 bg-light select-border w-100'} name="" id="">
              {
                selectedOption && location.pathname !== '/home' ?
                  <>
                    <option value="" selected disabled>{t('Sub - topic')}</option>
                    {localStorage.getItem('selectedDropdown') && !selectSubTopic && <option value="" selected disabled>{selectedOption?.selectSubTopic}</option>}
                  </> :
                  <>
                    <option value="" selected disabled>{t('Sub - topic')}</option>
                  </>
              }
              {
                uniqueSubTopic?.map((item, index) => (
                  <option key={index} >{item['Sub Topic']}</option>
                ))
              }
            </select>
          </div>
          <div className='mt-3'>
            <select value={selectSubSubTopic} onChange={handleSubSUbTopicFilter} defaultValue={selectedOption?.selectSubSubTopic} className={error4 ? 'px-1 px-md-3 py-md-2 bg-light mx-md-3 error-border w-100' : 'px-1 px-md-3 py-md-2 bg-light mx-md-3 select-border w-100'} name="" id="">
              {
                selectedOption && location.pathname !== '/home' ?
                  <>
                    <option value="" selected disabled>{t('Sub sub - topic')}</option>
                    {localStorage.getItem('selectedDropdown') && !selectSubSubTopic && <option value="" selected disabled>{selectedOption?.selectSubSubTopic}</option>}
                  </> :
                  <>
                    <option value="" selected disabled>{t('Sub sub - topic')}</option>
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
        <div className='d-none d-md-block'>
          <select value={selectSubTopic} onChange={handleSubTopicFilter} defaultValue={selectedOption?.selectSubTopic} className={error3 ? 'px-1 px-md-3 py-md-2 bg-light mx-2 mx-md-3 error-border' : 'px-1 px-md-3 py-md-2 bg-light mx-2 mx-md-3 select-border'} name="" id="">
            {
              selectedOption && location.pathname !== '/home' ?
                <>
                  <option value="" selected disabled>{t('Sub - topic')}</option>
                  {localStorage.getItem('selectedDropdown') && !selectSubTopic && <option value="" selected disabled>{selectedOption?.selectSubTopic}</option>}
                </> :
                <>
                  <option value="" selected disabled>{t('Sub - topic')}</option>
                </>
            }
            {
              uniqueSubTopic?.map((item, index) => (
                <option key={index} >{item['Sub Topic']}</option>
              ))
            }
          </select>
          <select value={selectSubSubTopic} onChange={handleSubSUbTopicFilter} defaultValue={selectedOption?.selectSubSubTopic} className={error4 ? 'px-1 px-md-3 py-md-2 bg-light mx-md-3 error-border' : 'px-1 px-md-3 py-md-2 bg-light mx-md-3 select-border'} name="" id="">
            {
              selectedOption && location.pathname !== '/home' ?
                <>
                  <option value="" selected disabled>{t('Sub sub - topic')}</option>
                  {localStorage.getItem('selectedDropdown') && !selectSubSubTopic && <option value="" selected disabled>{selectedOption?.selectSubSubTopic}</option>}
                </> :
                <>
                  <option value="" selected disabled>{t('Sub sub - topic')}</option>
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
          error && location.pathname === '/saveStratigy' && <p className='error_text'>{error}</p>
        }
      </div>
      {
        location.pathname === '/home' ?
          <div className='d-flex justify-content-center my-4 my-md-5 '>
            <button onClick={handleFindStratigys} className='submit_btn'>{t('Find Strategies')}</button>
          </div>
          :
          location.pathname === '/saveStratigy' || location.pathname === '/favouriteStratigy' ?
            <div className='d-flex justify-content-center my-4 my-md-5'>
              <button onClick={handleFindStratigys} className='Sec_submit_btn'>{t('Find Strategies')}</button>
            </div> :
            <div className='d-flex justify-content-center my-4 my-md-5 pb-4 pb-md-5'>
              <button onClick={handleFindStratigys} className='Sec_submit_btn'>{t('Find Strategies')}</button>
            </div>
      }
    </>
  );
};

export default FilterStr;