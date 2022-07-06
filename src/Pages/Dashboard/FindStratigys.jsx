import React from 'react';
import { Button, Dropdown, DropdownButton, Form, InputGroup } from 'react-bootstrap';
import { FaRegEdit, FaRegTrashAlt } from 'react-icons/fa';
import { deletSubStratigy, getSingleSubStratigy, getSubStratigy, postSubStratigy } from '../../apis/findStratigys/subject';
import toast, { Toaster } from 'react-hot-toast';
import FindStratigyEdit from '../../Components/DashboardModal/FindStratigyEdit';
import Grade from '../../Components/DashBoardFindStr/Grade';
import Skill from '../../Components/DashBoardFindStr/Skill';
import Topic from '../../Components/DashBoardFindStr/Topic';
import SubTopic from '../../Components/DashBoardFindStr/SubTopic';
import SubSubTopic from '../../Components/DashBoardFindStr/SubSubTopic';

const FindStratigys = () => {
    const [subData, setSubData] = React.useState()
    const [show, setShow] = React.useState(false);
    const [singleData, setSingleData] = React.useState();
    const handleClose = () => setShow(false);
    React.useEffect(() => {
        getSubStratigy()
            .then(res => {
                setSubData(res);
            })
    }, [])

    const submitSubject = (e) => {
        e.preventDefault();
        console.log(true);
        const data = {
            "Subject": e.target.subject.value
        }
        postSubStratigy(data)
            .then(res => {
                res && toast.success('Subject Dropdown Added')
                e.target.reset();
                getSubStratigy()
                    .then(res => {
                        setSubData(res);
                    })
            })
    }
    const deletSubject = (id) => {
        deletSubStratigy(id)
            .then(res => {
                setSubData(subData.filter(message => message._id !== id));
                toast.success('Subject Item Deleted')
            })
    }
    const handleEdit = (id) => {
        getSingleSubStratigy(id)
            .then(res => {
                setSingleData(res[0]);
                console.log(res[0]);
                setShow(true)
            })
    }
    return (
        <div>
            <h2 className='text-center my-5'>Find Stratigys Dropdown</h2>
            <div className='d-flex justify-content-center'>
                <div>
                    <Toaster
                        position="top-right"
                        reverseOrder={false}
                    />
                    <FindStratigyEdit
                        show={show}
                        onHide={handleClose}
                        backdrop="static"
                        keyboard={false}
                        data={singleData}
                        setShow={setShow}
                        setSubData={setSubData}
                    />
                    <div className='d-flex'>
                        <DropdownButton
                            variant="outline-secondary"
                            title="Subject&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"
                            id="input-group-dropdown-1"
                        >
                            {
                                subData?.map((item, index) => (
                                    <div key={index} className='d-flex'><Dropdown.Item href="#">{item.Subject}</Dropdown.Item>
                                        <button onClick={() => handleEdit(item._id)} className='btn p-0 me-2' ><FaRegEdit /></button>
                                        <button onClick={() => deletSubject(item._id)} className='btn p-0 me-2'><FaRegTrashAlt /></button>
                                    </div>
                                ))
                            }
                        </DropdownButton>
                        <form onSubmit={submitSubject}>
                            <InputGroup className="mb-3 w-100 border-left-0">
                                <Form.Control className='' required name='subject' aria-label="Text input with dropdown button" />
                                <Button type='submit'>Submit</Button>
                            </InputGroup>
                        </form>
                    </div>
                    <Grade />
                    <Skill />
                    <Topic />
                    <SubTopic />
                    <SubSubTopic />
                </div>
            </div>
        </div>
    );
};

export default FindStratigys;