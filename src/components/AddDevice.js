import React, { useState } from "react";
import DeviceDataService from "../services/DeviceService";

const AddDevice = () => {
  const initialDeviceState = {
    title: "",
    description: "",
    lastCheckoutTime: null,
    isCheckedOut: false

  };
  const [device, setDevice] = useState(initialDeviceState);
  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = event => {
    const { name, value } = event.target;
    setDevice({ ...device, [name]: value });
  };

  const saveDevice = () => {
    var data = {
      title: device.title,
      description: device.description,
      lastCheckoutTime:null,
      isCheckedOut: false
    };

    DeviceDataService.create(data)
      .then(() => {
        setSubmitted(true);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const newDevice = () => {
    setDevice(initialDeviceState);
    setSubmitted(false);
  };

  return (
    <div className="submit-form">
      {submitted ? (
        <div>
          <h4>You submitted successfully!</h4>
          <button className="btn btn-success" onClick={newDevice}>
            Add
          </button>
        </div>
      ) : (
        <div>
          <div className="form-group">
            <label htmlFor="title">Device Name</label>
            <input
              type="text"
              className="form-control"
              id="title"
              required
              value={device.title}
              onChange={handleInputChange}
              name="title"
            />
          </div>

          <div className="form-group">
            <label htmlFor="description">Model</label>
            <input
              type="text"
              className="form-control"
              id="description"
              required
              value={device.description}
              onChange={handleInputChange}
              name="description"
            />
          </div>

          

          <button onClick={saveDevice} className="btn btn-success">
            Submit
          </button>
        </div>
      )}
    </div>
  );
};

export default AddDevice;
