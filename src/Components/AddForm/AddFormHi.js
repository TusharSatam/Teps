import React from 'react';
import { useAuth } from '../../Context/AuthContext';
import { getAllHindiStratigys } from '../../services/hindiStratigys';
import ApproveReqModalHi from '../Modal/ApproveReqModalHi';

const AddFormHi = () => {
  const [allStratigys, setAllStratigys] = React.useState([])
  //---------------------------------------------------------
  const [selectSubject, setSelectSubject] = React.useState()
  const [selectGrade, setSelectGrade] = React.useState()
  const [selectTopic, setSelectTopic] = React.useState()
  const [selectSkill, setSelectSkill] = React.useState()
  const [selectSubTopic, setSelectSubTopic] = React.useState()
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
  // english stratiges--------------------------------------------------------
  const uniqueSubject = Array.from(new Set(allStratigys.map(a => a.विषय)))
    .map(subject => {
      return allStratigys.find(a => a.विषय === subject)
    })
  const uniqueGrade = Array.from(new Set(allStratigys.map(a => a.श्रेणी)))
    .map(grade => {
      return allStratigys.find(a => a.श्रेणी === grade)
    });

  const uniqueDevDom1 = Array.from(new Set(allStratigys.map(a => a['विकासात्मक क्षेत्र 1'])))
    .map(devDom1 => {
      return allStratigys.find(a => a['विकासात्मक क्षेत्र 1'] === devDom1)
    });
  console.log(uniqueDevDom1);
  const uniqueDevDom2 = Array.from(new Set(allStratigys.map(a => a['विकासात्मक क्षेत्र 2'])))
    .map(devDom1 => {
      return allStratigys.find(a => a['विकासात्मक क्षेत्र 2'] === devDom1)
    });
  console.log(uniqueDevDom2);
  const handleSub = (e) => {
    setSelectSubject(e.target.value)
  }
  const handleGrade = (e) => {
    setSelectGrade(e.target.value)
  }
  const handleSkill = (e) => {
    setSelectSkill(e.target.value)
  }
  const handleTopic = (e) => {
    setSelectTopic(e.target.value)
  }
  const handleSubTopic = (e) => {
    setSelectSubTopic(e.target.value)
  }
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
  const handleSubmit = (e) => {
    e.preventDefault();
    if (e.target.subject.value === '' && e.target.grade.value === "" && e.target.skill.value === "" && e.target.topic.value === ""
      && e.target.sub_topic.value === "" && e.target.sub_sub_topic.value === "" && e.target.dev_dom_1.value === "" && e.target.dev_dom_2.value === ""
      && e.target.mode_of_teaching.value === "" && e.target.learning_outcome.value === "" && e.target.teaching_str.value === "") {
      setError(true)
    }
    else {
      setModalShow(true)
    }
    const data = {
      'User_id': user._id,
      'विषय': e.target.subject.value,
      'श्रेणी': e.target.grade.value,
      'कौशल': e.target.skill.value,
      'शीर्षक': e.target.topic.value,
      'उप शीर्षक': e.target.sub_topic.value,
      'उप-उप शीर्षक': e.target.sub_sub_topic.value,
      'विकासात्मक क्षेत्र 1': e.target.dev_dom_1.value,
      'विकासात्मक क्षेत्र 2': e.target.dev_dom_2.value,
      'शिक्षण का तरीका': e.target.mode_of_teaching.value,
      'शिक्षण के परिणाम': e.target.learning_outcome.value,
      'शिक्षण रणनीति': e.target.teaching_str.value,
      'Approve': false
    }
    setSubmitData(data)
  }
  return (
    <div>
      <ApproveReqModalHi
        show={modalShow}
        setModalShow={setModalShow}
        onHide={() => setModalShow(false)}
        data={submitData}
      />
      <div className='form-title'>
        <p>अपनी रणनीति जोड़ें</p>
      </div>
      <div className='center-div'>
        <form className='form-main-div' onSubmit={handleSubmit}>
          <div className='two-selects '>
            <div>
              <p className='select-title'>विषय <p>*</p></p>
              <select onChange={handleSub} className={'select-field'} name="subject" id="">
                <option value="" selected disabled>विषय</option>
                {
                  uniqueSubject?.map(res => (
                    <option>{res.विषय}</option>
                  ))
                }
              </select>
            </div>
            <div>
              <p className='select-title'>श्रेणी <p>*</p></p>
              <select onChange={handleGrade} className={'select-field'} name="grade" id="">
                <option value="" selected disabled>श्रेणी</option>
                {
                  uniqueGrade?.map(res => (
                    <option>{res.श्रेणी}</option>
                  ))
                }
              </select>
            </div>
          </div>
          <div className='two-selects '>
            <div>
              <p className='select-title'>कौशल <p>*</p></p>
              <select onChange={handleSkill} className={'select-field'} name="skill" id="">
                <option value="" selected disabled>कौशल</option>
                {
                  uniqueSkill?.map(res => (
                    <option>{res.कौशल}</option>
                  ))
                }
              </select>
            </div>
            <div>
              <p className='select-title'>शीर्षक <p>*</p></p>
              <select onChange={handleTopic} className={'select-field'} name="topic" id="">
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
              <select onChange={handleSubTopic} className={'select-field'} name="sub_topic" id="">
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
              <select className={'select-field'} name="sub_sub_topic" id="">
                <option value="" selected disabled >उप-उप शीर्षक</option>
                {
                  uniqueSubSubTopic?.map(res => (
                    <option>{res['उप-उप शीर्षक']}</option>
                  ))
                }
              </select>
            </div>
          </div>
          <div className='two-selects '>
            <div>
              <p className='select-title'>विकासात्मक क्षेत्र 1 <p>*</p></p>
              <select className={'select-field'} name="dev_dom_1" id="">
                <option value="" selected disabled>विकासात्मक क्षेत्र 1</option>
                {
                  uniqueDevDom1?.map(res => (
                    <option>{res['विकासात्मक क्षेत्र 1']}</option>
                  ))
                }
              </select>
            </div>
            <div>
              <p className='select-title'>विकासात्मक क्षेत्र 2 <p>*</p></p>
              <select className={'select-field'} name="dev_dom_2" id="">
                <option value="" selected disabled>विकासात्मक क्षेत्र 2</option>
                {
                  uniqueDevDom2?.map(res => (
                    <option>{res['विकासात्मक क्षेत्र 2']}</option>
                  ))
                }
              </select>
            </div>
          </div>
          <div className='two-selects '>
            <div>
              <p className='select-title'>शिक्षण का तरीका <p>*</p></p>
              <select className={'select-field'} name="mode_of_teaching" id="">
                <option>ऑनलाइन</option>
                <option>विद्यालय में</option>
              </select>
            </div>
          </div>
          <div className='one-selects'>
            <div>
              <p className='select-title'><p>*</p>शिक्षण के परिणाम</p>
              <select className={'select-field w-100'} name="learning_outcome" id="">
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
              <textarea className={'select-field-full-2'} name="teaching_str" id="" />
            </div>
          </div>
          <div className='d-flex justify-content-center mt-4'>
            {/* <p className='form-note'>Note - The strategy will be added post approval by admin</p> */}
            <button type='submit' className='form-btn'>अद्यतन रणनीति</button>
          </div>
          {/* {error ? <p className='form-success'>Thank you for submitting the strategy</p> */}
          {error && <p className='form-error'>Please fill all of the above fields !</p>}
        </form>
      </div>
    </div>
  );
};

export default AddFormHi;