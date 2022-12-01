import React from 'react';
import { Modal } from 'react-bootstrap';
import { FaHeart } from 'react-icons/fa';
import UserImage from '../../asstes/Group 51.svg'
import { Buffer } from 'buffer';

const LikeByModal = (props) => {
  const { show, handleClose, totalReact } = props;
  return (
    <Modal className='like-modal' show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>
          <h4 className='like-title' id="exampleModalLongTitle">Liked By <FaHeart className='like-icon' /></h4>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {
          totalReact.map((res, i) => (
            <div className='d-flex align-items-center'>
              <div>
                {
                  res.image ?
                    <img width="48px" height="48px" className='label' style={{ width: "120px", borderRadius: '1000px' }} src={`data:${res?.image?.contentType};base64,${Buffer.from(res?.image?.data?.data).toString('base64')}`} alt="" />
                    :
                    <img width="48px" height="48px" src={UserImage} alt="person pic" />
                }
              </div>
              <p className='like' style={{ fontsize: "21px" }} >{res.firstName}{res.lastName}</p>
            </div>
          ))
        }
      </Modal.Body>
    </Modal>
  );
};

export default LikeByModal;