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
      'प्रमुख शीर्षक': e.target.skill.value,
      'शीर्षक': e.target.topic.value,
      'उप शीर्षक': e.target.sub_topic.value,
      'उप-उप शीर्षक': e.target.sub_sub_topic.value,
      'शिक्षण के परिणाम': e.target.learning_outcome.value,
      'शिक्षण रणनीति': e.target.teaching_sstrategy.value
    }
    updateHindiStratigys(data._id, formData)
      .then(res => {
        setShow(false)
        getHindiStratigys()
          .then(res => {
            setStratigys(res.data.posts);
          })
        toast.success('Update successfull!', {
          duration: 4000
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
                <label htmlFor="">प्रमुख शीर्षक</label> <br />
                <input className={"signup_Input_modal"} disabled defaultValue={data?.['प्रमुख शीर्षक']} name='skill' placeholder='प्रमुख शीर्षक' type="text" />
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