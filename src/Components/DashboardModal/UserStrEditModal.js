import React from 'react';
import { Modal } from 'react-bootstrap';
import toast, { Toaster } from 'react-hot-toast';
import { useAuth } from '../../Context/AuthContext';
import { getAllStratigys, getStratigys, updateStratigys } from '../../services/stratigyes';
import { updateUserStratigys, delApproveUserStratigys, getUserStratigys } from '../../services/userStratigy';

import './dashboardModal.css'

const UserStrEditModal = ({ show, onHide, data, setShow, setStratigys }) => {
  const [allStratigys, setAllStratigys] = React.useState([])
  //---------------------------------------------------------
  const [selectSubject, setSelectSubject] = React.useState(data ? data.Subject : '')
  const [selectGrade, setSelectGrade] = React.useState(data ? data.Grade : '')
  const [selectTopic, setSelectTopic] = React.useState(data ? data.Topic : "")
  const [selectSuperTopic, setSelectSuperTopic] = React.useState(data ? data['Super Topic'] : '')
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
  const handleSuperTopic = (e) => {
    setSelectSuperTopic(e.target.value)
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
  const uniqueSupeTopic = Array.from(new Set(aquaticCreatures?.map(a => a['Super Topic'])))
    .map(SuperTopic => {
      return aquaticCreatures?.find(a =>a['Super Topic'] === SuperTopic)
    });
  const aquaticCreaturesSuperTopic = allStratigys.filter(function (creature) {
    return creature.Subject === selectSubject && creature.Grade === selectGrade && creature['Super Topic'] === selectSuperTopic;
  })
  const uniqueTopic = Array.from(new Set(aquaticCreaturesSuperTopic?.map(a => a.Topic)))
    .map(topic => {
      return aquaticCreaturesSuperTopic?.find(a => a.Topic === topic)
    });

  const aquaticCreaturesTopic = allStratigys.filter(function (creature) {
    return creature.Subject === selectSubject && creature.Grade === selectGrade && creature['Super Topic'] === selectSuperTopic && creature.Topic === selectTopic;
  })

  const uniqueSubTopic = Array.from(new Set(aquaticCreaturesTopic?.map(a => a['Sub Topic'])))
    .map(sub_topic => {
      return aquaticCreaturesTopic?.find(a => a['Sub Topic'] === sub_topic)
    });
  const aquaticCreaturesSubTopic = allStratigys.filter(function (creature) {
    return creature.Subject === selectSubject && creature.Grade === selectGrade && creature['Super Topic'] === selectSuperTopic && creature['Sub Topic'] === selectSubTopic;
  })
  const uniqueSubSubTopic = Array.from(new Set(aquaticCreaturesSubTopic?.map(a => a['Sub-sub topic'])))
    .map(sub_sub_topic => {
      return aquaticCreaturesSubTopic?.find(a => a['Sub-sub topic'] === sub_sub_topic)
    });
  const handleSubmit = (e) => {
    e.preventDefault()
    const dataa = {
      'Subject': e.target.subject.value,
      'Grade': e.target.grade.value,
      'Super Topic': e.target.SuperTopic.value,
      'Topic': e.target.topic.value,
      'Sub Topic': e.target.sub_topic.value,
      'Sub-sub topic': e.target.sub_sub_topic.value,
      'Learning Outcome': e.target.learning_outcome.value,
      'Teaching Strategy': e.target.teaching_str.value
    }
    updateUserStratigys(data?._id, dataa)
      .then(res => {
        res && toast.success("Strategy Updated");
        res && setShow(false);
        getUserStratigys()
          .then(res => {
            setStratigys(res.data?.filter(res => res.Approve === false))
          })
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
     
              </div>
              <div className='mt-2 '>
                <div>
                  <p className='select-title'>Super Topic<p>*</p></p>
                  <select defaultValue={data['Super Topic']} onChange={handleSuperTopic} className={'select-field'} name="SuperTopic" id="">
                    <option value={data['Super Topic']}>{data['Super Topic']}</option>
                    {
                      uniqueSupeTopic?.map(res => (
                        <option>{res['Super Topic']}</option>
                      ))
                    }
                  </select>
                </div>
                <div>
                  <p className='select-title'>Topic <p>*</p></p>
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
                <button type='submit' className='form-btn'>Update Strategy</button>
              </div>
            </form>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default UserStrEditModal;