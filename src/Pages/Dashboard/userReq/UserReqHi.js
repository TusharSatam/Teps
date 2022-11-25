import React from 'react';
import { Spinner, Table } from 'react-bootstrap';
import toast, { Toaster } from 'react-hot-toast';
import { denyUserStratigysHi, getUserStratigysHi, updateUserStratigysHi } from '../../../services/userStratigyHi';

const UserReqHi = () => {
  const [enStr, setEnStr] = React.useState([])
  const [isLoading, setIsLoading] = React.useState(false);

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
        res && toast.success('Request Denied!', {
          duration: 4000
        });
        getUserStratigysHi()
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
                        <td>{item.विषय}</td>
                        <td>{item.श्रेणी}</td>
                        <td>{item.कौशल}</td>
                        <td>{item.शीर्षक}</td>
                        <td>{item['उप शीर्षक']}</td>
                        <td>{item['उप-उप शीर्षक']}</td>
                        <td>{item['विकासात्मक क्षेत्र 1']}</td>
                        <td>{item['विकासात्मक क्षेत्र 2']}</td>
                        <td>{item['शिक्षण का तरीका']}</td>
                        {/* <td>
                                  {item?._id === indi ? lOutcome['शिक्षण के परिणाम'] : item['शिक्षण के परिणाम']?.slice(0, 20)}
                                  {item?._id !== indi ? <span className='text-primary' style={{ cursor: "pointer" }} onClick={() => showMore(data?._id, index)}>more..</span> : <span className='text-primary' style={{ cursor: "pointer" }} onClick={() => setIndi(null)}>less</span>}
                                </td>
                                <td>
                                  {item?._id === indi1 ? teaching['शिक्षण रणनीति'] : item['शिक्षण रणनीति']?.slice(0, 20)}
                                  {item?._id !== indi1 ? <span className='text-primary' style={{ cursor: "pointer" }} onClick={() => showMore2(data?._id, index)}>more..</span> : <span className='text-primary' style={{ cursor: "pointer" }} onClick={() => setIndi1(null)}>less</span>}
                                </td> */}
                        <td>{item['शिक्षण के परिणाम']?.slice(0, 20)}</td>
                        <td>{item['शिक्षण रणनीति']?.slice(0, 20)}</td>
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