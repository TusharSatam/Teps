import React, { useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';
import { getUserDeviceAndBrowser } from '../../services/userDeviceAndBrowser';

const DeviceList = () => {
  const [deviceList, setDeviceList] = useState([])
  useEffect(() => {
    getUserDeviceAndBrowser()
      .then(res => {
        setDeviceList(res.data)
      })
  }, [])
  return (
    <div>
      <Table striped bordered hover size="sm">
        <thead style={{ background: '#d5b39a' }}>
          <tr>
            <th>User Id</th>
            <th scope="col">Browsers</th>
            <th scope="col">Devices</th>
          </tr>
        </thead>
        <tbody>
          {
            deviceList?.map((res, i) => (
              <tr key={i}>
                <td>{(res?.user_id).slice(19, 26)}</td>
                <td>{res?.browsers}</td>
                <td>{res?.devices}</td>
              </tr>
            ))
          }



        </tbody>
      </Table>
    </div>
  );
};

export default DeviceList;