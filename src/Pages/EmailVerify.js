import React from 'react';
import { getSingleUser, updateUser } from '../services/dashboardUsers';
import emailjs from '@emailjs/browser';
import { Link, useLocation } from 'react-router-dom';

const EmailVerify = () => {
  const search = useLocation().search;
  const id = new URLSearchParams(search).get('sdfbkjfewihuf');
  const email = new URLSearchParams(search).get('ajhsdfjahb');
  const [loading, setLoading] = React.useState(false);
  const [veridyd, setVeridyd] = React.useState(false);
  const [alredyVeridyd, setAlradyVeridyd] = React.useState(false);
  React.useEffect(() => {
    setLoading(true)
    getSingleUser(id)
      .then(res => {
        const formData = new FormData();
        if (res?.data[0]?.email !== email) {
          setAlradyVeridyd(false)
          if (res) {
            formData.append('email', email);
            updateUser(id, formData)
              .then(res => {
                setLoading(false)
                setVeridyd(true)
              })
          }
        }
        else {
          setAlradyVeridyd(true)
          setLoading(false)
        }
      })
  }, []);
  console.log(alredyVeridyd);
  return (
    <div>
      {
        loading ? <div className='d-flex flex-column align-items-center justify-content-center mt-5'> Loading................</div> :
          (veridyd || alredyVeridyd) && <div className='d-flex flex-column align-items-center justify-content-center mt-5'>
            < div className='text-center'>
              <h3 className="verify_head">{alredyVeridyd ? "Already Verified!" : " Verification success!"}</h3>
            </div>
            <Link to="/"><button className='btn btn-primary'>Go to Home</button></Link>
          </div>
      }
    </div>
  );
};

export default EmailVerify;