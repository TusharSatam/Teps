import axios from 'axios';
import React from 'react';
import { Table } from 'react-bootstrap';
import toast, { Toaster } from 'react-hot-toast';
import { useAuth } from '../../../Context/AuthContext';
import { denyUserStratigys, getUserStratigys, singleUserEnStratigys, updateUserStratigys } from '../../../services/userStratigy'
const UserReqEn = () => {
  const [enStr, setEnStr] = React.useState([])
  const { user } = useAuth()
  React.useEffect(() => {
    getUserStratigys()
      .then(res => {
        setEnStr(res.data?.filter(res => res.Approve === false))
      })
  }, [])

  const habdleApprove = (id) => {
    const data = {
      'Approve': true
    }
    updateUserStratigys(id, data)
      .then(res => {
        singleUserEnStratigys(id)
          .then(ress => {
            const datae = {
              "to": user.email,
              'subject': "TEPS - Congratulations! Your strategy has been approved.",
              "html": `
              <p>Hello ${user.firstName}</p>
              <p>We are glad to inform you that your strategy (shown below) has been approved and will be shown with the rest of the strategies to all the members of the community. We thank you for your contribution to the community of educators.</p><br />
              <p>Regards,</p>
              <p>Things Education Team</p>
              <p>${res?.data[0]['Teaching Strategy']}</p>
              `
            }
            axios.post('email', datae)
              .then(resp => {
                console.log('ljkbkjh');
                resp && getUserStratigys()
                  .then(res => {
                    setEnStr(res.data?.filter(res => res.Approve === false))
                    res && toast.success('Request Approved!', {
                      duration: 4000
                    });
                  })
              })
              .catch(err => console.log(err))
          })
      })
  }
  const habdleDeny = (id) => {
    denyUserStratigys(id)
      .then(res => {
        res && toast.success('Request Denied!', {
          duration: 4000
        });
        getUserStratigys()
          .then(res => {
            setEnStr(res.data?.filter(res => res.Approve === false))
          })
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
          item.Approve === false ?
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
            </> : null
        ))
      }
    </div>
  );
};

export default UserReqEn;