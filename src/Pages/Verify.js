import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { getSingleUser, updateUser } from '../services/dashboardUsers';
import emailjs from '@emailjs/browser';
import axios from 'axios';

const Verify = () => {
  const search = useLocation().search;
  const id = new URLSearchParams(search).get('sdfbkjfewihuf');
  const jwt = new URLSearchParams(search).get('pfgvsckvnlksfwe');
  const [loading, setLoading] = React.useState(false);
  const [veridyd, setVeridyd] = React.useState(false);
  const [alredyVeridyd, setAlradyVeridyd] = React.useState(false);
  const storedData = JSON.parse(localStorage.getItem('data'));
  React.useEffect(() => {
    setLoading(true)
    getSingleUser(id)
    .then(res => {
    localStorage.setItem("jwt",jwt);
        const email = res?.data[0]?.email;
        if (res?.data[0]?.varified === false) {
          setAlradyVeridyd(false)
          if (res) {
            const formData ={
              varified:true
            }
            updateUser(id, formData)
              .then(res => {
                setLoading(false)
                const data = {
                  "to": email,
                  'subject': "Welcome to TEPS",
                  "html": `
                      <p>Hello and welcome to Things Education’s Pedagogical Strategies (TEPS). </p>
                      <p>You are now a registered member of the community of educators with the common goal of making students learn better.</p>
                      <p>Looking forward to a long and fruitful partnership!</p><br/>
                      <p>Regards,</p>
                      <p>Things Education</p>
                      `
                }
                axios.post('email', data)
                  .then(res => {
                    if (res) {
                      if (storedData) {
                        storedData.verified = true;
                        localStorage.setItem('data', JSON.stringify(storedData));
                      } else {
                        console.error('No data found in localStorage');
                      }
                      setVeridyd(true)
                    }
                  })
                  .catch(err => console.log(err))
              })
          }
        }
        else {
          setVeridyd(true)
          setLoading(false)
          setAlradyVeridyd(true)
        }
      })
  }, [])

  return (
    <>
      {
        loading ? <div className='d-flex flex-column align-items-center justify-content-center mt-5'> Loading................</div> :
          veridyd && <div className='d-flex flex-column align-items-center justify-content-center mt-5'>
            < div className='text-center'>
              <h3 className="verify_head">{alredyVeridyd ? "Already Verified!" : " Verification success!"}</h3>
            </div>
            <Link to="/home"><button>Proceed to the homepage and log in to continue.</button></Link>
          </div>
      }
    </>
  );
};

export default Verify;