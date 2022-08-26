import React from 'react';
import toast, { Toaster } from 'react-hot-toast';
import Table from 'react-bootstrap/Table';
import { delAdminStratigysHi, getAllAdminStratigysHi } from '../../../services/adminStrUploadHi';
import axios from 'axios';

const UploadHindistr = () => {
  const [count, setcount] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);
  React.useEffect(() => {
    setIsLoading(true)
    getAllAdminStratigysHi()
      .then(res => {
        setcount(res.data);
      })
  }, [])
  console.log(count);


  const handleMultiDelet = (id, csvData) => {
    const config = {
      "Access-Control-Allow-Origin": "*"
    }
    axios.post('hindstrategies', csvData, { config })
      .then(res => {
        toast.success('strategies Uploaded!')
        delAdminStratigysHi(id)
          .then(ress => {
            ress && setcount(count.filter(message => message._id !== id));
          })
      })
      .catch(err => console.log(err))
  }
  const handleDeny = (id) => {
    delAdminStratigysHi(id)
      .then(res => {
        res && setcount(count.filter(message => message._id !== id));
        res && toast.success('Requested Deny!');
      })
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
                    <Table key={index} responsive striped bordered hover size="sm" className='w-100'>
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
                                <td>{item.विषय}</td>
                                <td>{item.श्रेणी}</td>
                                <td>{item.कौशल}</td>
                                <td>{item.शीर्षक}</td>
                                <td>{item['उप शीर्षक']}</td>
                                <td>{item['उप-उप शीर्षक']}</td>
                                <td>{item['विकासात्मक क्षेत्र 1']}</td>
                                <td>{item['विकासात्मक क्षेत्र 2']}</td>
                                <td>{item['शिक्षण का तरीका']}</td>
                                <td>
                                  {item['शिक्षण के परिणाम']?.slice(0, 20)}
                                </td>
                                <td>
                                  {item['शिक्षण रणनीति']?.slice(0, 20)}
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

export default UploadHindistr;