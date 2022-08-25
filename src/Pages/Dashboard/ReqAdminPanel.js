import React from 'react';
import Table from 'react-bootstrap/Table';
import { FaRegTrashAlt } from 'react-icons/fa';
import { alldelStratigys, delStratigys, getMultitStr, getreqDeletStr, multidelStratigys, updatestrDeletRq } from '../../services/stratigyes';
import { Spinner } from 'react-bootstrap';
import toast, { Toaster } from 'react-hot-toast';

const ReqAdminPanel = () => {
  const [count, setcount] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [lOutcome, setLOutCame] = React.useState();
  const [indi, setIndi] = React.useState();
  const [teaching, setTeaching] = React.useState();
  const [indi1, setIndi1] = React.useState();
  const [deletArray, setdeletArray] = React.useState([]);
  const [deletArrayid, setdeletArrayid] = React.useState();

  React.useEffect(() => {
    setIsLoading(true)
    getreqDeletStr()
      .then(res => {
        setdeletArray(res?.data[0]?.reqDel)
        setdeletArrayid(res?.data[0]?._id)
        getMultitStr(res?.data[0]?.reqDel)
          .then(ress => {
            console.log(ress);
            setIsLoading(false)
            setcount(ress?.data);
          })
      })
  }, [])

  const showMore = (index) => {
    const show = count?.[index];
    setLOutCame(show);
    setIndi(index);
  }

  const showMore2 = (index) => {
    const show = count?.[index];
    setTeaching(show);
    setIndi1(index);
  }

  const handleDelet = (id) => {
    delStratigys(id)
      .then(res => {
        const delArray = deletArray.indexOf(id);
        deletArray.splice(delArray, 1);
        updatestrDeletRq(deletArrayid, deletArray)
          .then(res => {
            console.log(res);
            setshowCh([])
          })
        res && setcount(count.filter(message => message._id !== id));
        res && toast.success('strategie Deleted!')
      })
  }
  console.log(deletArray);
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
  const handleallDelet = () => {
    multidelStratigys(deletArray)
      .then(res => {
        console.log(res);
        res && setcount([]);
        res && toast.success('All Strategies Deleted!');
      })
  }
  const handleMultiDelet = () => {
    multidelStratigys(showCh)
      .then(res => {
        res && setcount(count.filter(message => !showCh.includes(message._id)));
        res && toast.success('Selected Strategies Deleted!');
        setshowCh([])
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
          <button onClick={handleallDelet} className='btn btn-primary '>Delete All Strategies</button>
          {
            showCh.length !== 0 &&
            <button onClick={handleMultiDelet} className='btn btn-primary mx-3'>Delete Selected Strategies</button>
          }
        </div>
        <div className="d-flex justify-content-between">
          <h3>Request for Delet Strategies</h3>
        </div>
        {
          count?.length === 0 || count === undefined ? "No Request send" :
            <Table responsive striped bordered hover size="sm" className='w-100'>
              <thead style={{ background: '#d5b39a' }}>
                <tr>
                  <th></th>
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
                      {count && count?.map((item, index) => (
                        <tr key={index}>
                          <td><input type="checkbox" checked={showCh.includes(item._id)} onChange={() => handleCheckbox(item._id)} name="" id="" /></td>
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
                            {index === indi ? lOutcome['Learning Outcome'] : item['Learning Outcome']?.slice(0, 20)}
                            {index !== indi ? <span className='text-primary' style={{ cursor: "pointer" }} onClick={() => showMore(index)}>more..</span> : <span className='text-primary' style={{ cursor: "pointer" }} onClick={() => setIndi(null)}>less</span>}
                          </td>
                          <td>
                            {index === indi1 ? teaching['Teaching Strategy'] : item['Teaching Strategy']?.slice(0, 20)}
                            {index !== indi1 ? <span className='text-primary' style={{ cursor: "pointer" }} onClick={() => showMore2(index)}>more..</span> : <span className='text-primary' style={{ cursor: "pointer" }} onClick={() => setIndi1(null)}>less</span>}
                          </td>
                          <td>
                            <button onClick={() => handleDelet(item._id)} className='btn p-0 me-2'>
                              <FaRegTrashAlt />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </>
                }

              </tbody>
            </Table>}
      </div>
    </>
  );
};

export default ReqAdminPanel;