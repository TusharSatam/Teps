import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import styles from "./styles/AddResources.module.css";
import {
  postResourceCard,
} from "../../services/Resources";

const AddResources = () => {
  const [resource, setResource] = useState({
    title: "",
    image: null,
    paragraph: "",
    link: "",
    category: "", // Add the 'category' field
  });

  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    if (type === "file") {
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

  function convertToBase64(file) {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader?.readAsDataURL(file);
      fileReader.onload = () => {
        resolve(fileReader.result);
      };
      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Check if the image size is greater than 1MB
    if (resource.image && resource.image.size > 1024 * 1024) {
      toast.error("Image size must be less than 1MB");
      return;
    }
  
    // Convert the image file to base64
    if (resource.image) {
      try {
        const imageBase64 = await convertToBase64(resource.image);
        resource.image = imageBase64;
      } catch (error) {
        console.error("Error converting image to base64:", error);
        // Handle the error here, if needed
      }
    }
  
    let data = {
      title: resource.title,
      image: resource.image,
      paragraph: resource.paragraph,
      link_to_readmore: resource.link,
      category: resource.category,
    };
  
    // Make the API call only if the image size is within the limit
    postResourceCard(data);
  
    setTimeout(() => {
      setResource({
        title: '',
        image: null,
        paragraph: '',
        link: '',
        category: '',
      });
      setFormSubmitted(true);
  
      // Display a success toast
      toast.success("Resource added!", {
        duration: 4000,
      });
    }, 1000);
  };
  
  return (
    <div>
      <Toaster position="top-right" reverseOrder={false} />

      <h2>Add Resources</h2>
      <form onSubmit={handleSubmit} className={styles.AddResourcesForm}>
        <div>
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
          <small>Image size must be less than 1MB</small>
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
          <label htmlFor="link">Link:</label>
          <input
            type="text"
            id="link"
            name="link"
            value={resource.link}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="category">Category:</label>
          <input
            type="text"
            id="category"
            name="category"
            value={resource.category}
            onChange={handleChange}
          />
        </div>
        <button type="submit" className="btn btn-primary my-3">
          Add Resource
        </button>
      </form>
    </div>
  );
};

export default AddResources;
