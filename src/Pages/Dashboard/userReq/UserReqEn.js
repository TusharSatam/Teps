import axios from 'axios';
import React from 'react';
import { Spinner, Table } from 'react-bootstrap';
import toast, { Toaster } from 'react-hot-toast';
import { FaRegEdit } from 'react-icons/fa';
import UserStrEditModal from '../../../Components/DashboardModal/UserStrEditModal';
import { useAuth } from '../../../Context/AuthContext';
import { denyUserStratigys, getUserStratigys, singleUserEnStratigys, updateUserStratigys } from '../../../services/userStratigy'
const UserReqEn = () => {
  const [enStr, setEnStr] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [singleStr, setSingleStr] = React.useState({});
  const handleClose = () => setShow(false);
  const [show, setShow] = React.useState(false);

  const { user } = useAuth()
  React.useEffect(() => {
    setIsLoading(true)
    getUserStratigys()
      .then(res => {
        setEnStr(res.data?.filter(res => res.Approve === false))
        setIsLoading(false)
      })
  }, [])

  const habdleApprove = (id) => {
    const data = {
      'Approve': true
    }
    singleUserEnStratigys(id)
      .then(response => {
        updateUserStratigys(id, data)
          .then(res => {
            getUserStratigys()
              .then(res => {
                setEnStr(res.data?.filter(res => res.Approve === false))
                res && toast.success('Request Approved!', {
                  duration: 4000
                });
                const datae = {
                  "to": user.email,
                  'subject': "TEPS - Congratulations! Your strategy has been approved.",
                  "html": `
                      <p>Hello ${user.firstName},</p>
                      <p>We are glad to inform you that your strategy (shown below) has been approved and will be shown with the rest of the strategies to all the members of the community. We thank you for your contribution to the community of educators.</p><br />
                      <p>Regards,</p>
                      <p>Things Education Team</p>
                      <p>${response?.data[0]['Teaching Strategy']}</p>
                      `
                }
                axios.post('email', datae)
                  .then(resp => {
                    console.log("success");
                  })
                  .catch(err => console.log(err))
              })
          })
      })
  }
  const habdleDeny = (id) => {
    singleUserEnStratigys(id)
      .then(response => {
        denyUserStratigys(id)
          .then(res => {
            res && toast.error('Request Denied!', {
              duration: 4000
            });
            getUserStratigys()
              .then(res => {
                setEnStr(res.data?.filter(res => res.Approve === false))
                const datae = {
                  "to": user.email,
                  'subject': "Regarding your strategy on the TEPS Community.",
                  "html": `
                  <p>Hello ${user.firstName},</p>
                  <p>Thank you for uploading your strategy to the TEPS community. Unfortunately, we will not be able to include your strategy (shown below) on the platform as it does not meet our standards. We hope that you will continue to contribute to the community of educators.</p>
                  <p>Regards,</p>
                  <p>Things Education Team</p>
                  <p>${response?.data[0]['Teaching Strategy']}</p>
                  `
                }
                axios.post('email', datae)
                  .then(resp => {
                    console.log("success");
                  })
                  .catch(err => console.log(err))
              })
          })
      })
  }
  const handleEdit = (id) => {
    singleUserEnStratigys(id)
      .then(res => {
        setSingleStr(res?.data[0]);
        setShow(true)
      })
  }
  return (
    <div>
      <UserStrEditModal
        show={show}
        onHide={handleClose}
        data={singleStr}
        setShow={setShow}
        setStratigys={setEnStr}
      />
      <Toaster
        position="top-right"
        reverseOrder={false}
      />
      {
        isLoading ? <div style={{ marginLeft: "500px", marginTop: "150px" }}>
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
          :
          <>
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
                          <th scope="col">Super Topic</th>
                          <th scope="col">Topic</th>
                          <th scope="col">Sub Topic</th>
                          <th scope="col">Sub-sub topic </th>
                          <th scope="col">Learning Outcome </th>
                          <th scope="col">Teaching Strategy </th>
                          <th scope="col"></th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr key={index}>
                          <td> {index + 1}</td>
                          <td>{(item._id).slice(19, 26)}</td>
                          <td>{item.Subject}</td>
                          <td>{item.Grade}</td>
                          <td>{item['Super Topic']}</td>
                          <td>{item.Topic}</td>
                          <td>{item['Sub Topic']}</td>
                          <td>{item['Sub-sub topic']}</td>
=
                          <td>{item['Learning Outcome']?.slice(0, 20)}</td>
                          <td>{item['Teaching Strategy']?.slice(0, 20)}</td>
                          <td> <button onClick={() => handleEdit(item._id)} className='btn p-0'><FaRegEdit /></button></td>
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
          </>
      }
    </div>
  );
};

export default UserReqEn;