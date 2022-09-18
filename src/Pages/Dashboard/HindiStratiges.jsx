import React from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { Link } from 'react-router-dom';
import Table from 'react-bootstrap/Table';
import { FaRegEdit, FaRegTrashAlt } from 'react-icons/fa';
import { delHindiStratigys, getAllHindiStratigys, getHindiStratigys, getMultitHiStr, getreqDeletHiStr, multidelHiStratigys, reqDeletHiStr, singleHindiStratigys } from '../../services/hindiStratigys';
import EditHindiStratigyModal from '../../Components/DashboardModal/EditHindiStratigyModal';
import { Spinner } from 'react-bootstrap';
import { CSVLink } from 'react-csv';
import { useAuth } from '../../Context/AuthContext';

const HindiStratiges = () => {
  const { admin, humBurgs } = useAuth()
  const [stratigys, setStratigys] = React.useState([]);
  const [str, setStr] = React.useState([]);
  const [pageCount, setPageCount] = React.useState(1);
  const [lOutcome, setLOutCame] = React.useState();
  const [indi, setIndi] = React.useState();
  const [teaching, setTeaching] = React.useState();
  const [indi1, setIndi1] = React.useState();
  const [show, setShow] = React.useState(false);
  const [singleStr, setSingleStr] = React.useState();
  const [isLoading, setIsLoading] = React.useState(false);
  const [allCheck, setAllCheck] = React.useState(false);


  const handleClose = () => setShow(false);
  React.useEffect(() => {
    setIsLoading(true)
    getHindiStratigys(pageCount)
      .then(res => {
        setStratigys(res.data);
        setStr(res.data.posts)
        setIsLoading(false)
      })
  }, [pageCount]);
  const handlePrevious = () => {
    setPageCount(parseInt(pageCount) - 1)
  }

  const handleNext = () => {
    setPageCount(parseInt(pageCount) + 1)
    setAllCheck(false)
  }

  const showMore = (index) => {
    const show = stratigys?.posts[index];
    setLOutCame(show);
    setIndi(index);
  }

  const showMore2 = (index) => {
    const show = stratigys?.posts[index];
    setTeaching(show);
    setIndi1(index);
  }

  const handleDelet = (id) => {
    if (admin.type === 'super-admin') {
      delHindiStratigys(id)
        .then(res => {
          res && setStr(str.filter(message => message._id !== id));
          res && toast.success('Strategy Deleted!', {
            duration: 4000
          })
        })
    }
    else {
      getreqDeletHiStr()
        .then(getDel => {
          const findOut = getDel?.data?.map(dt => dt?.reqDelId?.includes(id));
          if (findOut.includes(true)) {
            toast.error('Alredy Submited for Deletion!', {
              duration: 4000
            });
          }
          else {
            getMultitHiStr(id)
              .then(res => {
                reqDeletHiStr(res.data, [id])
                  .then(res => {
                    res && toast.success('Request sent for delete!', {
                      duration: 4000
                    });
                    setshowCh([])
                  })
              })
          }
        })
    }
  }



  const handleEdit = (id) => {
    singleHindiStratigys(id)
      .then(res => {
        setSingleStr(res[0]);
        setShow(true)
      })
  }
  const [showCh, setshowCh] = React.useState([])
  const handleCheckbox = (ind) => {
    if (admin.type !== 'super-admin') {
      getreqDeletHiStr()
        .then(getDel => {
          const findOut = getDel?.data?.map(dt => dt?.reqDelId?.includes(ind));
          if (findOut.includes(true)) {
            toast.error('Alredy Submited for Deletion!', {
              duration: 4000
            });
          }
          else {
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
        })
    }
    else {
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
  }
  const [allStratigy, setAllStratiy] = React.useState()
  React.useEffect(() => {
    getAllHindiStratigys()
      .then(res => {
        setAllStratiy(res.data)
      })
  }, [])
  const csvData = str ? str : [];
  const handleMultiDelet = () => {
    if (admin.type === 'super-admin') {
      multidelHiStratigys(showCh)
        .then(res => {
          res && setStr(str.filter(message => !showCh.includes(message._id)));
          res && toast.success('Selected Strategies Deleted!', {
            duration: 4000
          });
          setshowCh([])
          setAllCheck(false)
        })
    }
    else {
      getMultitHiStr(showCh)
        .then(res => {
          reqDeletHiStr(res.data, showCh)
            .then(res => {
              res && toast.success('Request sent for delete!', {
                duration: 4000
              });
              setshowCh([])
              setAllCheck(false)
            })
        })
    }
  }


  const allselectedId = str.map(stra => {
    return stra._id
  })

  const handleAllSelect = () => {
    if (allCheck) {
      setAllCheck(false)
      setshowCh([])
    }
    else {
      setAllCheck(true)
      setshowCh(allselectedId)
    }
  }
  React.useEffect(() => {
    if (allCheck) {
      if (showCh) {
        getreqDeletHiStr()
          .then(getDel => {
            const findOut = getDel?.data?.map(dt => dt?.reqDelId);
            if (findOut) {
              for (var i = 0; i < findOut.length; i++) {
                for (var j = 0; j < showCh.length; j++) {
                  if (findOut[i]?.includes(showCh[j])) {
                    showCh.splice(j, 1);
                    j--;
                  }
                }
              }
            }
            else {
              showCh.push(allselectedId)
            }
            setshowCh([...showCh], [showCh]);
          })
      }
    }
    console.log(showCh);
  }, [allCheck])
  return (
    <div>
      <Toaster
        position="top-right"
        reverseOrder={false}
      />
      <EditHindiStratigyModal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        data={singleStr}
        setShow={setShow}
        setStratigys={setStr}
      />
      {
        showCh.length !== 0 ?
          <div className="container d-flex justify-content-between mb-3">
            <div className='d-flex'>
              {/* <button onClick={handleallDelet} className='btn btn-primary '>Delete All Strategies</button> */}
              {
                admin.type === 'super-admin' && <CSVLink className=' btn btn-primary me-4' data={csvData}>Download All Strategies</CSVLink>
              }
              <button onClick={handleMultiDelet} className={admin.type === 'super-admin' ? "btn btn-primary" : "btn btn-primary"}>Delete Selected Strategies</button>
            </div>
            <Link to="/admin-upload-hi-stratigy"> <button className='d-none d-md-block btn btn-primary'>Add Strategies</button></Link>
          </div> :
          <div className="container d-flex justify-content-between mb-3">
            <div>
              {/* <button onClick={handleallDelet} className='btn btn-primary me-4'>Delete All Strategies</button> */}
              {
                admin.type === 'super-admin' && <CSVLink className='btn btn-primary' data={csvData}>Download All Strategies</CSVLink>
              }
            </div>
            <Link to="/admin-upload-hi-stratigy"> <button className='d-none d-md-block btn btn-primary'>Add Strategies</button></Link>
          </div>
      }
      <div className='stratigysTable'>
        <div className="container">
          <div className="d-flex justify-content-between">
            <h3>सभी रणनीतियाँ</h3>
            <div className="d-block d-md-none mb-3">
              <Link to="/admin-upload-hi-stratigy"> <button className='btn btn-primary'>Add Strategies</button></Link>
            </div>
          </div>
          <Table striped bordered hover size="sm" className={humBurgs ? 'd-none d-md-block table_overflow' : 'd-none d-md-block table_overflows'}>
            <thead style={{ background: '#d5b39a' }}>
              <tr>
                <th><input type="checkbox" checked={allCheck} onChange={handleAllSelect} name="" id="" /></th>
                <th>#</th>
                <th>Id</th>
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
                isLoading ? <div style={{ marginLeft: "500px", marginTop: "150px" }}>
                  <Spinner animation="border" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </Spinner>
                </div> :
                  <>
                    {
                      str?.map((item, index) => (
                        <tr key={index}>
                          <td><input type="checkbox" checked={showCh.includes(item._id)} onChange={() => handleCheckbox(item._id)} name="" id="" /></td>
                          <td>{stratigys?.currentPage === '1' ? index + 1 :
                            (parseInt(stratigys?.currentPage) - 1) * 100 + (index + 1)
                          }</td>
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
                            {index === indi ? lOutcome['शिक्षण के परिणाम'] : item['शिक्षण के परिणाम']?.slice(0, 20)}
                            {index !== indi ? <span className='text-primary' style={{ cursor: "pointer" }} onClick={() => showMore(index)}>more..</span> : <span className='text-primary' style={{ cursor: "pointer" }} onClick={() => setIndi(null)}>less</span>}
                          </td>
                          <td>
                            {index === indi1 ? teaching['शिक्षण रणनीति'] : item['शिक्षण रणनीति']?.slice(0, 20)}
                            {index !== indi1 ? <span className='text-primary' style={{ cursor: "pointer" }} onClick={() => showMore2(index)}>more..</span> : <span className='text-primary' style={{ cursor: "pointer" }} onClick={() => setIndi1(null)}>less</span>}
                          </td>
                          <td>
                            <button onClick={() => handleDelet(item._id)} className='btn p-0 me-2'>
                              <FaRegTrashAlt />
                            </button>
                            <button className='btn p-0' onClick={() => handleEdit(item._id)}><FaRegEdit /></button>
                          </td>
                        </tr>
                      ))
                    }
                  </>

              }

            </tbody>
          </Table>
          <Table responsive striped bordered hover size="sm" className='d-block d-md-none w-100'>
            <thead style={{ background: '#d5b39a' }}>
              <tr>
                <th><input type="checkbox" checked={allCheck} onChange={handleAllSelect} name="" id="" /></th>
                <th>#</th>
                <th>Id</th>
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
                isLoading ? <div style={{ marginLeft: "500px", marginTop: "150px" }}>
                  <Spinner animation="border" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </Spinner>
                </div> :
                  <>
                    {
                      str?.map((item, index) => (
                        <tr key={index}>
                          <td><input type="checkbox" checked={showCh.includes(item._id)} onChange={() => handleCheckbox(item._id)} name="" id="" /></td>
                          <td>{stratigys?.currentPage === '1' ? index + 1 :
                            (parseInt(stratigys?.currentPage) - 1) * 100 + (index + 1)
                          }</td>
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
                            {index === indi ? lOutcome['शिक्षण के परिणाम'] : item['शिक्षण के परिणाम']?.slice(0, 20)}
                            {index !== indi ? <span className='text-primary' style={{ cursor: "pointer" }} onClick={() => showMore(index)}>more..</span> : <span className='text-primary' style={{ cursor: "pointer" }} onClick={() => setIndi(null)}>less</span>}
                          </td>
                          <td>
                            {index === indi1 ? teaching['शिक्षण रणनीति'] : item['शिक्षण रणनीति']?.slice(0, 20)}
                            {index !== indi1 ? <span className='text-primary' style={{ cursor: "pointer" }} onClick={() => showMore2(index)}>more..</span> : <span className='text-primary' style={{ cursor: "pointer" }} onClick={() => setIndi1(null)}>less</span>}
                          </td>
                          <td>
                            <button onClick={() => handleDelet(item._id)} className='btn p-0 me-2'>
                              <FaRegTrashAlt />
                            </button>
                            <button className='btn p-0' onClick={() => handleEdit(item._id)}><FaRegEdit /></button>
                          </td>
                        </tr>
                      ))
                    }
                  </>

              }

            </tbody>
          </Table>
        </div>
      </div>
      <div className='container'>
        <p className='fw-bold'>{stratigys?.currentPage} Of {stratigys?.totalPages}</p>
        <button onClick={handlePrevious} disabled={stratigys?.currentPage === '1'} className='btn btn-success me-3'>Previous</button>
        <button onClick={handleNext} disabled={parseInt(stratigys?.currentPage) === stratigys?.totalPages} className='btn btn-success'>Next</button>
      </div>
    </div>
  );
};

export default HindiStratiges;