import React, { useState } from "react";
import DeviceDataService from "../services/DeviceService";
import * as dayjs from 'dayjs';

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
        let now = new Date().getHours()
        let nowInISO = new Date().getHours()

      
        let time = dayjs(nowInISO ).unix(); // save it in timestamp


        console.log("Time  is ," ,time);
        if (now >= 9 && now < 17 && status === true) {
          console.log(now , "time")
          setCurrentDevice({ ...currentDevice, isCheckedOut: status, lastCheckoutTime: time });
          setMessage("The device was succesfully Checked Out!");
        } else if (now >= 9 && now < 17 && status === false) {
          setMessage("The device was succesfully Checked In!");

        }else {
          setMessage("You can only Check In/Out Between 9:00am - 17:00pm");

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
                disabled
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
              {currentDevice.isCheckedOut ? "Checked Out" : "Checked In"}
            </div>
            <div className="form-group">
              <label>
                <strong>Last CheckOut:</strong>
                
              </label>
              {currentDevice.lastCheckoutTime}
            </div>
          </form>

          {currentDevice.isCheckedOut ? (
            <button
              className="badge badge-primary mr-2"
              onClick={() => updateIsCheckedOut(false)}
            >
              Check In
            </button>
          ) : (
            <button
              className="badge badge-primary mr-2"
              onClick={() => updateIsCheckedOut(true)}
            >
              Check Out
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
