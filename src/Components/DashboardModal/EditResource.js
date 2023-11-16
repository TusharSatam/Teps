import React, { useEffect } from "react";
import { Modal } from "react-bootstrap";
import toast, { Toaster } from "react-hot-toast";
import { getAllResource, updateResource } from "../../services/Resources";

const EditResource = ({
  show,
  onHide,
  selectedResources,
  setShow,
  setSelectedResources,
  setResources,
}) => {
  const [formData, setFormData] = React.useState({
    title: selectedResources.title,
    image: selectedResources.image,
    paragraph: selectedResources.paragraph,
    category: selectedResources.category,
    link_to_readmore: selectedResources.link_to_readmore,
  });
  const [isLoading, setIsLoading] = React.useState(false);

  useEffect(() => {
    setFormData(selectedResources);
  }, [selectedResources]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const handleImageChange = (e) => {
    const imageFile = e.target.files[0];
    if (imageFile) {
      // Read the image file as base64
      const reader = new FileReader();
      reader.onload = (event) => {
        setFormData({ ...formData, image: event.target.result });
      };
      reader.readAsDataURL(imageFile);
    }
  };
  const handleUpdate = (e) => {
    e.preventDefault();
    setIsLoading(true); // Set loading state when the update starts

    const updatedData = {
      title: formData.title,
      paragraph: formData.paragraph,
      category: formData.category,
      link_to_readmore: formData.link_to_readmore,
      image: formData.image, 
    };
    console.log(updatedData);
    updateResource(selectedResources._id, updatedData)
      .then((res) => {
        setIsLoading(false); // Reset loading state when the update is successful
        setShow(false);
        getAllResource().then((res) => {
          setResources(res?.data?.cards);
          toast.success("Resource Update successful!");
        });
      });
  };

  return (
    <>
      <Toaster position="top-right" reverseOrder={false} />
      <Modal show={show} onHide={onHide} backdrop="static" keyboard={false}>
        <Modal.Header closeButton>
          <Modal.Title>Update Resource</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="d-flex justify-content-center">
            <form className="ms-md-3 ms-xxl-5 d-flex flex-column gap-3" onSubmit={handleUpdate}>
            <div>
                <label className="mr-2" htmlFor="image">Image</label>
                <img src={formData?.image} alt="image" height={"30px"} width={"30px"}/>
                <input
                  type="file"
                  id="image"
                  name="image"
                  accept="image/*"
                  onChange={handleImageChange}
                />
              </div>
                <small>Image size must be less than 1MB</small>
              <div>
                <label className="mr-2" htmlFor="title">Title</label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label className="mr-2" htmlFor="paragraph">Description</label>
                <textarea
                  id="paragraph"
                  name="paragraph"
                  value={formData.paragraph}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label className="mr-2" htmlFor="category">Category</label>
                <input
                  type="text"
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label className="mr-2" htmlFor="link_to_readmore">Link</label>
                <input
                  type="text"
                  id="link_to_readmore"
                  name="link_to_readmore"
                  value={formData.link_to_readmore}
                  onChange={handleChange}
                />
              </div>

              <div className="d-flex justify-content-end my-3">
                <button className="btn btn-primary" type="submit">
                  {isLoading ? "Updating..." : "Update"}
                </button>
              </div>
            </form>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default EditResource;
