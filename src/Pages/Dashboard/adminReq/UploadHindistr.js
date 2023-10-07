import React from 'react';
import toast, { Toaster } from 'react-hot-toast';
import Table from 'react-bootstrap/Table';
import { delAdminStratigysHi, getAllAdminStratigysHi, getSingleAdminStratigysHi } from '../../../services/adminStrUploadHi';
import axios from 'axios';
import { useAuth } from '../../../Context/AuthContext';
import { Spinner } from 'react-bootstrap';

const UploadHindistr = () => {
  const { humBurgs } = useAuth()
  const [count, setcount] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [lOutcome, setLOutCame] = React.useState();
  const [indi, setIndi] = React.useState();
  const [teaching, setTeaching] = React.useState();
  const [indi1, setIndi1] = React.useState();
  React.useEffect(() => {
    setIsLoading(true)
    getAllAdminStratigysHi()
      .then(res => {
        setcount(res.data);
        setIsLoading(false)
      })
  }, [])


  const handleMultiDelet = (id, csvData) => {
    const config = {
      "Access-Control-Allow-Origin": "*"
    }
    axios.post('hindstrategies', csvData, { config })
      .then(res => {
        if (res) {
          toast.success('strategies Uploaded!', {
            duration: 4000
          })
          delAdminStratigysHi(id)
            .then(ress => {
              ress && setcount(count.filter(message => message._id !== id));
            })
        }
      })
      .catch(err => console.log(err))
  }
  const handleDeny = (id) => {
    delAdminStratigysHi(id)
      .then(res => {
        res && setcount(count.filter(message => message._id !== id));
        res && toast.success('Requested Deny!', {
          duration: 4000
        });
      })
  }
  const showMore = (id, ind) => {
    getSingleAdminStratigysHi(id)
      .then(res => {
        setLOutCame(res.data[0]?.adminStrategie?.[ind]);
        setIndi(res.data[0]?.adminStrategie?.[ind]?._id);
      })
  }

  const showMore2 = (id, ind) => {
    getSingleAdminStratigysHi(id)
      .then(res => {
        setTeaching(res.data[0]?.adminStrategie?.[ind]);
        setIndi1(res.data[0]?.adminStrategie?.[ind]?._id);
      })
  }
  return (
    <>
      <Toaster
        position="top-right"
        reverseOrder={false}
      />
      {
        isLoading ? <div style={{ marginLeft: "500px", marginTop: "150px" }}>
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div> :
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
                        <Table key={index + 1} striped bordered hover size="sm" className={humBurgs ? 'd-none d-md-block table_overflow' : 'd-none d-md-block table_overflows'}>
                          <thead style={{ background: '#d5b39a' }}>
                            <tr>
                              <th>#</th>
                              <th>Id</th>
                              <th scope="col">विषय</th>
                              <th scope="col">श्रेणी</th>
                              <th scope="col">प्रमुख शीर्षक</th>
                              <th scope="col">शीर्षक</th>
                              <th scope="col">उप शीर्षक</th>
                              <th scope="col">उप-उप शीर्षक </th>
                              <th scope="col">विकासात्मक क्षेत्र 1</th>
                              <th scope="col">विकासात्मक क्षेत्र 2</th>
                              <th scope="col">शिक्षण का तरीका</th>
                              <th scope="col">शिक्षण के परिणाम</th>
                              <th scope="col">शिक्षण रणनीति</th>
                            </tr>
                          </thead>
                          <tbody>
                            {
                              <>
                                {data && data?.adminStrategie?.map((item, index) => (
                                  <tr key={index}>
                                    <td> {index + 1}</td>
                                    <td>{(item._id).slice(19, 26)}</td>
                                    <td>{item.विषय}</td>
                                    <td>{item.श्रेणी}</td>
                                    <td>{item['प्रमुख शीर्षक']}</td>
                                    <td>{item.शीर्षक}</td>
                                    <td>{item['उप शीर्षक']}</td>
                                    <td>{item['उप-उप शीर्षक']}</td>
                                    <td>{item['विकासात्मक क्षेत्र 1']}</td>
                                    <td>{item['विकासात्मक क्षेत्र 2']}</td>
                                    <td>{item['शिक्षण का तरीका']}</td>
                                    <td>
                                      {item?._id === indi ? lOutcome['शिक्षण के परिणाम'] : item['शिक्षण के परिणाम']?.slice(0, 20)}
                                      {item?._id !== indi ? <span className='text-primary' style={{ cursor: "pointer" }} onClick={() => showMore(data?._id, index)}>more..</span> : <span className='text-primary' style={{ cursor: "pointer" }} onClick={() => setIndi(null)}>less</span>}
                                    </td>
                                    <td>
                                      {item?._id === indi1 ? teaching['शिक्षण रणनीति'] : item['शिक्षण रणनीति']?.slice(0, 20)}
                                      {item?._id !== indi1 ? <span className='text-primary' style={{ cursor: "pointer" }} onClick={() => showMore2(data?._id, index)}>more..</span> : <span className='text-primary' style={{ cursor: "pointer" }} onClick={() => setIndi1(null)}>less</span>}
                                    </td>
                                  </tr>
                                ))}
                              </>
                            }

                          </tbody>
                        </Table>
                        <Table key={index} responsive striped bordered hover size="sm" className='d-block d-md-none w-100'>
                          <thead style={{ background: '#d5b39a' }}>
                            <tr>
                              <th>#</th>
                              <th>Id</th>
                              <th scope="col">विषय</th>
                              <th scope="col">श्रेणी</th>
                              <th scope="col">प्रमुख शीर्षक</th>
                              <th scope="col">शीर्षक</th>
                              <th scope="col">उप शीर्षक</th>
                              <th scope="col">उप-उप शीर्षक </th>
                              <th scope="col">विकासात्मक क्षेत्र 1</th>
                              <th scope="col">विकासात्मक क्षेत्र 2</th>
                              <th scope="col">शिक्षण का तरीका</th>
                              <th scope="col">शिक्षण के परिणाम</th>
                              <th scope="col">शिक्षण रणनीति</th>
                            </tr>
                          </thead>
                          <tbody>
                            {
                              <>
                                {data && data?.adminStrategie?.map((item, index) => (
                                  <tr key={index}>
                                    <td> {index + 1}</td>
                                    <td>{(item._id).slice(19, 26)}</td>
                                    <td>{item.विषय}</td>
                                    <td>{item.श्रेणी}</td>
                                    <td>{item?.['प्रमुख शीर्षक']}</td>
                                    <td>{item.शीर्षक}</td>
                                    <td>{item['उप शीर्षक']}</td>
                                    <td>{item['उप-उप शीर्षक']}</td>
                                    <td>{item['विकासात्मक क्षेत्र 1']}</td>
                                    <td>{item['विकासात्मक क्षेत्र 2']}</td>
                                    <td>{item['शिक्षण का तरीका']}</td>
                                    <td>
                                      {item?._id === indi ? lOutcome['शिक्षण के परिणाम'] : item['शिक्षण के परिणाम']?.slice(0, 20)}
                                      {item?._id !== indi ? <span className='text-primary' style={{ cursor: "pointer" }} onClick={() => showMore(data?._id, index)}>more..</span> : <span className='text-primary' style={{ cursor: "pointer" }} onClick={() => setIndi(null)}>less</span>}
                                    </td>
                                    <td>
                                      {item?._id === indi1 ? teaching['शिक्षण रणनीति'] : item['शिक्षण रणनीति']?.slice(0, 20)}
                                      {item?._id !== indi1 ? <span className='text-primary' style={{ cursor: "pointer" }} onClick={() => showMore2(data?._id, index)}>more..</span> : <span className='text-primary' style={{ cursor: "pointer" }} onClick={() => setIndi1(null)}>less</span>}
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
      }
    </>
  );
};

export default UploadHindistr;