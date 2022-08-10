import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { getAllHindiStratigys } from '../../services/hindiStratigys';
import { useAuth } from '../../Context/AuthContext';
import Article from '../LandingArticle/Article';
import './homelayout.css'
const HomeHindiLayout = ({ setAccorKey = () => { } }) => {
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
    getAllHindiStratigys()
      .then(res => {
        setAllStratigys(res.data);
        console.log(res);
      })
    const selectedDropdown = localStorage.getItem('selectedHiDropdown');
    if (selectedDropdown) {
      setSelectedOption(JSON.parse(selectedDropdown))
    }
  }, [])
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
  // console.log('hlw', selectedOption);
  // console.log(selectSubject, selectGrade, selectTopic, selectSkill, selectSubTopic, selectSubSubTopic);
  const uniqueSubject = Array.from(new Set(allStratigys.map(a => a.विषय)))
    .map(subject => {
      return allStratigys.find(a => a.विषय === subject)
    })
  const uniqueGrade = Array.from(new Set(allStratigys.map(a => a.श्रेणी)))
    .map(grade => {
      return allStratigys.find(a => a.श्रेणी === grade)
    });
  const handlesubFilter = (e) => {
    setSelectSubject(e.target.value);
    setSelectGrade('')
    setSelectTopic('')
    setSelectSkill('')
    setSelectSubTopic('')
    setSelectSubSubTopic('')
    localStorage.removeItem('selectedHiDropdown');
  }
  const handlegradeFilter = (e) => {
    setSelectGrade(e.target.value)
    setSelectTopic('')
    setSelectSkill('')
    setSelectSubTopic('')
    setSelectSubSubTopic('')
    localStorage.removeItem('selectedHiDropdown');
  }
  const handleTopicFilter = (e) => {
    setSelectTopic(e.target.value)
    setSelectSubTopic('')
    setSelectSubSubTopic('')
    localStorage.removeItem('selectedHiDropdown');
  }
  const handleSkillFilter = (e) => {
    setSelectSkill(e.target.value)
    setSelectTopic('')
    setSelectSubTopic('')
    setSelectSubSubTopic('')
    localStorage.removeItem('selectedHiDropdown');
  }
  const handleSubTopicFilter = (e) => {
    setSelectSubTopic(e.target.value)
    setSelectSubSubTopic('')
    localStorage.removeItem('selectedHiDropdown');
  }
  const handleSubSUbTopicFilter = (e) => {
    setSelectSubSubTopic(e.target.value)
    localStorage.removeItem('selectedHiDropdown');
  }
  // console.log(selectSubSubTopic);
  const aquaticCreatures = allStratigys.filter(function (creature) {
    return creature.विषय === selectSubject && creature.श्रेणी === selectGrade;
  })
  const uniqueSkill = Array.from(new Set(aquaticCreatures?.map(a => a.कौशल)))
    .map(skill => {
      return aquaticCreatures?.find(a => a.कौशल === skill)
    });
  const aquaticCreaturesSkill = allStratigys.filter(function (creature) {
    return creature.विषय === selectSubject && creature.श्रेणी === selectGrade && creature.कौशल === selectSkill;
  })
  const uniqueTopic = Array.from(new Set(aquaticCreaturesSkill?.map(a => a.शीर्षक)))
    .map(topic => {
      return aquaticCreaturesSkill?.find(a => a.शीर्षक === topic)
    });
  const aquaticCreaturesTopic = allStratigys.filter(function (creature) {
    return creature.विषय === selectSubject && creature.श्रेणी === selectGrade && creature.कौशल === selectSkill && creature.शीर्षक === selectTopic;
  })

  const uniqueSubTopic = Array.from(new Set(aquaticCreaturesTopic?.map(a => a['उप शीर्षक'])))
    .map(sub_topic => {
      return aquaticCreaturesTopic?.find(a => a['उप शीर्षक'] === sub_topic)
    });
  const aquaticCreaturesSubTopic = allStratigys.filter(function (creature) {
    return creature.विषय === selectSubject && creature.श्रेणी === selectGrade && creature.शीर्षक === selectTopic && creature.कौशल === selectSkill && creature['उप शीर्षक'] === selectSubTopic;
  })
  const uniqueSubSubTopic = Array.from(new Set(aquaticCreaturesSubTopic?.map(a => a['उप-उप शीर्षक'])))
    .map(sub_sub_topic => {
      return aquaticCreaturesSubTopic?.find(a => a['उप-उप शीर्षक'] === sub_sub_topic)
    });

  const handleFindStratigys = () => {
    // accordion collapse and remove checkbox
    setAccorKey()
    if (location.pathname === '/home') {
      if (selectSubject && selectGrade && selectSkill && selectTopic && selectSubject && selectSubSubTopic) {
        const aquaticCreatures = allStratigys.filter(function (creature) {
          return creature.विषय === selectSubject && creature.श्रेणी === selectGrade && creature.शीर्षक === selectTopic && creature.कौशल === selectSkill && creature['उप शीर्षक'] === selectSubTopic && creature['उप-उप शीर्षक'] === selectSubSubTopic;
        });
        setStratigyFilData(aquaticCreatures);
        if (aquaticCreatures) {
          window.localStorage.setItem('filterDataH', JSON.stringify(aquaticCreatures));
        }
        if (aquaticCreatures.length !== 0) {
          if (location.pathname === '/home') {
            navigate('/search')
          }
          window.localStorage.setItem('selectedHiDropdown', JSON.stringify({ selectSubject, selectGrade, selectTopic, selectSkill, selectSubTopic, selectSubSubTopic }));
        }
        else {
          setError("इस संयोजन के लिए कोई रणनीति उपलब्ध नहीं है। कृपया कोई दूसरा संयोजन आज़माएं।")
        }
      }
      else {
        if (!selectSkill) { setError1(true) }
        if (!selectTopic) { setError2(true) }
        if (!selectSubTopic) { setError3(true) }
        if (!selectSubSubTopic) { setError4(true) }
        setError("आगे बढ़ने के लिए कृपया सभी बॉक्स भरें।")
      }
    }
    else {
      window.localStorage.setItem('selectedHiDropdown', JSON.stringify({ selectSubject, selectGrade, selectTopic, selectSkill, selectSubTopic, selectSubSubTopic }));
      const aquaticCreatures = allStratigys.filter(function (creature) {
        return creature.विषय === selectSubject && creature.श्रेणी === selectGrade && creature.शीर्षक === selectTopic && creature.कौशल === selectSkill && creature['उप शीर्षक'] === selectSubTopic && creature['उप-उप शीर्षक'] === selectSubSubTopic;
      });

      setStratigyFilData(aquaticCreatures)
      if (aquaticCreatures) {
        window.localStorage.setItem('filterDataH', JSON.stringify(aquaticCreatures));
      }
      if (aquaticCreatures.length === 0) {
        setError("इस संयोजन के लिए कोई रणनीति उपलब्ध नहीं है। कृपया कोई दूसरा संयोजन आज़माएं।")
      }
      // console.log(selectSubject, selectGrade, selectSkill, selectTopic, selectSubTopic, selectSubSubTopic);
      // console.log(selectedOption?.selectSubject, selectedOption?.selectGrade, selectedOption?.selectSkill, selectedOption?.selectTopic, selectedOption?.selectSubTopic, selectedOption?.selectSubSubTopic);

    }

  }

  return (
    <>
      <div value={selectSubject} className='container d-flex flex-column justify-content-center align-items-md-center my-3 my-md-5'>
        <div className={location.pathname === '/home' ? 'my-3 my-md-3 d-flex' : 'my-3 pt-3 pt-md-5 d-flex'}>
          <select onChange={handlesubFilter} defaultValue={location.pathname !== '/home' && selectedOption?.selectSubject} className='d-none d-md-block px-md-3 px-1 py-md-2 bg-light mx-md-3 select-border me-3' name="" id="">
            {
              selectedOption && location.pathname !== '/home' ?
                <>
                  <option value="" selected disabled>{t('Subject')}</option>
                  {localStorage.getItem('selectedHiDropdown') && !selectSubject && <option value="" selected disabled>{selectedOption?.selectSubject}</option>}
                </> :
                <option value="" selected disabled>{t('Subject')}</option>

            }
            {
              uniqueSubject?.map((item, index) => (
                <option key={index} >{item.विषय}</option>
              ))
            }
          </select>
          <select value={selectSubject} onChange={handlesubFilter} defaultValue={location.pathname !== '/home' && selectedOption?.selectSubject} className='d-block d-md-none px-md-3 px-1 py-md-2 bg-light mx-md-3 select-border me-3 w-50' name="" id="">
            {
              selectedOption && location.pathname !== '/home' ?
                <>
                  <option value="" selected disabled>{t('Subject')}</option>
                  {localStorage.getItem('selectedHiDropdown') && !selectSubject && <option value="" selected disabled>{selectedOption?.selectSubject}</option>}
                </> :
                <option value="" selected disabled>{t('Subject')}</option>

            }
            {
              uniqueSubject?.map((item, index) => (
                <option key={index} >{item.विषय}</option>
              ))
            }
          </select>
          <select value={selectGrade} onChange={handlegradeFilter} defaultValue={location.pathname !== '/home' && selectedOption?.selectGrade} className='d-block d-md-none px-md-3 px-1 py-md-2 bg-light ms-2 ms-md-3 select-border w-50' name="" id="">
            {
              selectedOption && location.pathname !== '/home' ?
                <>
                  <option value="" selected disabled>{t('Grade')}</option>
                  {localStorage.getItem('selectedHiDropdown') && !selectGrade && <option value="" selected disabled>{selectedOption?.selectGrade}</option>}
                </> :
                <option value="" selected disabled>{t('Grade')}</option>

            }
            {
              uniqueGrade?.map((item, index) => (
                <option key={index} >{item.श्रेणी}</option>
              ))
            }
          </select>
          <select value={selectGrade} onChange={handlegradeFilter} defaultValue={location.pathname !== '/home' && selectedOption?.selectGrade} className='d-none d-md-block px-md-3 px-1 py-md-2 bg-light mx-2 mx-md-3 select-border ' name="" id="">
            {
              selectedOption && location.pathname !== '/home' ?
                <>
                  <option value="" selected disabled>{t('Grade')}</option>
                  {localStorage.getItem('selectedHiDropdown') && !selectGrade && <option value="" selected disabled>{selectedOption?.selectGrade}</option>}
                </> :
                <option value="" selected disabled>{t('Grade')}</option>

            }
            {
              uniqueGrade?.map((item, index) => (
                <option key={index} >{item.श्रेणी}</option>
              ))
            }
          </select>
          <select value={selectSkill} onChange={handleSkillFilter} defaultValue={selectedOption?.selectSkill} className={error1 ? 'd-none d-md-block px-1  px-md-3 py-md-2 bg-light mx-md-3 error-border' : 'd-none d-md-inline px-1  px-md-3 py-md-2 bg-light mx-md-3 select-border'} name="" id="">
            {
              selectedOption && location.pathname !== '/home' ?
                <>
                  <option value="" selected disabled>{t('Skill')}</option>
                  {localStorage.getItem('selectedHiDropdown') && !selectSkill && <option value="" selected disabled>{selectedOption?.selectSkill}</option>}
                </> :
                <option value="" selected disabled>{t('Skill')}</option>

            }
            {
              uniqueSkill?.map((item, index) => (
                <option key={index} >{item.कौशल}</option>
              ))
            }
          </select>
          <select value={selectTopic} onChange={handleTopicFilter} defaultValue={selectedOption?.selectTopic} className={error2 ? 'd-none d-md-block px-md-3 px-1 py-md-2 bg-light mx-md-3 error-border' : 'd-none d-md-block px-md-3 px-1 py-md-2 bg-light mx-md-3 select-border'} name="" id="">
            {
              selectedOption && location.pathname !== '/home' ?
                <>
                  <option value="" selected disabled>{t('Topic')}</option>
                  {localStorage.getItem('selectedHiDropdown') && !selectTopic && <option value="" selected disabled>{selectedOption?.selectTopic}</option>}
                </> :
                <option value="" selected disabled>{t('Topic')}</option>

            }
            {
              uniqueTopic?.map((item, index) => (
                <option key={index} >{item.शीर्षक}</option>
              ))
            }
          </select>
        </div>
        <div className='mb-3'>
          <select value={selectSkill} onChange={handleSkillFilter} defaultValue={selectedOption?.selectSkill} className={error1 ? 'd-block d-md-none px-1  px-md-3 py-md-2 bg-light error-border me-2 w-100' : 'd-block d-md-none px-1  px-md-3 py-md-2 bg-light select-border me-2 w-100'} name="" id="">
            {
              selectedOption && location.pathname !== '/home' ?
                <>
                  <option value="" selected disabled>{t('Skill')}</option>
                  {localStorage.getItem('selectedHiDropdown') && !selectSkill && <option value="" selected disabled>{selectedOption?.selectSkill}</option>}
                </> :
                <>
                  <option value="" selected disabled>{t('Skill')}</option>
                </>
            }
            {
              uniqueSkill?.map((item, index) => (
                <option key={index} >{item.कौशल}</option>
              ))
            }
          </select>
          <select value={selectTopic} onChange={handleTopicFilter} defaultValue={selectedOption?.selectTopic} className={error2 ? 'd-block d-md-none px-md-3 py-md-2 bg-light error-border me-4 w-100 mt-3' : 'd-block d-md-none px-md-3  py-md-2 bg-light select-border me-4 w-100 mt-3'} style={{ paddingLeft: "2px", paddingRight: "5px" }} name="" id="">
            {
              selectedOption && location.pathname !== '/home' ?
                <>
                  <option value="" selected disabled>{t('Topic')}</option>
                  {localStorage.getItem('selectedHiDropdown') && !selectTopic && <option value="" selected disabled>{selectedOption?.selectTopic}</option>}
                </> :
                <option value="" selected disabled>{t('Topic')}</option>

            }
            {
              uniqueTopic?.map((item, index) => (
                <option key={index} >{item.शीर्षक}</option>
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
                    {localStorage.getItem('selectedHiDropdown') && !selectSubTopic && <option value="" selected disabled>{selectedOption?.selectSubTopic}</option>}
                  </> :
                  <>
                    <option value="" selected disabled>{t('Sub - topic')}</option>
                  </>
              }
              {
                uniqueSubTopic?.map((item, index) => (
                  <option key={index} >{item['उप शीर्षक']}</option>
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
                    {localStorage.getItem('selectedHiDropdown') && !selectSubSubTopic && <option value="" selected disabled>{selectedOption?.selectSubSubTopic}</option>}
                  </> :
                  <>
                    <option value="" selected disabled>{t('Sub sub - topic')}</option>
                  </>
              }
              {
                uniqueSubSubTopic?.map((item, index) => (
                  <option key={index} >{item['उप-उप शीर्षक']}</option>
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
                  {localStorage.getItem('selectedHiDropdown') && !selectSubTopic && <option value="" selected disabled>{selectedOption?.selectSubTopic}</option>}
                </> :
                <>
                  <option value="" selected disabled>{t('Sub - topic')}</option>
                </>
            }
            {
              uniqueSubTopic?.map((item, index) => (
                <option key={index} >{item['उप शीर्षक']}</option>
              ))
            }
          </select>
          <select value={selectSubSubTopic} onChange={handleSubSUbTopicFilter} defaultValue={selectedOption?.selectSubSubTopic} className={error4 ? 'px-1 px-md-3 py-md-2 bg-light mx-md-3 error-border' : 'px-1 px-md-3 py-md-2 bg-light mx-md-3 select-border'} name="" id="">
            {
              selectedOption && location.pathname !== '/home' ?
                <>
                  <option value="" selected disabled>{t('Sub sub - topic')}</option>
                  {localStorage.getItem('selectedHiDropdown') && !selectSubSubTopic && <option value="" selected disabled>{selectedOption?.selectSubSubTopic}</option>}
                </> :
                <>
                  <option value="" selected disabled>{t('Sub sub - topic')}</option>
                </>
            }
            {
              uniqueSubSubTopic?.map((item, index) => (
                <option key={index} >{item['उप-उप शीर्षक']}</option>
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
            <button onClick={handleFindStratigys} className='submit_btn'>{t('Find Strategies')}</button>
          </div>
          :
          <div className='d-flex justify-content-center my-4 my-md-5 pb-4 pb-md-5'>
            <button onClick={handleFindStratigys} className='Sec_submit_btn'>{t('Find Strategies')}</button>
          </div>
      }
    </>
  );
};

export default HomeHindiLayout;