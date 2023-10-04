import React, { useState } from 'react';
import { useAuth } from '../../Context/AuthContext';
import { getAllHindiStratigys } from '../../services/hindiStratigys';
import ApproveReqModalHi from '../Modal/ApproveReqModalHi';
import PublishModal from '../Modal/PublishEditStrategy/PublishModal';
import { t } from 'i18next';

const AddFormHi = () => {
  const [allStratigys, setAllStratigys] = React.useState([])
  //---------------------------------------------------------
  const [selectSubject, setSelectSubject] = React.useState('')
  const [selectGrade, setSelectGrade] = React.useState('')
  const [selectTopic, setSelectTopic] = React.useState('')
  const [selectSkill, setSelectSkill] = React.useState('')
  const [selectSubTopic, setSelectSubTopic] = React.useState('')
  const [selectSubSubTopic, setSelectSubSubTopic] = useState('')
  const [learning_outcome, setlearning_outcome] = useState('')
  const [submitData, setSubmitData] = React.useState({})
  const { user } = useAuth()
  const [modalShow, setModalShow] = React.useState(false);
  const [error, setError] = React.useState(false);

  React.useEffect(() => {
    getAllHindiStratigys()
      .then(res => {
        setAllStratigys(res.data);
      })
  }, []);
  const uniqueGrade = Array.from(new Set(allStratigys.map(a => a.श्रेणी)))
  .map(grade => {
    return allStratigys.find(a => a.श्रेणी === grade)
  });
  const aquaticCreaturesSubject = allStratigys.filter(function (creature) {
    return  creature.श्रेणी === selectGrade;
  })
  const uniqueSubject = Array.from(new Set(aquaticCreaturesSubject.map(a => a.विषय)))
    .map(subject => {
      return aquaticCreaturesSubject.find(a => a.विषय === subject)
    })

  const uniqueDevDom1 = Array.from(new Set(allStratigys.map(a => a['विकासात्मक क्षेत्र 1'])))
    .map(devDom1 => {
      return allStratigys.find(a => a['विकासात्मक क्षेत्र 1'] === devDom1)
    });
  const uniqueDevDom2 = Array.from(new Set(allStratigys.map(a => a['विकासात्मक क्षेत्र 2'])))
    .map(devDom1 => {
      return allStratigys.find(a => a['विकासात्मक क्षेत्र 2'] === devDom1)
    });
  const handleSub = (e) => {
    setSelectSubject(e.target.value)
    setSelectTopic('')
    setSelectSkill('')
    setSelectSubTopic('')
    setSelectSubSubTopic('')
  }
  const handleGrade = (e) => {
    setSelectGrade(e.target.value)
    setSelectSubject('')
    setSelectTopic('')
    setSelectSkill('')
    setSelectSubTopic('')
    setSelectSubSubTopic('')
  }
  const handleSkill = (e) => {
    setSelectSkill(e.target.value)
    setSelectTopic('')
    setSelectSubTopic('')
    setSelectSubSubTopic('')
  }
  const handleTopic = (e) => {
    setSelectTopic(e.target.value)
    setSelectSubTopic('')
    setSelectSubSubTopic('')
  }
  const handleSubTopic = (e) => {
    setSelectSubTopic(e.target.value)
    setSelectSubSubTopic('')
  }
  const handleSubSubTopic=(e)=>{
    setSelectSubSubTopic(e.target.value)
  }
  const handleLearning=(e)=>{
    setlearning_outcome(e.target.value)
  }
  
  const aquaticCreatures = allStratigys.filter(function (creature) {
    return creature.विषय === selectSubject && creature.श्रेणी === selectGrade;
  })
  const uniqueSkill = Array.from(new Set(aquaticCreatures?.map(a => a['अच्छा विषय'])))
    .map(skill => {
      return aquaticCreatures?.find(a => a['अच्छा विषय'] === skill)
    });
  const aquaticCreaturesSkill = allStratigys.filter(function (creature) {
    return creature.विषय === selectSubject && creature.श्रेणी === selectGrade && creature['अच्छा विषय'] === selectSkill;
  })
  const uniqueTopic = Array.from(new Set(aquaticCreaturesSkill?.map(a => a.शीर्षक)))
    .map(topic => {
      return aquaticCreaturesSkill?.find(a => a.शीर्षक === topic)
    });
  const aquaticCreaturesTopic = allStratigys.filter(function (creature) {
    return creature.विषय === selectSubject && creature.श्रेणी === selectGrade && creature['अच्छा विषय'] === selectSkill && creature.शीर्षक === selectTopic;
  })

  const uniqueSubTopic = Array.from(new Set(aquaticCreaturesTopic?.map(a => a['उप शीर्षक'])))
    .map(sub_topic => {
      return aquaticCreaturesTopic?.find(a => a['उप शीर्षक'] === sub_topic)
    });
  const aquaticCreaturesSubTopic = allStratigys.filter(function (creature) {
    return creature.विषय === selectSubject && creature.श्रेणी === selectGrade && creature.शीर्षक === selectTopic && creature['अच्छा विषय'] === selectSkill && creature['उप शीर्षक'] === selectSubTopic;
  })
  const uniqueSubSubTopic = Array.from(new Set(aquaticCreaturesSubTopic?.map(a => a['उप-उप शीर्षक'])))
    .map(sub_sub_topic => {
      return aquaticCreaturesSubTopic?.find(a => a['उप-उप शीर्षक'] === sub_sub_topic)
    });
  const handleSubmit = (e) => {
    console.log(selectSubject ,
      selectGrade ,
      selectSkill ,
      selectTopic ,
      selectSubTopic,
      selectSubSubTopic);
    e.preventDefault();
    if (!selectSubject ||
      !selectGrade ||
      !selectSkill ||
      !selectTopic ||
      !selectSubTopic ||
      !selectSubSubTopic||
      e.target.teaching_str.value === "") {
      setError(true)
    }
    else {
      setModalShow(true)
    }
    const data = {
      'User_id': user._id,
      'विषय': e.target.subject.value,
      'श्रेणी': e.target.grade.value,
      'अच्छा विषय': e.target.skill.value,
      'शीर्षक': e.target.topic.value,
      'उप शीर्षक': e.target.sub_topic.value,
      'उप-उप शीर्षक': e.target.sub_sub_topic.value,
      'शिक्षण के परिणाम': e.target.learning_outcome.value,
      'शिक्षण रणनीति': e.target.teaching_str.value,
      'Approve': false
    }
    setSubmitData(data)
         // Clear all select values
         setSelectSubject('');
         setSelectGrade('');
         setSelectSkill('');
         setSelectTopic('');
         setSelectSubTopic('');
         setSelectSubSubTopic('');
         setlearning_outcome('')
    e.target.reset()
  }
  const handleClosePublishModal=()=>{
    setModalShow(false)
  }
  const handleBackClick = () => {
    window.history.go(-1);
  };
  return (
    <div>

          <PublishModal show={modalShow} handleClose={handleClosePublishModal} setDatas={setSubmitData} Datas={submitData}/>

         <div className=" d-flex justify-content-center align-items-center mb-3">
            <button className="backbutton" onClick={handleBackClick}>{`< ${t('Back')}`}</button>
              <hr className="line"/>
              <p className="headText text-center">अपनी रणनीति जोड़ें</p>
              <hr className="line"/>
          </div>
      <div className='center-div'>
        <form className='form-main-div' onSubmit={handleSubmit}>
          <div className='two-selects '>
          <div>
              <p className='select-title'>श्रेणी <p>*</p></p>
              <select onChange={handleGrade} className={'select-field'} name="grade" value={selectGrade}>
                <option value="" selected disabled>श्रेणी</option>
                {
                  uniqueGrade?.map(res => (
                    <option>{res.श्रेणी}</option>
                  ))
                }
              </select>
            </div>
            <div>
              <p className='select-title'>विषय <p>*</p></p>
              <select onChange={handleSub} className={'select-field'} name="subject" value={selectSubject}>
                <option value="" selected disabled>विषय</option>
                {
                  uniqueSubject?.map(res => (
                    <option>{res.विषय}</option>
                  ))
                }
              </select>
            </div>
         
          </div>
          <div className='two-selects '>
            <div>
              <p className='select-title'>अच्छा विषय <p>*</p></p>
              <select onChange={handleSkill} className={'select-field'} name="skill" value={selectSkill}>
                <option value="" selected disabled>अच्छा विषय</option>
                {
                  uniqueSkill?.map(res => (
                    <option>{res['अच्छा विषय']}</option>
                  ))
                }
              </select>
            </div>
            <div>
              <p className='select-title'>शीर्षक <p>*</p></p>
              <select onChange={handleTopic} className={'select-field'} name="topic" value={selectTopic} >
                <option value="" selected disabled >शीर्षक</option>
                {
                  uniqueTopic?.map(res => (
                    <option>{res.शीर्षक}</option>
                  ))
                }
              </select>
            </div>
          </div>
          <div className='two-selects '>
            <div>
              <p className='select-title'>उप शीर्षक <p>*</p></p>
              <select onChange={handleSubTopic} className={'select-field'} name="sub_topic"value={selectSubTopic} >
                <option value="" selected disabled >उप शीर्षक</option>
                {
                  uniqueSubTopic?.map(res => (
                    <option>{res['उप शीर्षक']}</option>
                  ))
                }
              </select>
            </div>
            <div>
              <p className='select-title'>उप-उप शीर्षक <p>*</p></p>
              <select className={'select-field'} name="sub_sub_topic"  onChange={handleSubSubTopic} value={selectSubSubTopic}>
                <option value="" selected disabled >उप-उप शीर्षक</option>
                {
                  uniqueSubSubTopic?.map(res => (
                    <option>{res['उप-उप शीर्षक']}</option>
                  ))
                }
              </select>
            </div>
          </div>
      
          
          <div className='one-selects'>
            <div>
              <p className='select-title'>शिक्षण के परिणाम<p>*</p></p>
              <select className={'select-field w-100'} name="learning_outcome" value={learning_outcome} onChange={handleLearning}>
                <option value="" selected disabled>शिक्षण के परिणाम</option>
                {
                  uniqueSubSubTopic?.map(res => (
                    <option>{res['शिक्षण के परिणाम']}</option>
                  ))
                }
              </select>
            </div>
          </div>
          <div className='one-selects-l'>
            <div>
              <p className='select-title'>शिक्षण रणनीति <p>*</p></p>
              <textarea className={'select-field-full-2'} name="teaching_str"  />
            </div>
          </div>
          <div className='d-flex justify-content-center mt-4'>
            <button type='submit' className='form-btn'>अद्यतन रणनीति</button>
          </div>
          {error && <p className='form-error'>कृपया उपरोक्त सभी फ़ील्ड भरें!</p>}
        </form>
      </div>
    </div>
  );
};

export default AddFormHi;