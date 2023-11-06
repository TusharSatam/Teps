import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import toast, { Toaster } from "react-hot-toast";
import { FaRegEdit, FaRegTrashAlt } from "react-icons/fa";
// import { delResource, getResources } from '../../services/resourceService'; // Replace with your actual resource fetching and deletion service
import { useAuth } from "../../Context/AuthContext";
import {
  delResource,
  getAllResource,
  getResource,
} from "../../services/Resources";
import EditResource from "../../Components/DashboardModal/EditResource";

const AllResources = () => {
  const [resources, setResources] = useState([]);

  const [selectedResources, setSelectedResources] = useState({});
  const [isShow, setisShow] = useState(false);
  useEffect(() => {
    getAllResource() // Fetch resources from your API
      .then((res) => {
        setResources(res?.data?.cards);
      });
  }, [setResources]);

  const handleResourceDelete = (id) => {
    delResource(id).then((res) => {
      if (res) {
        toast.success("Resource Deleted!", {
          duration: 4000,
        });
        // Update the resources list after deletion
        getAllResource().then((res) => {
          setResources(res?.data?.cards);
        });
      }
    });
  };

  const handleEdit = (id) => {
    getResource(id).then((res) => {
      setSelectedResources(res?.data);
      setisShow(true)
    });
  };

  const handleClose = () => {
    setisShow(false);
  };

  return (
    <div>
      <Toaster position="top-right" reverseOrder={false} />
      <EditResource
        show={isShow}
        setShow={setisShow}
        onHide={handleClose}
        setSelectedResources={setSelectedResources}
        selectedResources={selectedResources}
        setResources={setResources}
      />
      <Table striped bordered hover size="sm">
        <thead style={{ background: "#d5b39a" }}>
          <tr>
            <th>Id</th>
            <th>Image</th>
            <th>Title</th>
            <th>Description</th>
            <th>Category</th>
            <th>Link</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {resources?.map((resource, i) => (
            <tr key={i}>
              <td>{resource._id?.slice(0, 6)}</td>
              <td>
                <img src={resource.image} alt={resource.title} width="50" />
              </td>
              <td>{resource.title}</td>
              <td>{resource.paragraph}</td>
              <td>{resource.category}</td>
              <td>
                <a
                  href={resource.link_to_readmore}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {resource.link_to_readmore}
                </a>
              </td>
              <td>
                <button
                  onClick={() => handleResourceDelete(resource._id)}
                  className="btn p-0 me-2"
                >
                  <FaRegTrashAlt />
                </button>
                <button
                  className="btn p-0"
                  onClick={() => handleEdit(resource._id)}
                >
                  <FaRegEdit />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default AllResources;
