import React from 'react';
import Table from 'react-bootstrap/Table';
import { FaRegTrashAlt } from 'react-icons/fa';
import { alldelStratigys, deletRequestArrayid, delStratigys, getMultitStr, getreqDeletStr, multidelStratigys, updatestrDeletRq } from '../../services/stratigyes';
import { Spinner } from 'react-bootstrap';
import toast, { Toaster } from 'react-hot-toast';
import { useState } from 'react';

const ReqAdminPanel = () => {
  const [count, setcount] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [showBtn, setShowbtn] = React.useState(false);
  const [lOutcome, setLOutCame] = React.useState();
  const [indi, setIndi] = React.useState();
  const [teaching, setTeaching] = React.useState();
  const [indi1, setIndi1] = React.useState();
  React.useEffect(() => {
    setIsLoading(true)
    getreqDeletStr()
      .then(res => {
        setcount(res.data);
      })
  }, [])
  console.log(count);
  // const showMore = (index) => {
  //   const show = count?.[index];
  //   setLOutCame(show);
  //   setIndi(index);
  // }

  // const showMore2 = (index) => {
  //   const show = count?.[index];
  //   setTeaching(show);
  //   setIndi1(index);
  // }

  // const handleDelet = (id) => {
  //   delStratigys(id)
  //     .then(res => {
  //       const delArray = deletArray.indexOf(id);
  //       deletArray.splice(delArray, 1);
  //       updatestrDeletRq(deletArrayid, deletArray)
  //         .then(res => {
  //           console.log(res);
  //           setshowCh([])
  //         })
  //       res && setcount(count.filter(message => message._id !== id));
  //       res && toast.success('strategie Deleted!')
  //     })
  // }

  const [showCh, setshowCh] = React.useState([])
  const handleCheckbox = (ind) => {
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
  }
  // const handleallDelet = () => {
  //   multidelStratigys(deletArray)
  //     .then(res => {
  //       console.log(res);
  //       res && setcount([]);
  //       res && toast.success('All Strategies Deleted!');
  //       setdeletArray([])
  //       updatestrDeletRq(deletArrayid, deletArray)
  //         .then(res => {
  //           console.log(res);
  //           setshowCh([])
  //         })
  //     })
  // }
  const handleMultiDelet = (id, ids) => {
    multidelStratigys(ids)
      .then(res => {
        res && toast.success('Strategy deleted forever!');
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
        res && toast.success('Request denied!');
      })
  }
  const [seeMore, setSeeMore] = useState(false);
  const handleSee = () => {
    if (seeMore) {
      setSeeMore(false)
    }
    else {
      setSeeMore(true)
    }
  }

  const [seeMore2, setSeeMore2] = useState(false);
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
                    <h3 className='me-3'>Request{index + 1} for Delet Strategies</h3>
                    {/* {
                      showBtn &&
                      <button onClick={handleMultiDelet} className='btn btn-primary mx-3'>Delete Selected Strategies</button>
                    } */}
                  </div>
                    <Table style={{ width: "100px" }} key={index} striped bordered hover size="sm" className='d-none d-md-block'>
                      <thead style={{ background: '#d5b39a' }}>
                        <tr>
                          {/* <th></th> */}
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
                          {/* <th scope="col"></th> */}
                        </tr>
                      </thead>
                      <tbody>
                        {
                          // isLoading ? <div style={{ marginLeft: "500px", marginTop: "150px" }}>
                          //   <Spinner animation="border" role="status">
                          //     <span className="visually-hidden">Loading...</span>
                          //   </Spinner>
                          // </div> :
                          <>
                            {data && data?.reqDel?.map((item, index) => (
                              <tr key={index}>
                                {/* <td><input type="checkbox" checked={showCh.includes(item._id)} onChange={() => handleCheckbox(item._id)} name="" id="" /></td> */}
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
                    <Table key={index} responsive striped bordered hover size="sm" className='d-block d-md-none w-100'>
                      <thead style={{ background: '#d5b39a' }}>
                        <tr>
                          {/* <th></th> */}
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
                          {/* <th scope="col"></th> */}
                        </tr>
                      </thead>
                      <tbody>
                        {
                          // isLoading ? <div style={{ marginLeft: "500px", marginTop: "150px" }}>
                          //   <Spinner animation="border" role="status">
                          //     <span className="visually-hidden">Loading...</span>
                          //   </Spinner>
                          // </div> :
                          <>
                            {data && data?.reqDel?.map((item, index) => (
                              <tr key={index}>
                                {/* <td><input type="checkbox" checked={showCh.includes(item._id)} onChange={() => handleCheckbox(item._id)} name="" id="" /></td> */}
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

export default ReqAdminPanel;