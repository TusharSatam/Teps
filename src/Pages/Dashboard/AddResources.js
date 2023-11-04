import React, { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import styles from "./styles/AddResources.module.css"
const AddResources = () => {
  const [resource, setResource] = useState({
    title: '',
    image: null,
    paragraph: '',
    link: '',
  });
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    if (type === 'file') {
      setResource((prevResource) => ({
        ...prevResource,
        [name]: e.target.files[0],
      }));
    } else {
      setResource((prevResource) => ({
        ...prevResource,
        [name]: value,
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate a request to your backend (you should replace this with your actual API call)
    setTimeout(() => {
      // Clear the form and set formSubmitted to true
      setResource({
        title: '',
        image: null,
        paragraph: '',
        link: '',
      });
      setFormSubmitted(true);

      // Display a success toast
      toast.success('Resource added!', {
        duration: 4000,
      });
    }, 1000);
  };

  return (
    <div>
      <Toaster position="top-right" reverseOrder={false} />

      <h2>Add Resources</h2>
      <form onSubmit={handleSubmit} className={styles.AddResourcesForm}>
        <div >
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            name="title"
            value={resource.title}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="image">Image:</label>
          <input
            type="file"
            id="image"
            name="image"
            accept="image/*"
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="paragraph">Description:</label>
          <textarea
            id="paragraph"
            name="paragraph"
            value={resource.paragraph}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="link">Link URL:</label>
          <input
            type="text"
            id="link"
            name="link"
            value={resource.link}
            onChange={handleChange}
          />
        </div>
        <button type="submit" className='btn btn-primary my-3 '>Add Resource</button>
      </form>
    </div>
  );
};

export default AddResources;
