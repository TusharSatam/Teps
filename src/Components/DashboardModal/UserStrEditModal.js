import React from 'react';
import { Modal } from 'react-bootstrap';
import toast, { Toaster } from 'react-hot-toast';
import { useAuth } from '../../Context/AuthContext';
import { getAllStratigys, getStratigys, updateStratigys } from '../../services/stratigyes';
import { updateUserStratigys, delApproveUserStratigys } from '../../services/userStratigy';

import './dashboardModal.css'

const UserStrEditModal = ({ show, onHide, data, setShow, setStratigys }) => {
  const [allStratigys, setAllStratigys] = React.useState([])
  //---------------------------------------------------------
  const [selectSubject, setSelectSubject] = React.useState(data ? data.Subject : '')
  const [selectGrade, setSelectGrade] = React.useState(data ? data.Grade : '')
  const [selectTopic, setSelectTopic] = React.useState(data ? data.Topic : "")
  const [selectSkill, setSelectSkill] = React.useState(data ? data.Skill : '')
  const [selectSubTopic, setSelectSubTopic] = React.useState(data ? data['Sub Topic'] : '')
  const { user } = useAuth()

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
    e.preventDefault()
    const dataa = {
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
      'Approve': true
    }
    updateUserStratigys(data?._id, dataa)
      .then(res => {
        res && toast.success("Strategy Updated")
        res && setShow(false)
      })
  }

  return (
    <div>
      <Toaster
        position="top-right"
        reverseOrder={false}
      />
      <Modal
        show={show}
        onHide={onHide}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Update English Strategy</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className='center-div'>
            <form className='form-main-div' onSubmit={handleSubmit}>
              <div className='mt-2 '>
                <div>
                  <p className='select-title'>Subject <p>*</p></p>
                  <select defaultValue={data.Subject} onChange={handleSub} className={'select-field'} name="subject" id="">
                    <option value="" selected disabled>Subject</option>
                    {
                      uniqueSubject?.map(res => (
                        <option>{res.Subject}</option>
                      ))
                    }
                  </select>
                </div>
                <div>
                  <p className='select-title'>Grade <p>*</p></p>
                  <select defaultValue={data.Grade} onChange={handleGrade} className={'select-field'} name="grade" id="">
                    <option value="" selected disabled>Grade</option>
                    {
                      uniqueGrade?.map(res => (
                        <option>{res.Grade}</option>
                      ))
                    }
                  </select>
                </div>
              </div>
              <div className='mt-2 '>
                <div>
                  <p className='select-title'>Skill <p>*</p></p>
                  <select defaultValue={data.Skill} onChange={handleSkill} className={'select-field'} name="skill" id="">
                    <option value={data.Skill}>{data.Skill}</option>
                    {
                      uniqueSkill?.map(res => (
                        <option>{res.Skill}</option>
                      ))
                    }
                  </select>
                </div>
                <div>
                  <p className='select-title'>Topic <p>*</p></p>
                  {data.Topic}
                  <select defaultValue={data.Topic} onChange={handleTopic} className={'select-field'} name="topic" id="">
                    <option value={data.Topic} >{data.Topic}</option>
                    {
                      uniqueTopic?.map(res => (
                        <option>{res.Topic}</option>
                      ))
                    }
                  </select>
                </div>
              </div>
              <div className='mt-2 '>
                <div>
                  <p className='select-title'>Sub-Topic <p>*</p></p>
                  <select defaultValue={data['Sub Topic']} onChange={handleSubTopic} className={'select-field'} name="sub_topic" id="">
                    <option value={data['Sub Topic']} >{data['Sub Topic']}</option>
                    {
                      uniqueSubTopic?.map(res => (
                        <option>{res['Sub Topic']}</option>
                      ))
                    }
                  </select>
                </div>
                <div>
                  <p className='select-title'>Sub-Sub-Topic <p>*</p></p>
                  <select defaultValue={data['Sub-sub topic']} className={'select-field'} name="sub_sub_topic" id="">
                    <option value={data['Sub-sub topic']} >{data['Sub-sub topic']}</option>
                    {
                      uniqueSubSubTopic?.map(res => (
                        <option>{res['Sub-sub topic']}</option>
                      ))
                    }
                  </select>
                </div>
              </div>
              <div className='mt-2 '>
                <div>
                  <p className='select-title'>Dev Dom 1 <p>*</p></p>
                  <select defaultValue={data['Dev Dom 1']} className={'select-field'} name="dev_dom_1" id="">
                    <option value="" selected disabled>Dev Dom 1</option>
                    {
                      uniqueDevDom1?.map(res => (
                        <option>{res['Dev Dom 1']}</option>
                      ))
                    }
                  </select>
                </div>
                <div>
                  <p className='select-title'>Dev Dom 2 <p>*</p></p>
                  <select defaultValue={data['Dev Dom 2']} className={'select-field'} name="dev_dom_2" id="">
                    <option value="" selected disabled>Dev Dom 2</option>
                    {
                      uniqueDevDom2?.map(res => (
                        <option>{res['Dev Dom 2']}</option>
                      ))
                    }
                  </select>
                </div>
              </div>
              <div className='mt-2 '>
                <div>
                  <p className='select-title'>Mode Of Teaching <p>*</p></p>
                  <select defaultValue={data['Mode of Teaching']} className={'select-field'} name="mode_of_teaching" id="">
                    <option>Online</option>
                    <option>Offline</option>
                  </select>
                </div>
              </div>
              <div className='mt-2'>
                <div>
                  <p className='select-title'><p>*</p>Learning Outcome</p>
                  <select defaultValue={data['Learning Outcome']} className={'select-field w-100'} name="learning_outcome" id="">
                    <option value={data['Learning Outcome']} >{data['Learning Outcome']}</option>
                    {
                      uniqueSubSubTopic?.map(res => (
                        <option>{res['Learning Outcome']}</option>
                      ))
                    }
                  </select>
                </div>
              </div>
              <div className='mt-2-l'>
                <div>
                  <p className='select-title'>Teaching Strategy <p>*</p></p>
                  <textarea defaultValue={data['Teaching Strategy']} className={'select-field-full-2'} name="teaching_str" id="" />
                </div>
              </div>
              <div className='d-flex justify-content-center mt-4'>
                {/* <p className='form-note'>Note - The strategy will be added post approval by admin</p> */}
                <button type='submit' className='form-btn'>Update Strategy</button>
              </div>
              {/* {error ? <p className='form-success'>Thank you for submitting the strategy</p> */}
              {/* {error && <p className='form-error'>Please fill all of the above fields !</p>} */}
            </form>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default UserStrEditModal;