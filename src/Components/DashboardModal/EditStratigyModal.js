import React, { useEffect } from 'react';
import { Modal } from 'react-bootstrap';
import toast, { Toaster } from 'react-hot-toast';
import { getStratigys, updateStratigys } from '../../services/stratigyes';
import './dashboardModal.css'
import { useAuth } from '../../Context/AuthContext';

const EditStratigyModal = ({ show, onHide, data, setShow, setStratigys }) => {
  const handleUpdate = (e) => {
    e.preventDefault();
     // Log all form field names and values
  for (let i = 0; i < e.target.elements.length; i++) {
    const element = e.target.elements[i];
    console.log(`Field Name: ${element.name}, Field Value: ${element.value}`);
  }
    // Create an object to hold the form data
    const formData = {
      Subject: e.target.elements.subject.value,
      Grade: e.target.elements.grade.value,
      'Super Topic': e.target.elements.Super_Topic.value,
      Topic: e.target.elements.topic.value,
      'Sub Topic': e.target.elements.sub_topic.value,
      'Sub-sub topic': e.target.elements.sub_sub_topic.value,
      'Learning Outcome': e.target.elements.learning_outcome.value,
      'Teaching Strategy': e.target.elements.teaching_sstrategy.value,
    };
    
    updateStratigys(data._id, formData)
      .then(res => {
        setShow(false);
        getStratigys()
          .then(res => {
            setStratigys(res?.data?.posts);
          });
        toast.success('Update successful!', {
          duration: 4000
        });
      });
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
          <div className='d-flex justify-content-center'>
            <form className='ms-md-3 ms-xxl-5' onSubmit={handleUpdate}>
              <div className='input_div_modal'>
                <label htmlFor="">Subject </label> <br />
                <input className='signup_Input_modal' disabled defaultValue={data?.Subject} name='subject' placeholder='Subject' type="text" />
              </div>
              <div className='input_div_modal'>
                <label htmlFor="">Grade</label> <br />
                <input className='signup_Input_modal' disabled defaultValue={data?.Grade} name='grade' placeholder='Grade' type="text" />
              </div>
              <div className='input_div_modal'>
                <label htmlFor="">Super Topic</label> <br />
                <input className={"signup_Input_modal"} disabled defaultValue={data?.['Super Topic']} name='Super_Topic' placeholder='Super Topic' type="text" />
              </div>
              <div className='input_div_modal'>
                <label htmlFor="">Topic </label> <br />
                <input className='signup_Input_modal' disabled defaultValue={data?.Topic} name='topic' placeholder='Topic' type="text" />
                <div className='input_div_modal'>
                  <label htmlFor="">Sub Topic </label> <br />
                  <input className='signup_Input_modal' disabled defaultValue={data ? data['Sub Topic'] : ''} name='sub_topic' placeholder='Sub Topic' type="text" />
                </div>
              </div>
              <div className='input_div_modal'>
                <label htmlFor="">Sub-sub topic </label> <br />
                <input className='signup_Input_modal' disabled defaultValue={data ? data['Sub-sub topic'] : ''} name='sub_sub_topic' placeholder='Sub-sub topic' type="text" />
              </div>
              <div className='input_div_modal'>
                <label htmlFor="">Learning Outcome </label> <br />
                <textarea className='signup_Input_modal' disabled defaultValue={data ? data['Learning Outcome'] : ''} name='learning_outcome' placeholder='Learning Outcome' type="text" />
              </div>
              <div className='input_div_modal'>
                <label htmlFor="">Teaching Strategy </label> <br />
                <textarea className='signup_Input_modal' rows="8" defaultValue={data ? data['Teaching Strategy'] : ''} name='teaching_sstrategy' placeholder='Teaching Strategy' type="text" />
              </div>
              <div className='d-flex justify-content-end my-3'>
                <button className='btn btn-primary'>Update Strategy</button>
              </div>
            </form>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default EditStratigyModal;