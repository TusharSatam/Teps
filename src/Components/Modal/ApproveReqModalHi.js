import React from 'react';
import { Button, Modal } from 'react-bootstrap';
import toast, { Toaster } from 'react-hot-toast';
import { postUserStratigysHi } from '../../services/userStratigyHi';
import './modal.css'
const ApproveReqModalHi = (props) => {

  const handleAccept = () => {
    postUserStratigysHi(props.data)
      .then(res => {
        res && toast.success('Request Sent!', {
          duration: 4000
        });
        props.setModalShow(false)
      })
  }
  return (
    <div>
      <Toaster
        position="top-right"
        reverseOrder={false}
      />
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <span onClick={props.onHide} style={{ cursor: "pointer" }} className="text-end pe-5 pt-4">&#10005;</span>
        <Modal.Body className='px-4'>
          <p className='re_mod_title'>अपनी शिक्षण रणनीति अपलोड करने के लिए धन्यवाद। <br />
            शिक्षण समुदाय में आपके योगदान की सराहना की जाती है।
          </p>
          <div className='mod_body'>
            <p className='ms-3'>कृपया ध्यान दें: </p>
            <ol>
              <li>थिंग्स एजुकेशन के एडमिनिस्ट्रेटर के अनुमोदन के अधीन आपकी रणनीति अपलोड की जाएगी। </li>
              <li> अनुमोदन से पहले सटीकता और भाषा के लिए आपकी रणनीति को संशोधित किया जा सकता है।</li>
              <li> आपकी रणनीति, एक बार स्वीकृत हो जाने के बाद, सार्वजनिक डोमेन में डाल दी जाएगी और टीईपीएस समुदाय के सभी सदस्यों के लिए सुलभ होगी।</li>
            </ol>
          </div>
          <div className='d-flex justify-content-center my-4'>
            <div>
              <button onClick={handleAccept} className='accept_btn'>स्वीकार करना</button>
            </div>
            <div>
              <button onClick={props.onHide} className='cancel_btn'>रद्द करना</button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default ApproveReqModalHi;