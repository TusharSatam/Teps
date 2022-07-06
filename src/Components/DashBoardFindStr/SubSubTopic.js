import React from 'react';
import { Button, Dropdown, DropdownButton, Form, InputGroup } from 'react-bootstrap';
import { FaRegEdit, FaRegTrashAlt } from 'react-icons/fa';
import toast, { Toaster } from 'react-hot-toast';
import { deletSubSubTopicStratigy, getSingleSubSubTopicStratigy, getSubSubTopicStratigy, postSubSubTopicStratigy } from '../../apis/findStratigys/subSubTopic';
import EditSubSubTopic from '../DashboardModal/EditSubSubTopic';


const SubSubTopic = () => {
    const [subData, setSubData] = React.useState()
    const [show, setShow] = React.useState(false);
    const [singleData, setSingleData] = React.useState();
    const handleClose = () => setShow(false);
    React.useEffect(() => {
        getSubSubTopicStratigy()
            .then(res => {
                setSubData(res);
            })
    }, [])

    const submitSubject = (e) => {
        e.preventDefault();
        const data = {
            "Sub-sub topic": e.target.subject.value
        }
        postSubSubTopicStratigy(data)
            .then(res => {
                res && toast.success('Sub-sub topic Dropdown Added')
                e.target.reset();
                getSubSubTopicStratigy()
                    .then(res => {
                        setSubData(res);
                    })
            })
    }
    const deletSubject = (id) => {
        deletSubSubTopicStratigy(id)
            .then(res => {
                setSubData(subData.filter(message => message._id !== id));
                toast.success('Sub-sub topic Item Deleted')
            })
    }
    const handleEdit = (id) => {
        getSingleSubSubTopicStratigy(id)
            .then(res => {
                setSingleData(res[0]);
                console.log(res[0]);
                setShow(true)
            })
    }
    return (
        <>
            <Toaster
                position="top-right"
                reverseOrder={false}
            />
            <EditSubSubTopic
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
                    title="Sub-Sub topic"
                    id="input-group-dropdown-1"
                >
                    {
                        subData?.map((item, index) => (
                            <div key={index} className='d-flex'><Dropdown.Item href="#">{item['Sub-sub topic']}</Dropdown.Item>
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
        </>
    );
};

export default SubSubTopic;