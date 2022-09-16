import React from 'react';
import toast, { Toaster } from 'react-hot-toast';
import Table from 'react-bootstrap/Table';
import { delAdminStratigys, getAllAdminStratigys } from '../../../services/adminStrUpload';
import axios from 'axios';
import { useAuth } from '../../../Context/AuthContext';


const UploadEnglishStr = () => {
  const { humBurgs } = useAuth()
  const [count, setcount] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);
  React.useEffect(() => {
    setIsLoading(true)
    getAllAdminStratigys()
      .then(res => {
        setcount(res.data);
      })
  }, [])
  console.log(count);


  const handleMultiDelet = (id, csvData) => {
    const config = {
      "Access-Control-Allow-Origin": "*"
    }
    axios.post('strategies', csvData, { config })
      .then(res => {
        toast.success('strategies Uploaded!')
        delAdminStratigys(id)
          .then(ress => {
            ress && setcount(count.filter(message => message._id !== id));
          })
      })
      .catch(err => console.log(err))
  }
  const handleDeny = (id) => {
    delAdminStratigys(id)
      .then(res => {
        res && setcount(count.filter(message => message._id !== id));
        res && toast.success('Request Denied!');
      })
  }
  const [seeMore, setSeeMore] = React.useState(false);
  const handleSee = () => {
    if (seeMore) {
      setSeeMore(false)
    }
    else {
      setSeeMore(true)
    }
  }

  const [seeMore2, setSeeMore2] = React.useState(false);
  const handleSee2 = () => {
    if (seeMore2) {
      setSeeMore2(false)
    }
    else {
      setSeeMore2(true)
    }
  }
  return (
    <>
      <Toaster
        position="top-right"
        reverseOrder={false}
      />
      <div className="container">
        <div className='mb-3'>
          {/* <button onClick={handleallDelet} className='btn btn-primary '>Delete All Strategies</button> */}

        </div>
        {
          count?.length === 0 || count === undefined ? "No Request send" :
            <>
              {
                count?.map((data, index) => (
                  <><div className="d-flex my-4">
                    <h3 className='me-3'>Request{index + 1} for Upload Strategies</h3>
                  </div>
                    <Table key={index} striped bordered hover size="sm" className={humBurgs ? 'd-none d-md-block table_overflow' : 'd-none d-md-block table_overflows'}>
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
                        {
                          <>
                            {data && data?.adminStrategie?.map((item, index) => (
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
                                <td>
                                  {
                                    seeMore2 ?
                                      <>
                                        <span>{item['Learning Outcome']}</span>
                                        <span onClick={handleSee2} className='text-primary' style={{ cursor: "pointer" }}>less</span>
                                      </>
                                      :
                                      <>
                                        {item['Learning Outcome']?.slice(0, 20)}
                                        <span onClick={handleSee2} className='text-primary' style={{ cursor: "pointer" }}>see more...</span>
                                      </>
                                  }
                                </td>
                                <td>
                                  {
                                    seeMore ?
                                      <>
                                        <span>{item['Teaching Strategy']}</span>
                                        <span onClick={handleSee} className='text-primary' style={{ cursor: "pointer" }}>less</span>
                                      </>
                                      :
                                      <>
                                        {item['Teaching Strategy']?.slice(0, 20)}
                                        <span onClick={handleSee} className='text-primary' style={{ cursor: "pointer" }}>see more...</span>
                                      </>
                                  }
                                </td>
                              </tr>
                            ))}
                          </>
                        }

                      </tbody>
                    </Table>
                    <Table key={index} responsive striped bordered hover size="sm" className='w-100 d-block d-md-none'>
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
                        {
                          <>
                            {data && data?.adminStrategie?.map((item, index) => (
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
                                <td>
                                  {
                                    seeMore2 ?
                                      <>
                                        <span>{item['Learning Outcome']}</span>
                                        <span onClick={handleSee2} className='text-primary' style={{ cursor: "pointer" }}>less</span>
                                      </>
                                      :
                                      <>
                                        {item['Learning Outcome']?.slice(0, 20)}
                                        <span onClick={handleSee2} className='text-primary' style={{ cursor: "pointer" }}>see more...</span>
                                      </>
                                  }
                                </td>
                                <td>
                                  {
                                    seeMore ?
                                      <>
                                        <span>{item['Teaching Strategy']}</span>
                                        <span onClick={handleSee} className='text-primary' style={{ cursor: "pointer" }}>less</span>
                                      </>
                                      :
                                      <>
                                        {item['Teaching Strategy']?.slice(0, 20)}
                                        <span onClick={handleSee} className='text-primary' style={{ cursor: "pointer" }}>see more...</span>
                                      </>
                                  }
                                </td>
                              </tr>
                            ))}
                          </>
                        }

                      </tbody>
                    </Table>
                    <div>
                      <button onClick={() => handleMultiDelet(data?._id, data?.adminStrategie)} className='btn btn-primary me-3'>Approve</button>
                      <button onClick={() => handleDeny(data?._id)} className='btn btn-primary'>Deny</button>
                    </div>
                  </>
                ))
              }
            </>
        }
      </div>
    </>
  );
};

export default UploadEnglishStr;