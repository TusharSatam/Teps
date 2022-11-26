import React from 'react';
import Table from 'react-bootstrap/Table';
import { FaRegTrashAlt } from 'react-icons/fa';
import { alldelStratigys, deletRequestArrayid, delStratigys, getMultitStr, getreqDeletStr, getSingleDelStr, multidelStratigys, updatestrDeletRq } from '../../services/stratigyes';
import { Spinner } from 'react-bootstrap';
import toast, { Toaster } from 'react-hot-toast';
import { useState } from 'react';
import { useAuth } from '../../Context/AuthContext';

const ReqAdminPanel = () => {
  const [count, setcount] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [showBtn, setShowbtn] = React.useState(false);
  const [lOutcome, setLOutCame] = React.useState();
  const [indi, setIndi] = React.useState();
  const [teaching, setTeaching] = React.useState();
  const [indi1, setIndi1] = React.useState();
  const { humBurgs } = useAuth()
  const [allCheck, setAllCheck] = React.useState(false);
  const [allDelid, setAllDelid] = React.useState(false);
  const [showId, setShowId] = React.useState(false);

  React.useEffect(() => {
    setIsLoading(true)
    getreqDeletStr()
      .then(res => {
        setcount(res.data);
        setIsLoading(false);
        console.log(res);
      })
  }, [])

  const [showCh, setshowCh] = React.useState([])
  const handleCheckbox = (ind, id) => {
    if (showCh.includes(ind)) {
      for (var i = 0; i < showCh.length; i++) {
        if (showCh[i] === ind) {
          showCh.splice(i, 1);
          i--;
        }
      }
    }
    else {
      showCh.push(ind)
    }
    setshowCh([...showCh], [showCh]);
    setShowId(id)
  }
  const handleMultiDelet = (id, ids) => {
    multidelStratigys(ids)
      .then(res => {
        res && toast.success('Strategy deleted forever!', {
          duration: 4000
        });
        if (res) {
          deletRequestArrayid(id)
            .then(ress => {
              ress && setcount(count.filter(message => message._id !== id));
            })
        }
      })
  }
  const handleDeny = (id) => {
    deletRequestArrayid(id)
      .then(res => {
        res && setcount(count.filter(message => message._id !== id));
        res && toast.error('Request denied!', {
          duration: 4000
        });
      })
  }
  const showMore = (id, ind) => {
    getSingleDelStr(id)
      .then(res => {
        setLOutCame(res.data[0]?.reqDel?.[ind]);
        setIndi(res.data[0]?.reqDel?.[ind]?._id);
      })
  }

  const showMore2 = (id, ind) => {
    getSingleDelStr(id)
      .then(res => {
        setTeaching(res.data[0]?.reqDel?.[ind]);
        setIndi1(res.data[0]?.reqDel?.[ind]?._id);
      })
  }


  const handleAllSelect = (id) => {
    if (allCheck) {
      setAllCheck(false)
      setshowCh([])
      setAllDelid('')
    }
    else {
      setAllCheck(true)
      const allId = count.filter(res => res._id === id);
      const allselectedId = allId[0].reqDel.map(stra => {
        return stra._id
      })
      setAllDelid(id)
      setShowId(id)
      setshowCh(allselectedId)
    }
  }
  const handleAllDelet = () => {
    multidelStratigys(showCh)
      .then(res => {
        res && toast.success('Strategy deleted forever!', {
          duration: 4000
        });
        if (res) {
          deletRequestArrayid(allDelid)
            .then(ress => {
              ress && setcount(count.filter(message => message._id !== allDelid));
            })
        }
      })
  }

  const handleAllDeny = () => {
    multidelStratigys(showCh)
      .then(res => {
        res && toast.success('Strategy Denied!', {
          duration: 4000
        });
        if (res) {
          deletRequestArrayid(allDelid)
            .then(ress => {
              ress && setcount(count.filter(message => message._id !== allDelid));
            })
        }
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
        </div>
          :
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
                        <h3 className='me-3'>Request {index + 1} for Delete Strategies</h3>
                      </div>
                        <div>
                          {
                            showId && showId.includes(data._id) ?
                              <>
                                {
                                  allCheck ?
                                    <div>
                                      <button onClick={handleAllDelet} className='btn btn-primary mb-3'>Approve All Strategies</button>
                                      <button onClick={handleAllDeny} className='btn btn-primary mb-3 mx-3'>Deny All Strategies</button>
                                    </div> :
                                    (allCheck === false && showCh.length > 0) ?
                                      <div>
                                        <button onClick={handleAllDelet} className='btn btn-primary mb-3'>Approve Selected Strategies</button>
                                        <button onClick={handleAllDeny} className='btn btn-primary mb-3 mx-3'>Deny Selected Strategies</button>
                                      </div> : ''

                                }
                              </> : ""
                          }

                        </div>
                        <Table key={index + 1} striped bordered hover size="sm" className={humBurgs ? 'd-none d-md-block table_overflowR' : 'd-none d-md-block table_overflowsR'}>
                          <thead style={{ background: '#d5b39a' }}>
                            <tr>
                              <th><input type="checkbox" checked={allDelid && allDelid.includes(data._id)} onChange={() => handleAllSelect(data._id)} name="" id="" /></th>
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
                                {data && data?.reqDel?.map((item, index) => (
                                  <tr key={index}>
                                    <td><input type="checkbox" checked={showCh.includes(item._id)} onChange={() => handleCheckbox(item._id, data._id)} name="" id="" /></td>
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
                                      {item?._id === indi ? lOutcome['Learning Outcome'] : item['Learning Outcome']?.slice(0, 20)}
                                      {item?._id !== indi ? <span className='text-primary' style={{ cursor: "pointer" }} onClick={() => showMore(data?._id, index)}>more..</span> : <span className='text-primary' style={{ cursor: "pointer" }} onClick={() => setIndi(null)}>less</span>}
                                    </td>
                                    <td>
                                      {item?._id === indi1 ? teaching['Teaching Strategy'] : item['Teaching Strategy']?.slice(0, 20)}
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
                                {data && data?.reqDel?.map((item, index) => (
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
                                      {item?._id === indi ? lOutcome['Learning Outcome'] : item['Learning Outcome']?.slice(0, 20)}
                                      {item?._id !== indi ? <span className='text-primary' style={{ cursor: "pointer" }} onClick={() => showMore(data?._id, index)}>more..</span> : <span className='text-primary' style={{ cursor: "pointer" }} onClick={() => setIndi(null)}>less</span>}
                                    </td>
                                    <td>
                                      {item?._id === indi1 ? teaching['Teaching Strategy'] : item['Teaching Strategy']?.slice(0, 20)}
                                      {item?._id !== indi1 ? <span className='text-primary' style={{ cursor: "pointer" }} onClick={() => showMore2(data?._id, index)}>more..</span> : <span className='text-primary' style={{ cursor: "pointer" }} onClick={() => setIndi1(null)}>less</span>}
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
      }
    </>
  );
};

export default ReqAdminPanel;