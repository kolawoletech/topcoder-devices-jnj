import React, { useState /*, useEffect */ } from "react";
import { useCollection } from "react-firebase-hooks/firestore";
import DeviceDataService from "../services/DeviceService";
import Device from "./Device";

const DevicesList = () => {
  // const [tutorials, setTutorials] = useState([]);
  const [currentDevice, setCurrentDevice] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(-1);

  /* use react-firebase-hooks */
  const [devices, loading, error] = useCollection(DeviceDataService.getAll().orderBy("title", "asc"));


  const refreshList = () => {
    setCurrentDevice(null);
    setCurrentIndex(-1);
  };

  const setActiveDevice = (device, index) => {
    const { title, description, lastCheckoutTime,  isCheckedOut} = device.data();

    setCurrentDevice({
      id: device.id,
      title,
      description,
      lastCheckoutTime,
      isCheckedOut
    });

    setCurrentIndex(index);
  };

  return (
    <div className="list row">
      <div className="col-md-6">
        <h4>Device List</h4>
        {error && <strong>Error: {error}</strong>}
        {loading && <span>Loading...</span>}
        <ul className="list-group">
          { !loading &&
            devices &&
            devices.docs.map((device, index) => ( /* tutorials.map */
              <li
                className={"list-group-item " + (index === currentIndex ? "active" : "")}
                onClick={() => setActiveDevice(device, index)}
                key={device.id}
              >
                { device.data().title }
                { /*tutorial.title*/ }
              </li>
            ))}
        </ul>
      </div>
      <div className="col-md-6">
        {currentDevice ? (
          <Device device={currentDevice} refreshList={refreshList} />
        ) : (
          <div>
            <br />
            <p>Please click on a Device...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default DevicesList;
