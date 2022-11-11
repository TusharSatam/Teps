import React from 'react';
import './addForm.css';
import { FaHeart } from 'react-icons/fa';
import { useState } from 'react';
import { getAllStratigys } from '../../services/stratigyes';
import { useAuth } from '../../Context/AuthContext';
import { postUserStratigys } from '../../services/userStratigy';

const AddForm = () => {
  const { user } = useAuth()
  const [allStratigys, setAllStratigys] = React.useState([])
  React.useEffect(() => {
    getAllStratigys()
      .then(res => {
        setAllStratigys(res.data);
      })
  }, []);
  const uniqueSubject = Array.from(new Set(allStratigys.map(a => a.Subject)))
    .map(subject => {
      return allStratigys.find(a => a.Subject === subject)
    });

  const uniqueGrade = Array.from(new Set(allStratigys.map(a => a.Grade)))
    .map(grade => {
      return allStratigys.find(a => a.Grade === grade)
    });

  const uniqueSkill = Array.from(new Set(allStratigys.map(a => a.Skill)))
    .map(skill => {
      return allStratigys.find(a => a.Skill === skill)
    });

  const uniqueTopic = Array.from(new Set(allStratigys.map(a => a.Topic)))
    .map(topic => {
      return allStratigys.find(a => a.Topic === topic)
    });

  const uniqueSubTopic = Array.from(new Set(allStratigys.map(a => a['Sub Topic'])))
    .map(subtopic => {
      return allStratigys.find(a => a['Sub Topic'] === subtopic)
    });

  const uniqueSubSubTopic = Array.from(new Set(allStratigys.map(a => a['Sub-sub topic'])))
    .map(subsubtopic => {
      return allStratigys.find(a => a['Sub-sub topic'] === subsubtopic)
    });

  const uniqueDevDom1 = Array.from(new Set(allStratigys.map(a => a['Dev Dom 1'])))
    .map(devDom1 => {
      return allStratigys.find(a => a['Dev Dom 1'] === devDom1)
    });

  const uniqueDevDom2 = Array.from(new Set(allStratigys.map(a => a['Dev Dom 2'])))
    .map(devDom1 => {
      return allStratigys.find(a => a['Dev Dom 2'] === devDom1)
    });

  const uniqueOutcome = Array.from(new Set(allStratigys.map(a => a['Learning Outcome'])))
    .map(devDom1 => {
      return allStratigys.find(a => a['Learning Outcome'] === devDom1)
    });


  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      'User_id': user._id,
      'Subject': e.target.subject.value,
      'Grade': e.target.grade.value,
      'Skill': e.target.skill.value,
      'Topic': e.target.topic.value,
      'Sub Topic': e.target.sub_topic.value,
      'Sub-Sub Topic': e.target.sub_sub_topic.value,
      'Dev Dom 1': e.target.dev_dom_1.value,
      'Dev Dom 2': e.target.dev_dom_2.value,
      'Mode of Teaching': e.target.mode_of_teaching.value,
      'Learning Outcome': e.target.learning_outcome.value,
      'Teaching Strategy': e.target.teaching_str.value
    }
    postUserStratigys(data)
      .then(res => {
        console.log(res);
        e.target.reset()
      })
      .catch(err => console.log(err))
  }



  return (
    <div>
      <div className='form-title'>
        <p>Add Your Strategy</p>
      </div>
      <div className='center-div'>
        <form onSubmit={handleSubmit} className='form-main-div'>
          <div className='two-selects '>
            <div>
              <p className='select-title'>Subject <p>*</p></p>
              <select required className={'select-field'} name="subject" id="">
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
              <select required className={'select-field'} name="grade" id="">
                <option value="" selected disabled>Grade</option>
                {
                  uniqueGrade?.map(res => (
                    <option>{res.Grade}</option>
                  ))
                }
              </select>
            </div>
          </div>
          <div className='two-selects '>
            <div>
              <p className='select-title'>Skill <p>*</p></p>
              <select required className={'select-field'} name="skill" id="">
                <option value="" selected disabled>Skill</option>
                {
                  uniqueSkill?.map(res => (
                    <option>{res.Skill}</option>
                  ))
                }
              </select>
            </div>
            <div>
              <p className='select-title'>Topic <p>*</p></p>
              <select required className={'select-field'} name="topic" id="">
                <option value="" selected disabled>Topic</option>
                {
                  uniqueTopic?.map(res => (
                    <option>{res.Topic}</option>
                  ))
                }
              </select>
            </div>
          </div>
          <div className='two-selects '>
            <div>
              <p className='select-title'>Sub-Topic <p>*</p></p>
              <select required className={'select-field'} name="sub_topic" id="">
                <option value="" selected disabled>Sub-Topic</option>
                {
                  uniqueSubTopic?.map(res => (
                    <option>{res['Sub Topic']}</option>
                  ))
                }
              </select>
            </div>
            <div>
              <p className='select-title'>Sub-Sub-Topic <p>*</p></p>
              <select required className={'select-field'} name="sub_sub_topic" id="">
                <option value="" selected disabled>Sub-Sub-Topic</option>

                {
                  uniqueSubSubTopic?.map(res => (
                    <option>{res['Sub-sub topic']}</option>
                  ))
                }
              </select>
            </div>
          </div>
          <div className='two-selects '>
            <div>
              <p className='select-title'>Dev Dom 1 <p>*</p></p>
              <select required className={'select-field'} name="dev_dom_1" id="">
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
              <select required className={'select-field'} name="dev_dom_2" id="">
                <option value="" selected disabled>Dev Dom 2</option>
                {
                  uniqueDevDom2?.map(res => (
                    <option>{res['Dev Dom 2']}</option>
                  ))
                }
              </select>
            </div>
          </div>
          <div className='two-selects '>
            <div>
              <p className='select-title'>Mode Of Teaching <p>*</p></p>
              <select required className={'select-field'} name="mode_of_teaching" id="">
                <option>Online</option>
                <option>Offline</option>
              </select>
            </div>
          </div>
          <div className='one-selects'>
            <div>
              <p className='select-title'><p>*</p>Learning Outcome</p>
              <select required className={'select-field w-100'} name="learning_outcome" id="">
                <option value="" selected disabled>Learning Outcome</option>
                {
                  uniqueOutcome?.map(res => (
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
          <div className='form-footer'>
            <p className='form-note'>Note - The strategy will be added post approval by admin</p>
            <button type='submit' className='form-btn'>Submit Strategy</button>
          </div>
          {/* {!error ? <p className='form-success'>Thank you for submitting the strategy</p>
            : <p className='form-error'>Please fill all of the above fields !</p>} */}
        </form>
      </div>
    </div>
  );
};

export default AddForm;