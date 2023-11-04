import React, { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import toast, { Toaster } from 'react-hot-toast';
import { FaRegEdit, FaRegTrashAlt } from 'react-icons/fa';
// import { delResource, getResources } from '../../services/resourceService'; // Replace with your actual resource fetching and deletion service
import { useAuth } from '../../Context/AuthContext';

const AllResources = () => {
    const [resources, setResources] = useState([{id:"1",title:"test",description:"test",link:"http://test.com"}])
  const [selectedResources, setSelectedResources] = useState([]);
  
//   useEffect(() => {
//     getResources() // Fetch resources from your API
//       .then((res) => {
//         setResources(res?.data);
//       });
//   }, [setResources]);

  const handleResourceDelete = (id) => {
//     delResource(id) // Delete resource using your API service
//       .then((res) => {
//         if (res) {
//           toast.success('Resource Deleted!', {
//             duration: 4000
//           });
//           // Update the resources list after deletion
//           getResources()
//             .then((res) => {
//               setResources(res?.data);
//             });
//         }
//       });
  }

  return (
    <div>
      <Toaster
        position="top-right"
        reverseOrder={false}
      />
      <Table striped bordered hover size="sm">
        <thead style={{ background: '#d5b39a' }}>
          <tr>
            <th>Id</th>
            <th>Image</th>
            <th>Title</th>
            <th>Description</th>
            <th>Link</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {resources?.map((resource, i) => (
            <tr key={i}>
              <td>{resource.id}</td>
              <td>
                <img src="https://picsum.photos/200/300" alt={resource.title} width="50" />
              </td>
              <td>{resource.title}</td>
              <td>{resource.description}</td>
              <td>
                <a href={resource.link} target="_blank" rel="noopener noreferrer">
                  {resource.link}
                </a>
              </td>
              <td>
                <button onClick={() => handleResourceDelete(resource.id)} className='btn p-0 me-2'>
                  <FaRegTrashAlt />
                </button>
                <button className='btn p-0' ><FaRegEdit /></button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default AllResources;
