import React from 'react';
import { Modal } from 'react-bootstrap';
import toast, { Toaster } from 'react-hot-toast';
import { getSkilleStratigy, updateSkillStratigy } from '../../apis/findStratigys/skill';

const EditFindSkill = ({ show, setShow, onHide, data, setSubData }) => {
    const handleUpdate = (e) => {
        e.preventDefault();
        const updata = {
            "Skill": e.target.skill.value
        }
        updateSkillStratigy(data?._id, updata)
            .then(res => {
                setShow(false)
                toast.success('Update successfull!')
                getSkilleStratigy()
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
                            <input defaultValue={data?.Skill} className='signup_Input' name='skill' placeholder='' type="text" />
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

export default EditFindSkill;