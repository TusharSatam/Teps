import React from 'react';
import { Modal } from 'react-bootstrap';
import toast, { Toaster } from 'react-hot-toast';
import { getHindiStratigys, updateHindiStratigys } from '../../services/hindiStratigys';
import './dashboardModal.css'
const EditHindiStratigyModal = ({ show, onHide, data, setShow, setStratigys }) => {
  const handleUpdate = (e) => {
    e.preventDefault();
    const formData = {
      'विषय': e.target.subject.value,
      'श्रेणी': e.target.grade.value,
      'कौशल': e.target.skill.value,
      'शीर्षक': e.target.topic.value,
      'उप शीर्षक': e.target.sub_topic.value,
      'उप-उप शीर्षक': e.target.sub_sub_topic.value,
      'विकासात्मक क्षेत्र 1': e.target.dev_dom_1.value,
      'विकासात्मक क्षेत्र 2': e.target.dev_dom_2.value,
      'शिक्षण का तरीका': e.target.mode_ofteaching.value,
      'शिक्षण के परिणाम': e.target.learning_outcome.value,
      'शिक्षण रणनीति': e.target.teaching_sstrategy.value
    }
    updateHindiStratigys(data._id, formData)
      .then(res => {
        setShow(false)
        console.log(res);
        getHindiStratigys()
          .then(res => {
            setStratigys(res.data.posts);
          })
        toast.success('Update successfull!')
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
          <Modal.Title>Update Hindi Strategies</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className='d-flex justify-content-center'>
            <form className='ms-md-3 ms-xxl-5' onSubmit={handleUpdate}>
              <div className='input_div_modal'>
                <label htmlFor="">विषय </label> <br />
                <input className='signup_Input_modal' disabled defaultValue={data?.विषय} name='subject' placeholder='विषय' type="text" />
              </div>
              <div className='input_div_modal'>
                <label htmlFor="">श्रेणी</label> <br />
                <input className='signup_Input_modal' disabled defaultValue={data?.श्रेणी} name='grade' placeholder='श्रेणी' type="text" />
              </div>
              <div className='input_div_modal'>
                <label htmlFor="">कौशल</label> <br />
                <input className={"signup_Input_modal"} disabled defaultValue={data?.कौशल} name='skill' placeholder='कौशल' type="text" />
              </div>
              <div className='input_div_modal'>
                <label htmlFor="">शीर्षक </label> <br />
                <input className='signup_Input_modal' disabled defaultValue={data?.शीर्षक} name='topic' placeholder='शीर्षक' type="text" />
                <div className='input_div_modal'>
                  <label htmlFor="">उप शीर्षक </label> <br />
                  <input className='signup_Input_modal' disabled defaultValue={data ? data['उप शीर्षक'] : ''} name='sub_topic' placeholder='उप शीर्षक' type="text" />
                </div>
              </div>
              <div className='input_div_modal'>
                <label htmlFor="">उप-उप शीर्षक</label> <br />
                <input className='signup_Input_modal' disabled defaultValue={data ? data['उप-उप शीर्षक'] : ''} name='sub_sub_topic' placeholder='उप-उप शीर्षक' type="text" />
              </div>
              <div className='input_div_modal'>
                <label htmlFor="">विकासात्मक क्षेत्र 1 </label> <br />
                <input className='signup_Input_modal' disabled defaultValue={data ? data['विकासात्मक क्षेत्र 1'] : ''} name='dev_dom_1' placeholder='विकासात्मक क्षेत्र 1' type="text" />
              </div>
              <div className='input_div_modal'>
                <label htmlFor="">विकासात्मक क्षेत्र 2 </label> <br />
                <input className='signup_Input_modal' disabled defaultValue={data ? data['विकासात्मक क्षेत्र 2'] : ''} name='dev_dom_2' placeholder='विकासात्मक क्षेत्र 2' type="text" />
              </div>
              <div className='input_div_modal'>
                <label htmlFor="">शिक्षण का तरीका</label> <br />
                <input className='signup_Input_modal' disabled defaultValue={data ? data['शिक्षण का तरीका'] : ''} name='mode_ofteaching' placeholder='शिक्षण का तरीका' type="text" />
              </div>
              <div className='input_div_modal'>
                <label htmlFor="">शिक्षण के परिणाम</label> <br />
                <textarea className='signup_Input_modal' disabled defaultValue={data ? data['शिक्षण के परिणाम'] : ''} name='learning_outcome' placeholder='शिक्षण के परिणाम' type="text" />
              </div>
              <div className='input_div_modal'>
                <label htmlFor="">शिक्षण रणनीति</label> <br />
                <textarea className='signup_Input_modal' defaultValue={data ? data['शिक्षण रणनीति'] : ''} name='teaching_sstrategy' placeholder='शिक्षण रणनीति' type="text" />
              </div>
              <div className='d-flex justify-content-end my-3'>
                <button className='btn btn-primary'>Update</button>
              </div>
            </form>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default EditHindiStratigyModal;