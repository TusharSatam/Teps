import React from 'react';
import { Modal } from 'react-bootstrap';
import toast, { Toaster } from 'react-hot-toast';
import { updateStratigys } from '../../apis/stratigyes';

const EditStratigyModal = ({ show, onHide, data, setShow }) => {
    console.log(data);
    const handleUpdate = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('Subject', e.target.subject.value);
        formData.append('Grade', e.target.grade.value);
        formData.append('Skill', e.target.skill.value);
        formData.append('Topic', e.target.topic.value);
        formData.append('Sub Topic', e.target.sub_topic.value);
        formData.append('Sub-sub topic', e.target.sub_sub_topic.value);
        formData.append('Dev Dom 1', e.target.dev_dom_1.value);
        formData.append('Dev Dom 2', e.target.dev_dom_2.value);
        formData.append('Mode of Teaching', e.target.mode_ofteaching.value);
        formData.append('Learning Outcome', e.target.learning_outcome.value);
        formData.append('Teaching Strategy', e.target.teaching_sstrategy.value);
        updateStratigys(data._id, formData)
            .then(res => {
                setShow(false)
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
                    <Modal.Title>Update Stratigys</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className='d-flex justify-content-center'>
                        <form className='ms-md-3 ms-xxl-5' onSubmit={handleUpdate}>
                            <label htmlFor="">Subject </label> <br />
                            <input className='signup_Input' defaultValue={data?.Subject} name='subject' placeholder='Subject' type="text" />
                            <div>
                                <label htmlFor="">Grade</label> <br />
                                <input className='signup_Input' defaultValue={data?.Grade} name='grade' placeholder='Grade' type="text" />
                            </div>
                            <div >
                                <label htmlFor="">Skill</label> <br />
                                <input className={"signup_Input"} defaultValue={data?.Skill} name='skill' placeholder='Skill' type="text" />
                            </div>
                            <div >
                                <label htmlFor="">Topic </label> <br />
                                <input className='signup_Input' defaultValue={data?.Topic} name='topic' placeholder='Topic' type="text" />
                                <div>
                                    <label htmlFor="">Sub Topic </label> <br />
                                    <input className='signup_Input' defaultValue={data ? data['Sub Topic'] : ''} name='sub_topic' placeholder='Sub Topic' type="text" />
                                </div>
                            </div>
                            <div>
                                <label htmlFor="">Sub-sub topic </label> <br />
                                <input className='signup_Input' defaultValue={data ? data['Sub Topic'] : ''} name='sub_sub_topic' placeholder='Sub-sub topic' type="text" />
                            </div>
                            <div>
                                <label htmlFor="">Dev Dom 1 </label> <br />
                                <input className='signup_Input' defaultValue={data ? data['Sub Topic'] : ''} name='dev_dom_1' placeholder='Dev Dom 1' type="text" />
                            </div>
                            <div>
                                <label htmlFor="">Dev Dom 2 </label> <br />
                                <input className='signup_Input' defaultValue={data ? data['Sub Topic'] : ''} name='dev_dom_2' placeholder='Dev Dom 2' type="text" />
                            </div>
                            <div>
                                <label htmlFor="">Mode of Teaching </label> <br />
                                <input className='signup_Input' defaultValue={data ? data['Sub Topic'] : ''} name='mode_ofteaching' placeholder='Mode of Teaching' type="text" />
                            </div>
                            <div>
                                <label htmlFor="">Learning Outcome </label> <br />
                                <input className='signup_Input' defaultValue={data ? data['Sub Topic'] : ''} name='learning_outcome' placeholder='Learning Outcome' type="text" />
                            </div>
                            <div>
                                <label htmlFor="">Teaching Strategy </label> <br />
                                <textarea className='signup_Input' defaultValue={data ? data['Sub Topic'] : ''} name='teaching_sstrategy' placeholder='Teaching Strategy' type="text" />
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

export default EditStratigyModal;