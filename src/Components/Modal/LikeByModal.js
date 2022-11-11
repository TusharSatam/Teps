import React from 'react';
import { Button, Modal } from 'react-bootstrap';
import { FaHeart } from 'react-icons/fa';
import person from '../../asstes/Ellipse 4.png'
import clear from '../../asstes/icons/clear.png'

const LikeByModal = (props) => {
  const { show, handleClose, totalReact } = props;
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>
          <h4 className='modal-title' id="exampleModalLongTitle">Liked By <FaHeart className='like-icon' /></h4>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {
          totalReact.map((res, i) => (
            <div>{
              res.image ?
                <img className='label' style={{ width: "120px", borderRadius: '1000px' }} src={`data:${res?.image?.contentType};base64,${Buffer.from(res?.image?.data?.data).toString('base64')}`} alt="" />
                :
                <img src={person} alt="person pic" />
            }
              <p>{res.firstName}{res.lastName}</p>
            </div>
          ))
        }
      </Modal.Body>
    </Modal>
  );
};

export default LikeByModal;