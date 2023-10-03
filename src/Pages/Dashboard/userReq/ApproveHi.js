import React from 'react';
import { Spinner, Table } from 'react-bootstrap';
import { CSVLink } from 'react-csv';
import toast, { Toaster } from 'react-hot-toast';
import { FaRegEdit, FaRegTrashAlt } from 'react-icons/fa';
import UserHiStratigyEdit from '../../../Components/DashboardModal/UserHiStratigyEdit';
import { useAuth } from '../../../Context/AuthContext';
import { delApproveUserStratigysHi, getUserPaginationHindiStratigys, multidelUserStratigysHi, singleUserHiStratigys } from '../../../services/userStratigyHi';

const ApproveHi = () => {
  const [show, setShow] = React.useState(false);
  const [enStr, setEnStr] = React.useState([])
  const [showCh, setshowCh] = React.useState([]);
  const [allCheck, setAllCheck] = React.useState(false);
  const handleClose = () => setShow(false);
  const [singleStr, setSingleStr] = React.useState({});
  const [isLoading, setIsLoading] = React.useState(false);
  const { humBurgs } = useAuth()
  const [stratigys, setStratigys] = React.useState([]);
  const [pageCount, setPageCount] = React.useState(1);
  const { admin } = useAuth()
  React.useEffect(() => {
    setIsLoading(true)
    getUserPaginationHindiStratigys(pageCount)
      .then(res => {
        setEnStr(res.data?.posts.filter(res => res.Approve === true))
        setIsLoading(false)
        setStratigys(res.data)
      })
  }, [])
  const csvData = enStr ? enStr : [];
  const allselectedId = enStr.map(stra => {
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
  const handleMultiDelet = () => {
    multidelUserStratigysHi(showCh)
      .then(res => {
        res && setEnStr(enStr.filter(message => !showCh.includes(message._id)));
        res && toast.success('Selected Strategies Deleted!', {
          duration: 4000
        });
        setshowCh([])
        setAllCheck(false)
      })
  }
  const handleDelet = (id) => {
    delApproveUserStratigysHi(id)
      .then(res => {
        res && setEnStr(enStr.filter(message => message._id !== id));
        res && toast.success('Strategy Deleted!', {
          duration: 4000
        });
      })
  }
  const handleEdit = (id) => {
    singleUserHiStratigys(id)
      .then(res => {
        setSingleStr(res?.data[0]);
        setShow(true)
      })
  }
  const handlePrevious = () => {
    setPageCount(parseInt(pageCount) - 1)
  }

  const handleNext = () => {
    setPageCount(parseInt(pageCount) + 1)
    setAllCheck(false)
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
      <>
        {
          isLoading ? <div style={{ marginLeft: "500px", marginTop: "150px" }}>
            <Spinner animation="border" role="status">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          </div>
            :
            <>
              <div className='d-flex mb-3'>
                {
                  admin.type === 'super-admin' && <CSVLink className=' btn btn-primary me-4' data={csvData}>Download All Strategies</CSVLink>
                }
                {
                  showCh.length !== 0 &&
                  <button onClick={handleMultiDelet} className={"btn btn-primary mb-3"}>Delete Selected Strategies</button>
                }
              </div>
              <Table striped bordered hover size="sm" className={humBurgs ? 'd-none d-md-block table_overflow' : 'd-none d-md-block table_overflows'}>
                <thead style={{ background: '#d5b39a' }}>
                  <tr>
                    <th><input type="checkbox" checked={allCheck} onChange={handleAllSelect} name="" id="" /></th>
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
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {
                    enStr.map((item, index) => (
                      <tr key={index}>
                        <td><input type="checkbox" checked={showCh.includes(item._id)} onChange={() => handleCheckbox(item._id)} name="" id="" /></td>
                        <td>{stratigys?.currentPage === '1' ? index + 1 :
                          (parseInt(stratigys?.currentPage) - 1) * 100 + (index + 1)
                        }</td>
                        <td>{(item._id).slice(19, 26)}</td>
                        <td>{item.विषय}</td>
                        <td>{item.श्रेणी}</td>
                        <td>{item['अच्छा विषय']}</td>
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
                        <td>
                          <button onClick={() => handleDelet(item._id)} className='btn p-0 me-2'>
                            <FaRegTrashAlt />
                          </button>
                          <button onClick={() => handleEdit(item._id)} className='btn p-0'><FaRegEdit /></button>
                        </td>
                      </tr>
                    ))
                  }
                </tbody>
              </Table>
              <Table striped bordered hover size="sm" className="d-block d-md-none">
                <thead style={{ background: '#d5b39a' }}>
                  <tr>
                    <th><input type="checkbox" checked={allCheck} onChange={handleAllSelect} name="" id="" /></th>
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
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {
                    enStr.map((item, index) => (
                      <tr key={index}>
                        <td><input type="checkbox" checked={showCh.includes(item._id)} onChange={() => handleCheckbox(item._id)} name="" id="" /></td>
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
                        <td>
                          <button onClick={() => handleDelet(item._id)} className='btn p-0 me-2'>
                            <FaRegTrashAlt />
                          </button>
                          <button onClick={() => handleEdit(item._id)} className='btn p-0'><FaRegEdit /></button>
                        </td>
                      </tr>
                    ))
                  }
                </tbody>
              </Table>
              <div className='container pb-3'>
                <p className='fw-bold'>{stratigys?.currentPage} Of {stratigys?.totalPages}</p>
                <button onClick={handlePrevious} disabled={stratigys?.currentPage === '1'} className='btn btn-success me-3'>Previous</button>
                <button onClick={handleNext} disabled={parseInt(stratigys?.currentPage) === stratigys?.totalPages} className='btn btn-success'>Next</button>
              </div>
            </>

        }
      </>

    </div>
  );
};

export default ApproveHi;