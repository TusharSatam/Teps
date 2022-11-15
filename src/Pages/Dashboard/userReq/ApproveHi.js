import React from 'react';
import { Table } from 'react-bootstrap';
import toast, { Toaster } from 'react-hot-toast';
import { FaRegEdit, FaRegTrashAlt } from 'react-icons/fa';
import UserHiStratigyEdit from '../../../Components/DashboardModal/UserHiStratigyEdit';
import { delApproveUserStratigysHi, getUserStratigysHi, multidelUserStratigysHi, singleUserHiStratigys } from '../../../services/userStratigyHi';

const ApproveHi = () => {
  const [show, setShow] = React.useState(false);
  const [enStr, setEnStr] = React.useState([])
  const [showCh, setshowCh] = React.useState([]);
  const [allCheck, setAllCheck] = React.useState(false);
  const handleClose = () => setShow(false);
  const [singleStr, setSingleStr] = React.useState({});

  React.useEffect(() => {
    getUserStratigysHi()
      .then(res => {
        setEnStr(res.data?.filter(res => res.Approve === true))
      })
  }, [])

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
          showCh.length !== 0 &&
          <button onClick={handleMultiDelet} className={"btn btn-primary mb-3"}>Delete Selected Strategies</button>
        }
        <Table striped bordered hover size="sm" className={'d-none d-md-block '}>
          <thead style={{ background: '#d5b39a' }}>
            <tr>
              <th><input type="checkbox" checked={allCheck} onChange={handleAllSelect} name="" id="" /></th>
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
      </>
    </div>
  );
};

export default ApproveHi;