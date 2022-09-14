import React from 'react';
import Table from 'react-bootstrap/Table';
import toast, { Toaster } from 'react-hot-toast';
import { deletRequestArrayidHi, getreqDeletHiStr, multidelHiStratigys } from '../../services/hindiStratigys';

const ReqDelHindiStr = () => {
  const [count, setcount] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);

  React.useEffect(() => {
    setIsLoading(true)
    getreqDeletHiStr()
      .then(res => {
        setcount(res.data);
      })
  }, [])

  const handleMultiDelet = (id, ids) => {
    multidelHiStratigys(ids)
      .then(res => {
        res && toast.success('Strategy deleted forever!');
        if (res) {
          deletRequestArrayidHi(id)
            .then(ress => {
              ress && setcount(count.filter(message => message._id !== id));
            })
        }
      })
  }
  const handleDeny = (id) => {
    deletRequestArrayidHi(id)
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

        </div>
        {
          count?.length === 0 || count === undefined ? "No Request send" :
            <>
              {
                count?.map((data, index) => (
                  <><div className="d-flex my-4">
                    <h3 className='me-3'>Request{index + 1} for Delet Strategies</h3>
                  </div>
                    <Table key={index} responsive striped bordered hover size="sm" className='w-100'>
                      <thead style={{ background: '#d5b39a' }}>
                        <tr>
                          <th></th>
                          <th>#</th>
                          <th scope="col">विषय</th>
                          <th scope="col">श्रेणी</th>
                          <th scope="col">कौशल</th>
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
                        {
                          <>
                            {data && data?.reqDel?.map((item, index) => (
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
                      <button onClick={() => handleMultiDelet(data?._id, data?.reqDelId)} className='btn btn-primary me-3'>Approve</button>
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

export default ReqDelHindiStr;