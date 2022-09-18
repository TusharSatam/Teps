import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { getSingleUser, updateUser } from '../services/dashboardUsers';
import emailjs from '@emailjs/browser';

const Verify = () => {
  const search = useLocation().search;
  const id = new URLSearchParams(search).get('sdfbkjfewihuf');
  const [loading, setLoading] = React.useState(false);
  const [veridyd, setVeridyd] = React.useState(false);
  const [alredyVeridyd, setAlradyVeridyd] = React.useState(false);
  React.useEffect(() => {
    setLoading(true)
    getSingleUser(id)
      .then(res => {
        const email = res?.data[0]?.email;
        const formData = new FormData();
        if (res?.data[0]?.varified === false) {
          setAlradyVeridyd(false)
          if (res) {
            formData.append('varified', true);
            updateUser(id, formData)
              .then(res => {
                setLoading(false)
                  (emailjs.send('service_tf7x29l', 'template_eak42al', {
                    "reply_to": email,
                    "from": "things@ecu.org"
                  }, '4i-3K9njuqhYjHK_8')
                    .then((result) => {
                      setVeridyd(true)
                      console.log(result.text);
                    }, (error) => {
                      console.log(error.text);
                    }))
              })
          }
        }
        else {
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
            <Link to="/"><button>Proceed to Homepage and Login to continue</button></Link>
          </div>
      }
    </>
  );
};

export default Verify;