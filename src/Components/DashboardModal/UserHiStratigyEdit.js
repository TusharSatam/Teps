import React from 'react';
import { Modal } from 'react-bootstrap';
import toast, { Toaster } from 'react-hot-toast';
import { useAuth } from '../../Context/AuthContext';
import { getAllHindiStratigys } from '../../services/hindiStratigys';
import { getUserStratigysHi, updateUserStratigysHi } from '../../services/userStratigyHi';

import './dashboardModal.css'

const UserHiStratigyEdit = ({ show, onHide, data, setShow, setStratigys }) => {
  const [allStratigys, setAllStratigys] = React.useState([])
  //---------------------------------------------------------
  const [selectSubject, setSelectSubject] = React.useState(data ? data.विषय : '')
  const [selectGrade, setSelectGrade] = React.useState(data ? data.श्रेणी : '')
  const [selectTopic, setSelectTopic] = React.useState(data ? data.शीर्षक : "")
  const [selectSkill, setSelectSkill] = React.useState(data ? data['प्रमुख शीर्षक'] : '')
  const [selectSubTopic, setSelectSubTopic] = React.useState(data ? data['उप शीर्षक'] : '')
  const { user } = useAuth()

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
  const uniqueDevDom2 = Array.from(new Set(allStratigys.map(a => a['विकासात्मक क्षेत्र 2'])))
    .map(devDom1 => {
      return allStratigys.find(a => a['विकासात्मक क्षेत्र 2'] === devDom1)
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
    return creature.विषय === selectSubject && creature.श्रेणी === selectGrade;
  })
  const uniqueSkill = Array.from(new Set(aquaticCreatures?.map(a => a['प्रमुख शीर्षक'])))
    .map(skill => {
      return aquaticCreatures?.find(a => a['प्रमुख शीर्षक'] === skill)
    });
  const aquaticCreaturesSkill = allStratigys.filter(function (creature) {
    return creature.विषय === selectSubject && creature.श्रेणी === selectGrade && creature['प्रमुख शीर्षक'] === selectSkill;
  })
  const uniqueTopic = Array.from(new Set(aquaticCreaturesSkill?.map(a => a.शीर्षक)))
    .map(topic => {
      return aquaticCreaturesSkill?.find(a => a.शीर्षक === topic)
    });
  const aquaticCreaturesTopic = allStratigys.filter(function (creature) {
    return creature.विषय === selectSubject && creature.श्रेणी === selectGrade && creature['प्रमुख शीर्षक'] === selectSkill && creature.शीर्षक === selectTopic;
  })

  const uniqueSubTopic = Array.from(new Set(aquaticCreaturesTopic?.map(a => a['उप शीर्षक'])))
    .map(sub_topic => {
      return aquaticCreaturesTopic?.find(a => a['उप शीर्षक'] === sub_topic)
    });
  const aquaticCreaturesSubTopic = allStratigys.filter(function (creature) {
    return creature.विषय === selectSubject && creature.श्रेणी === selectGrade && creature.शीर्षक === selectTopic && creature['प्रमुख शीर्षक'] === selectSkill && creature['उप शीर्षक'] === selectSubTopic;
  })
  const uniqueSubSubTopic = Array.from(new Set(aquaticCreaturesSubTopic?.map(a => a['उप-उप शीर्षक'])))
    .map(sub_sub_topic => {
      return aquaticCreaturesSubTopic?.find(a => a['उप-उप शीर्षक'] === sub_sub_topic)
    });

  const handleSubmit = (e) => {
    e.preventDefault()
    const dataa = {
      'विषय': e.target.subject.value,
      'श्रेणी': e.target.grade.value,
      'प्रमुख शीर्षक': e.target.skill.value,
      'शीर्षक': e.target.topic.value,
      'उप शीर्षक': e.target.sub_topic.value,
      'उप-उप शीर्षक': e.target.sub_sub_topic.value,
      'शिक्षण के परिणाम': e.target.learning_outcome.value,
      'शिक्षण रणनीति': e.target.teaching_str.value
    }
    updateUserStratigysHi(data?._id, dataa)
      .then(res => {
        res && toast.success("Strategy Updated")
        res && setShow(false);
        getUserStratigysHi()
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
          <Modal.Title>Update Hindi Strategy</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className='center-div'>
            <form className='form-main-div' onSubmit={handleSubmit}>
              <div className='mt-2 '>
                <div>
                  <p className='select-title'>विषय <p>*</p></p>
                  <select defaultValue={data.विषय} onChange={handleSub} className={'select-field'} name="subject" id="">
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
                  <select defaultValue={data.श्रेणी} onChange={handleGrade} className={'select-field'} name="grade" id="">
                    <option value="" selected disabled>श्रेणी</option>
                    {
                      uniqueGrade?.map(res => (
                        <option>{res.श्रेणी}</option>
                      ))
                    }
                  </select>
                </div>
              </div>
              <div className='mt-2 '>
                <div>
                  <p className='select-title'>प्रमुख शीर्षक <p>*</p></p>
                  <select defaultValue={data['प्रमुख शीर्षक']} onChange={handleSkill} className={'select-field'} name="skill" id="">
                    <option value={data['प्रमुख शीर्षक']}>{data['प्रमुख शीर्षक']}</option>
                    {
                      uniqueSkill?.map(res => (
                        <option>{res['प्रमुख शीर्षक']}</option>
                      ))
                    }
                  </select>
                </div>
                <div>
                  <p className='select-title'>शीर्षक <p>*</p></p>
                  <select defaultValue={data.शीर्षक} onChange={handleTopic} className={'select-field'} name="topic" id="">
                    <option value={data.शीर्षक} >{data.शीर्षक}</option>
                    {
                      uniqueTopic?.map(res => (
                        <option>{res.शीर्षक}</option>
                      ))
                    }
                  </select>
                </div>
              </div>
              <div className='mt-2 '>
                <div>
                  <p className='select-title'>उप शीर्षक <p>*</p></p>
                  <select defaultValue={data['उप शीर्षक']} onChange={handleSubTopic} className={'select-field'} name="sub_topic" id="">
                    <option value={data['उप शीर्षक']} >{data['उप शीर्षक']}</option>
                    {
                      uniqueSubTopic?.map(res => (
                        <option>{res['उप शीर्षक']}</option>
                      ))
                    }
                  </select>
                </div>
                <div>
                  <p className='select-title'>उप-उप शीर्षक <p>*</p></p>
                  <select defaultValue={data['उप-उप शीर्षक']} className={'select-field'} name="sub_sub_topic" id="">
                    <option value={data['उप-उप शीर्षक']} >{data['उप-उप शीर्षक']}</option>
                    {
                      uniqueSubSubTopic?.map(res => (
                        <option>{res['उप-उप शीर्षक']}</option>
                      ))
                    }
                  </select>
                </div>
              </div>
              <div className='mt-2'>
                <div>
                  <p className='select-title'><p>*</p>शिक्षण के परिणाम</p>
                  <select defaultValue={data['शिक्षण के परिणाम']} className={'select-field w-100'} name="learning_outcome" id="">
                    <option value={data['शिक्षण के परिणाम']} >{data['शिक्षण के परिणाम']}</option>
                    {
                      uniqueSubSubTopic?.map(res => (
                        <option>{res['शिक्षण के परिणाम']}</option>
                      ))
                    }
                  </select>
                </div>
              </div>
              <div className='mt-2-l'>
                <div>
                  <p className='select-title'>शिक्षण रणनीति <p>*</p></p>
                  <textarea defaultValue={data['शिक्षण रणनीति']} className={'select-field-full-2'} name="teaching_str" id="" />
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

export default UserHiStratigyEdit;