import React from 'react';
import { Table } from 'react-bootstrap';
import toast, { Toaster } from 'react-hot-toast';
import { FaRegEdit, FaRegTrashAlt } from 'react-icons/fa';
import UserStrEditModal from '../../../Components/DashboardModal/UserStrEditModal';
import { delApproveUserStratigys, getUserStratigys, singleUserEnStratigys } from '../../../services/userStratigy'
const ApproveEn = () => {
  const [enStr, setEnStr] = React.useState([])
  const [show, setShow] = React.useState(false);
  const [singleStr, setSingleStr] = React.useState({});
  const handleClose = () => setShow(false);

  React.useEffect(() => {
    getUserStratigys()
      .then(res => {
        setEnStr(res.data?.filter(res => res.Approve === true))
      })
  }, [])
  const handleDelet = (id) => {
    delApproveUserStratigys(id)
      .then(res => {
        res && setEnStr(enStr.filter(message => message._id !== id));
        res && toast.success('Strategy Deleted!', {
          duration: 4000
        });
      })
  }

  const handleEdit = (id) => {
    singleUserEnStratigys(id)
      .then(res => {
        setSingleStr(res[0]);
        setShow(true)
      })
  }
  console.log(singleStr);
  return (
    <div>
      <Toaster
        position="top-right"
        reverseOrder={false}
      />
      <UserStrEditModal
        show={show}
        onHide={handleClose}
        data={singleStr}
        setShow={setShow}
        setStratigys={setEnStr}
      />
      <>
        <Table striped bordered hover size="sm" className={'d-none d-md-block '}>
          <thead style={{ background: '#d5b39a' }}>
            <tr>
              <th><input type="checkbox" name="" id="" /></th>
              <th>#</th>
              <th>Id</th>
              <th scope="col">Subject</th>
              <th scope="col">Grade</th>
              <th scope="col">Skill</th>
              <th scope="col">Topic</th>
              <th scope="col">Sub Topic</th>
              <th scope="col">Sub-sub topic </th>
              <th scope="col">Dev Dom 1 </th>
              <th scope="col">Dev Dom 2 </th>
              <th scope="col">Mode of Teaching </th>
              <th scope="col">Learning Outcome </th>
              <th scope="col">Teaching Strategy </th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            {
              enStr.map((item, index) => (
                <tr key={index}>
                  <td><input type="checkbox" name="" id="" /></td>
                  <td> {index + 1}</td>
                  <td>{(item._id).slice(19, 26)}</td>
                  <td>{item.Subject}</td>
                  <td>{item.Grade}</td>
                  <td>{item.Skill}</td>
                  <td>{item.Topic}</td>
                  <td>{item['Sub Topic']}</td>
                  <td>{item['Sub-sub topic']}</td>
                  <td>{item['Dev Dom 1']}</td>
                  <td>{item['Dev Dom 2']}</td>
                  <td>{item['Mode of Teaching']}</td>
                  {/* <td>
                                  {item?._id === indi ? lOutcome['Learning Outcome'] : item['Learning Outcome']?.slice(0, 20)}
                                  {item?._id !== indi ? <span className='text-primary' style={{ cursor: "pointer" }} onClick={() => showMore(data?._id, index)}>more..</span> : <span className='text-primary' style={{ cursor: "pointer" }} onClick={() => setIndi(null)}>less</span>}
                                </td>
                                <td>
                                  {item?._id === indi1 ? teaching['Teaching Strategy'] : item['Teaching Strategy']?.slice(0, 20)}
                                  {item?._id !== indi1 ? <span className='text-primary' style={{ cursor: "pointer" }} onClick={() => showMore2(data?._id, index)}>more..</span> : <span className='text-primary' style={{ cursor: "pointer" }} onClick={() => setIndi1(null)}>less</span>}
                                </td> */}
                  <td>{item['Learning Outcome'].slice(0, 20)}</td>
                  <td>{item['Teaching Strategy'].slice(0, 20)}</td>
                  <td>
                    <button onClick={() => handleDelet(item._id)} className='btn p-0 me-2'>
                      <FaRegTrashAlt />
                    </button>
                    <button onClick={() => handleEdit(item._id)} className='btn p-0'><FaRegEdit /></button>
                  </td>
                </tr>

              ))
            }
          </tbody>
        </Table>
      </>
    </div>
  );
};

export default ApproveEn;