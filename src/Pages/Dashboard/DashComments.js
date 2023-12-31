import React, { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import toast, { Toaster } from 'react-hot-toast';
import { FaRegTrashAlt } from 'react-icons/fa';
import { useAuth } from '../../Context/AuthContext';
import { delComments, getComment, updateComment } from '../../services/stratigyes';

const DashComments = () => {
  const { comments, setComments } = useAuth()
  const [comment, setComment] = useState([])
  useEffect(() => {
    getComment()
      .then(res => {
        setComment(res?.data?.filter(res => res?.Approve === false))
      })
  }, [])
  const allselectedId = comment?.map(stra => {
    return stra._id
  })
  const handleCommentClear = () => {
    const data = {
      'Approve': true
    }
    let text = "Do you want to clear comments?";
    if (window.confirm(text) === true) {
      updateComment(allselectedId, data)
        .then(res => {
          res && toast.success('Comments cleared!', {
            duration: 4000
          });
          getComment()
            .then(res => {
              setComment(res?.data?.filter(res => res?.Approve === false))
              setComments(res?.data?.filter(res => res?.Approve === false))
            })
        })
    }
  }
  const handleCommentDelet = (id) => {
    delComments(id)
      .then(res => {
        res && toast.success('Comment Deleted!', {
          duration: 4000
        });
        getComment()
          .then(res => {
            setComment(res?.data?.filter(res => res?.Approve === false))
          })
      })
  }

  const formatPostTime = (isoDateString) => {
    const date = new Date(isoDateString);
    return date.toLocaleString(); // You can customize the format as needed
  };
  return (
    <div>
      <Toaster
        position="top-right"
        reverseOrder={false}
      />
      <div className='d-flex justify-content-end'>
        <button onClick={handleCommentClear} className='btn btn-primary my-3 '>Clear Comments</button>
      </div>
      <Table striped bordered hover size="sm">
        <thead style={{ background: '#d5b39a' }}>
          <tr>
            <th>Id</th>
            <th scope="col">Comment</th>
            <th scope="col">Name</th>
            <th scope="col">Date and Time</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {
            comment?.map((res, i) => (
              <tr key={i}>
                <td>{res?._id.slice(19, 26)}</td>
                <td>{res?.comment}</td>
                <td>{res?.user_name}</td>
                <td>{formatPostTime(res?.postTime)}</td>

                <td>
                  <button onClick={() => handleCommentDelet(res?._id)} className='btn p-0 me-2'>
                    <FaRegTrashAlt />
                  </button>
                </td>
              </tr>
            ))
          }



        </tbody>
      </Table>
    </div>
  );
};

export default DashComments;