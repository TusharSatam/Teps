import React from 'react';
import './addForm.css';
import { FaHeart } from 'react-icons/fa';
import { useState } from 'react';
import { getAllStratigys } from '../../services/stratigyes';
import { useAuth } from '../../Context/AuthContext';
import { postUserStratigys } from '../../services/userStratigy';
import AproveReqModal from '../Modal/AproveReqModal';
import AddFormHi from './AddFormHi';

const AddForm = () => {
  const { user } = useAuth()
  const [allStratigys, setAllStratigys] = React.useState([])
  //---------------------------------------------------------
  const [selectSubject, setSelectSubject] = React.useState()
  const [selectGrade, setSelectGrade] = React.useState()
  const [selectTopic, setSelectTopic] = React.useState()
  const [selectSkill, setSelectSkill] = React.useState()
  const [selectSubTopic, setSelectSubTopic] = React.useState()
  const [selectSubSubTopic, setSelectSubSubTopic] = React.useState()
  const [selectLearningOutcome, setSelectLearningOutcome] = React.useState()
  //-----------------------------------------------------------------
  const [modalShow, setModalShow] = React.useState(false);
  const [languageSelect, setLanguageSelect] = React.useState("en")
  const [error, setError] = useState(false);
  const [submitData, setSubmitData] = useState({})
  const language = localStorage.getItem("i18nextLng")
  React.useEffect(() => {
    if (language === "hi") {
      setLanguageSelect("hi")
    }
    else {
      setLanguageSelect("en")
    }
  }, [language])


  React.useEffect(() => {
    getAllStratigys()
      .then(res => {
        setAllStratigys(res.data);
      })
  }, []);




  // english stratiges--------------------------------------------------------
  const uniqueSubject = Array.from(new Set(allStratigys.map(a => a.Subject)))
    .map(subject => {
      return allStratigys.find(a => a.Subject === subject)
    });

  const uniqueGrade = Array.from(new Set(allStratigys.map(a => a.Grade)))
    .map(grade => {
      return allStratigys.find(a => a.Grade === grade)
    });

  const uniqueDevDom1 = Array.from(new Set(allStratigys.map(a => a['Dev Dom 1'])))
    .map(devDom1 => {
      return allStratigys.find(a => a['Dev Dom 1'] === devDom1)
    });

  const uniqueDevDom2 = Array.from(new Set(allStratigys.map(a => a['Dev Dom 2'])))
    .map(devDom1 => {
      return allStratigys.find(a => a['Dev Dom 2'] === devDom1)
    });

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
  const handleSubSubTopic = (e) => {
    setSelectSubSubTopic(e.target.value)
  }
  const handleLearningOutcome = (e) => {
    setSelectLearningOutcome(e.target.value)
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
      'Subject': e.target.subject.value,
      'Grade': e.target.grade.value,
      'Skill': e.target.skill.value,
      'Topic': e.target.topic.value,
      'Sub Topic': e.target.sub_topic.value,
      'Sub-sub topic': e.target.sub_sub_topic.value,
      'Dev Dom 1': e.target.dev_dom_1.value,
      'Dev Dom 2': e.target.dev_dom_2.value,
      'Mode of Teaching': e.target.mode_of_teaching.value,
      'Learning Outcome': e.target.learning_outcome.value,
      'Teaching Strategy': e.target.teaching_str.value,
      'Approve': false
    }
    setSubmitData(data)

  }

  return (
    <div>

      {
        languageSelect === "en" ?
          <>
            <AproveReqModal
              show={modalShow}
              setModalShow={setModalShow}
              onHide={() => setModalShow(false)}
              data={submitData}
            />
            <div className='form-title'>
              <p>Add Your Strategy</p>
            </div>
            <div className='center-div'>
              <form onSubmit={handleSubmit} className='form-main-div'>
                <div className='two-selects '>
                  <div>
                    <p className='select-title'>Subject <p>*</p></p>
                    <select required onChange={handleSub} className={'select-field'} name="subject" id="">
                      <option value="" selected disabled>Subject</option>
                      {
                        uniqueSubject?.filter(res => res.Subject !== undefined).map(res => (
                          <option>{res.Subject !== "" && res.Subject}</option>
                        ))
                      }
                    </select>
                  </div>
                  <div>
                    <p className='select-title'>Grade <p>*</p></p>
                    <select required onChange={handleGrade} className={'select-field'} name="grade" id="">
                      <option value="" selected disabled>Grade</option>
                      {
                        uniqueGrade?.filter(res => res.Grade !== undefined).map(res => (
                          <option>{res.Grade}</option>
                        ))
                      }
                    </select>
                  </div>
                </div>
                <div className='two-selects '>
                  <div>
                    <p className='select-title'>Skill <p>*</p></p>
                    <select required onChange={handleSkill} className={'select-field'} name="skill" id="">
                      <option value="" selected disabled>Skill</option>
                      {
                        uniqueSkill?.filter(res => res.Skill !== undefined).map(res => (
                          <option>{res.Skill}</option>
                        ))
                      }
                    </select>
                  </div>
                  <div>
                    <p className='select-title'>Topic <p>*</p></p>
                    <select required onChange={handleTopic} className={'select-field'} name="topic" id="">
                      <option value="" selected disabled>Topic</option>
                      {
                        uniqueTopic?.filter(res => res.Topic !== undefined).map(res => (
                          <option>{res.Topic}</option>
                        ))
                      }
                    </select>
                  </div>
                </div>
                <div className='two-selects '>
                  <div>
                    <p className='select-title'>Sub-Topic <p>*</p></p>
                    <select required onChange={handleSubTopic} className={'select-field'} name="sub_topic" id="">
                      <option value="" selected disabled>Sub-Topic</option>
                      {
                        uniqueSubTopic?.filter(res => res['Sub Topic'] !== undefined).map(res => (
                          <option>{res['Sub Topic']}</option>
                        ))
                      }
                    </select>
                  </div>
                  <div>
                    <p className='select-title'>Sub-Sub-Topic <p>*</p></p>
                    <select required onChange={handleSubSubTopic} className={'select-field'} name="sub_sub_topic" id="">
                      <option value="" selected disabled>Sub-Sub-Topic</option>

                      {
                        uniqueSubSubTopic?.filter(res => res['Sub-sub topic'] !== undefined).map(res => (
                          <option>{res['Sub-sub topic']}</option>
                        ))
                      }
                    </select>
                  </div>
                </div>
                <div className='two-selects '>
                  <div>
                    <p className='select-title'>Dev Dom 1 <p>*</p></p>

                    <select required className={'select-field'} name="dev_dom_1" id="" placeholder=''>
                      <option value="" selected disabled>Dev Dom 1</option>
                      <option>Cognitive Sensory</option>
                      <option>Motor-Physical</option>
                      {/*                       
                      {
                        uniqueDevDom1?.filter(res => res['Dev Dom 1'] !== "").map(res => (
                          <option>{res['Dev Dom 1'] !== undefined && res['Dev Dom 1']}
                          </option>
                        ))
                      } */}
                    </select>
                  </div>
                  <div>
                    <p className='select-title'>Dev Dom 2 <p>*</p></p>
                    <select required className={'select-field'} name="dev_dom_2" id="">
                      <option value="" selected disabled>Dev Dom 2</option>
                      <option>Socio-Emotional-Ethical</option>
                      <option>Language & Communication</option>
                      {/* {
                        uniqueDevDom2?.filter(res => res['Dev Dom 2'] !== undefined).map(res => (
                          <option>{res['Dev Dom 2']}</option>
                        ))
                      } */}
                    </select>
                  </div>
                </div>
                <div className='two-selects '>
                  <div>
                    <p className='select-title'>Mode Of Teaching <p>*</p></p>
                    <select required className={'select-field'} name="mode_of_teaching" id="">
                      <option value="" selected disabled>Mode Of Teaching</option>
                      <option>Online</option>
                      <option>Offline</option>
                    </select>
                  </div>
                </div>
                <div className='one-selects'>
                  <div>
                    <p className='select-title'><p>*</p>Learning Outcome</p>
                    <select required onChange={handleLearningOutcome} className={'select-field w-100'} name="learning_outcome" id="">
                      <option value="" selected disabled>Learning Outcome</option>
                      {
                        uniqueSubSubTopic?.filter(res => res['Learning Outcome'] !== undefined).map(res => (
                          <option>{res['Learning Outcome']}</option>
                        ))
                      }
                    </select>
                  </div>
                </div>
                <div className='one-selects-l'>
                  <div>
                    <p className='select-title'>Teaching Strategy <p>*</p></p>
                    <textarea required className={'select-field-full-2'} name="teaching_str" id="" />
                  </div>
                </div>
                <div className='d-flex justify-content-center mt-4'>
                  {/* <p className='form-note'>Note - The strategy will be added post approval by admin</p> */}
                  <button type='submit' className='form-btn'>Submit Strategy</button>
                </div>
                {/* {error ? <p className='form-success'>Thank you for submitting the strategy</p> */}
                {error && <p className='form-error'>Please fill all of the above fields !</p>}
              </form>
            </div>
          </> :
          <AddFormHi />

      }

    </div>
  );
};

export default AddForm;