import React from 'react';
import { Modal } from 'react-bootstrap';
import toast, { Toaster } from 'react-hot-toast';
import { getTopicStratigy, updateTopicStratigy } from '../../services/findStratigys/topic';

const EditFindTopic = ({ show, setShow, onHide, data, setSubData }) => {
    const handleUpdate = (e) => {
        e.preventDefault();
        const updata = {
            "Topic": e.target.topic.value
        }
        updateTopicStratigy(data?._id, updata)
            .then(res => {
                setShow(false)
                toast.success('Update successfull!')
                getTopicStratigy()
                    .then(res => {
                        setSubData(res);
                    })
            })
    }
    return (
        <>
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
                    <Modal.Title>Update FindStratigys DropDown</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className='d-flex justify-content-center'>
                        <form onSubmit={handleUpdate} className='ms-md-3 ms-xxl-5'>
                            <input defaultValue={data?.Topic} className='signup_Input' name='topic' placeholder='' type="text" />
                            <div className='d-flex justify-content-center my-3'>
                                <button className='btn btn-primary'>Update</button>
                            </div>
                        </form>
                    </div>
                </Modal.Body>
            </Modal>
        </>
    );
};

export default EditFindTopic;