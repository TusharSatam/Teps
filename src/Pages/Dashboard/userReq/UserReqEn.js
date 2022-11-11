import React from 'react';
import { Table } from 'react-bootstrap';
import toast, { Toaster } from 'react-hot-toast';
import { denyUserStratigys, getUserStratigys, updateUserStratigys } from '../../../services/userStratigy'
const UserReqEn = () => {
  const [enStr, setEnStr] = React.useState([])
  React.useEffect(() => {
    getUserStratigys()
      .then(res => {
        setEnStr(res.data)
      })
  }, [])

  const habdleApprove = (id) => {
    const data = {
      'Approve': true
    }
    updateUserStratigys(id, data)
      .then(res => {
        res && toast.success('Request Approved!', {
          duration: 4000
        });
      })
  }
  const habdleDeny = (id) => {
    denyUserStratigys(id)
      .then(res => {
        res && toast.success('Request Denied!', {
          duration: 4000
        });
      })
  }
  return (
    <div>
      <Toaster
        position="top-right"
        reverseOrder={false}
      />
      {
        enStr.map((item, index) => (
          <>
            <Table key={index + 1} striped bordered hover size="sm" className={'d-none d-md-block '}>
              <thead style={{ background: '#d5b39a' }}>
                <tr>
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
                </tr>
              </thead>
              <tbody>
                <tr key={index}>
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
                </tr>
              </tbody>
            </Table>
            <div className='mb-3'>
              <button onClick={() => habdleApprove(item._id)} className='btn btn-primary me-3'>Approve</button>
              <button onClick={() => habdleDeny(item._id)} className='btn btn-primary'>Deny</button>
            </div>
          </>
        ))
      }
    </div>
  );
};

export default UserReqEn;