import axios from 'axios';
import React from 'react';
import * as XLSX from 'xlsx/xlsx.mjs';
import toast, { Toaster } from 'react-hot-toast';
import { useAuth } from '../../Context/AuthContext';

const UploadStratigys = () => {
  const [csvData, setCsvData] = React.useState([]);
  const [fileName, setFIleName] = React.useState('');
  const { admin } = useAuth()
  const readUploadFile = (e) => {
    e.preventDefault();
    setFIleName(e.target.files[0]?.name);
    if (e.target.files) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const data = e.target.result;
        const workbook = XLSX.read(data, { type: "array" });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const json = XLSX.utils.sheet_to_json(worksheet);
        setCsvData(json);
      };
      reader.readAsArrayBuffer(e.target.files[0]);
    }
  }
  const handleFile = (e) => {
    e.preventDefault();
    const config = {
      "Access-Control-Allow-Origin": "*"
    }
    if (admin.type === 'super-admin') {
      axios.post('strategies', csvData, { config })
        .then(res => {
          toast.success('Strategies Uploaded!', {
            duration: 4000
          })
          e.target.reset()
        })
        .catch(err => console.log(err))
    }
    else {
      const data = {
        "adminStrategie": csvData
      }
      axios.post('adminStrategies', data, { config })
        .then(res => {
          console.log(res);
          toast.success('Request send for upload!', {
            duration: 4000
          })
          e.target.reset()
        })
        .catch(err => console.log(err))
    }
  }
  return (
    <>
      <Toaster
        position="top-right"
        reverseOrder={false}
      />
      <p className='text-center fs-2 fw-bold pb-2'>Upload Strategies File</p>
      <div className='d-flex justify-content-center'>
        <form onSubmit={handleFile}>
          <input required type="file" accept=".csv,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" name="upload" onChange={readUploadFile} multiple />
          <div className='d-flex justify-content-center'>
            <button type="submit" className='btn btn-primary my-4'>Submit</button>
          </div>
        </form>
      </div>
    </>
  );
};

export default UploadStratigys;