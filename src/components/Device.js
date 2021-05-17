import React, { useState } from "react";
import DeviceDataService from "../services/DeviceService";

const Device = (props) => {
  const initialDeviceState = {
    key: null,
    title: "",
    description: "",
    lastCheckoutTime: null,
    isCheckedOut: false
  };
  const [currentDevice, setCurrentDevice] = useState(initialDeviceState);
  const [message, setMessage] = useState("");

  const { device } = props;
  if (currentDevice.id !== device.id) {
    setCurrentDevice(device);
    setMessage("");
  }

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setCurrentDevice({ ...currentDevice, [name]: value });
  };


  const updateIsCheckedOut = (status) => {
    DeviceDataService.update(currentDevice.id, { isCheckedOut: status })
      .then(() => {
        const now = new Date().getHours()

        if (now >= 9 && now <= 12 && status === true) {
          console.log(now , "time")
          setCurrentDevice({ ...currentDevice, isCheckedOut: status, lastCheckoutTime });
          setMessage("The status was updated successfully!");
        } else {
          setMessage("You can only Check Out Between 9:00am - 17:00pm");

        }
    
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const updateDevice = () => {
    const data = {
      title: currentDevice.title,
      description: currentDevice.description,
    };

    DeviceDataService.update(currentDevice.id, data)
      .then(() => {
        setMessage("The device was updated successfully!");
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const deleteDevice = () => {
    DeviceDataService.remove(currentDevice.id)
      .then(() => {
        props.refreshList();
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <div>
      {currentDevice ? (
        <div className="edit-form">
          <h4>Device</h4>
          <form>
            <div className="form-group">
              <label htmlFor="title">Title</label>
              <input
                type="text"
                className="form-control"
                id="title"
                name="title"
                value={currentDevice.title}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="description">Description</label>
              <input
                type="text"
                className="form-control"
                id="description"
                name="description"
                value={currentDevice.description}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-group">
              <label>
                <strong>Status:</strong>
              </label>
              {currentDevice.isCheckedOut ? "Checked In" : "Checked Out"}
            </div>
          </form>

          {currentDevice.isCheckedOut ? (
            <button
              className="badge badge-primary mr-2"
              onClick={() => updateIsCheckedOut(false)}
            >
              Checked Out
            </button>
          ) : (
            <button
              className="badge badge-primary mr-2"
              onClick={() => updateIsCheckedOut(true)}
            >
              Checked In
            </button>
          )}

          <button className="badge badge-danger mr-2" onClick={deleteDevice}>
            Delete
          </button>

          <button
            type="submit"
            className="badge badge-success"
            onClick={updateDevice}
          >
            Update
          </button>
          <p>{message}</p>
        </div>
      ) : (
        <div>
          <br />
          <p>Please click on a Device...</p>
        </div>
      )}
    </div>
  );
};

export default Device;
