import React from 'react';
import { Spinner, Table } from 'react-bootstrap';
import toast, { Toaster } from 'react-hot-toast';
import { FaRegEdit } from 'react-icons/fa';
import UserHiStratigyEdit from '../../../Components/DashboardModal/UserHiStratigyEdit';
import { denyUserStratigysHi, getUserStratigysHi, singleUserHiStratigys, updateUserStratigysHi } from '../../../services/userStratigyHi';

const UserReqHi = () => {
  const [enStr, setEnStr] = React.useState([])
  const [isLoading, setIsLoading] = React.useState(false);
  const [singleStr, setSingleStr] = React.useState({});
  const handleClose = () => setShow(false);
  const [show, setShow] = React.useState(false);

  React.useEffect(() => {
    setIsLoading(true)
    getUserStratigysHi()
      .then(res => {
        setEnStr(res.data?.filter(res => res.Approve === false))
        setIsLoading(false)
      })
  }, [])

  const habdleApprove = (id) => {
    const data = {
      'Approve': true
    }
    updateUserStratigysHi(id, data)
      .then(res => {
        getUserStratigysHi()
          .then(res => {
            setEnStr(res.data?.filter(res => res.Approve === false))
            res && toast.success('Request Approved!', {
              duration: 4000
            });
          })
      })
  }
  const habdleDeny = (id) => {
    denyUserStratigysHi(id)
      .then(res => {
        res && toast.error('Request Denied!', {
          duration: 4000
        });
        getUserStratigysHi()
          .then(res => {
            setEnStr(res.data?.filter(res => res.Approve === false))
          })
      })
  }
  const handleEdit = (id) => {
    singleUserHiStratigys(id)
      .then(res => {
        setSingleStr(res?.data[0]);
        setShow(true)
      })
  }
  return (
    <div>
      <Toaster
        position="top-right"
        reverseOrder={false}
      />
      <UserHiStratigyEdit
        show={show}
        onHide={handleClose}
        data={singleStr}
        setShow={setShow}
        setStratigys={setEnStr}
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
                <>
                  <Table key={index + 1} striped bordered hover size="sm" className={'d-none d-md-block '}>
                    <thead style={{ background: '#d5b39a' }}>
                      <tr>
                        <th>#</th>
                        <th>Id</th>
                        <th scope="col">विषय</th>
                        <th scope="col">श्रेणी</th>
                        <th scope="col">अच्छा विषय</th>
                        <th scope="col">शीर्षक</th>
                        <th scope="col">उप शीर्षक</th>
                        <th scope="col">उप-उप शीर्षक </th>
                        <th scope="col">विकासात्मक क्षेत्र 1</th>
                        <th scope="col">विकासात्मक क्षेत्र 2</th>
                        <th scope="col">शिक्षण का तरीका</th>
                        <th scope="col">शिक्षण के परिणाम</th>
                        <th scope="col">शिक्षण रणनीति</th>
                        <th scope="col"></th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr key={index}>
                        <td> {index + 1}</td>
                        <td>{(item._id).slice(19, 26)}</td>
                        <td>{item.विषय}</td>
                        <td>{item.श्रेणी}</td>
                        <td>{item?.['अच्छा विषय']}</td>
                        <td>{item.शीर्षक}</td>
                        <td>{item['उप शीर्षक']}</td>
                        <td>{item['उप-उप शीर्षक']}</td>
                        <td>{item['विकासात्मक क्षेत्र 1']}</td>
                        <td>{item['विकासात्मक क्षेत्र 2']}</td>
                        <td>{item['शिक्षण का तरीका']}</td>
                        <td>{item['शिक्षण के परिणाम']?.slice(0, 20)}</td>
                        <td>{item['शिक्षण रणनीति']?.slice(0, 20)}</td>
                        <td> <button onClick={() => handleEdit(item._id)} className='btn p-0'><FaRegEdit /></button></td>
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
          </>
      }
    </div>
  );
};

export default UserReqHi;