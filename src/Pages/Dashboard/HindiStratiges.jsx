import React from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { Link } from 'react-router-dom';
import Table from 'react-bootstrap/Table';
import { FaRegEdit, FaRegTrashAlt } from 'react-icons/fa';
import { delHindiStratigys, getHindiStratigys, singleHindiStratigys } from '../../services/hindiStratigys';
import EditHindiStratigyModal from '../../Components/DashboardModal/EditHindiStratigyModal';

const HindiStratiges = () => {
  const [stratigys, setStratigys] = React.useState([]);
  const [str, setStr] = React.useState([]);
  const [pageCount, setPageCount] = React.useState(1);
  const [lOutcome, setLOutCame] = React.useState();
  const [indi, setIndi] = React.useState();
  const [teaching, setTeaching] = React.useState();
  const [indi1, setIndi1] = React.useState();
  const [show, setShow] = React.useState(false);
  const [singleStr, setSingleStr] = React.useState();
  const handleClose = () => setShow(false);
  React.useEffect(() => {
    getHindiStratigys(pageCount)
      .then(res => {
        setStratigys(res.data);
        setStr(res.data.posts)
      })
  }, [pageCount]);
  const handlePrevious = () => {
    setPageCount(parseInt(pageCount) - 1)
  }

  const handleNext = () => {
    setPageCount(parseInt(pageCount) + 1)
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
    delHindiStratigys(id)
      .then(res => {
        res && setStr(str.filter(message => message._id !== id));
        res && toast.success('strategie Deleted!')
      })
  }
  const handleEdit = (id) => {
    singleHindiStratigys(id)
      .then(res => {
        setSingleStr(res[0]);
        setShow(true)
      })
  }
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
      <div className="d-flex justify-content-end">
        <Link to="/admin-upload-hi-stratigy"> <button className='d-none d-md-block btn btn-primary'>Add Strategies</button></Link>
      </div>
      <div className='stratigysTable'>
        <div className="container">
          <div className="d-flex justify-content-between">
            <h3>सभी रणनीतियाँ</h3>
            <div className="d-block d-md-none mb-3">
              <Link to="/admin-upload-hi-stratigy"> <button className='btn btn-primary'>Add Strategies</button></Link>
            </div>
          </div>
          <Table responsive striped bordered hover size="sm" className='w-100'>
            <thead>
              <tr>
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
                str?.map((item, index) => (
                  <tr key={index}>
                    <td>{stratigys?.currentPage === '1' ? index + 1 :
                      (parseInt(stratigys?.currentPage) - 1) * 50 + (index + 1)
                    }</td>
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
                      {index !== indi ? <span className='text-primary' style={{ cursor: "pointer" }} onClick={() => showMore(index)}>more..</span> : ''}
                    </td>
                    <td>
                      {index === indi1 ? teaching['शिक्षण रणनीति'] : item['शिक्षण रणनीति']?.slice(0, 20)}
                      {index !== indi1 ? <span className='text-primary' style={{ cursor: "pointer" }} onClick={() => showMore2(index)}>more..</span> : ''}
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

            </tbody>
          </Table>
        </div>
      </div>
      <div className='container'>
        <button onClick={handlePrevious} disabled={stratigys?.currentPage === '1'} className='btn btn-success me-3'>Previous</button>
        <button onClick={handleNext} disabled={parseInt(stratigys?.currentPage) === stratigys?.totalPages} className='btn btn-success'>Next</button>
      </div>
    </div>
  );
};

export default HindiStratiges;