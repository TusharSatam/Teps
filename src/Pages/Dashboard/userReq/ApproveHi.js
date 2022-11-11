import React from 'react';
import { Table } from 'react-bootstrap';
import { getUserStratigysHi } from '../../../services/userStratigyHi';

const ApproveHi = () => {
  const [enStr, setEnStr] = React.useState([])
  React.useEffect(() => {
    getUserStratigysHi()
      .then(res => {
        setEnStr(res.data)
      })
  }, [])

  return (
    <div>
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
              <button className='btn btn-primary me-3'>Approve</button>
              <button className='btn btn-primary'>Deny</button>
            </div>
          </>
        ))
      }
    </div>
  );
};

export default ApproveHi;