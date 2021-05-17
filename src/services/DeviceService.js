import firebase from "../firebase";

const db = firebase.collection("/devices");

const getAll = () => {


  return db;
};

const create = (data) => {
/*   db.get().then((snap)=>{

    if (snap.size <10){
      return db.add(data);

    } else {
      alert("Only 10 Devices allowed in the garage")
    }

  }) */

  return db.add(data);

};

const update = (id, value) => {
  return db.doc(id).update(value);
};

const remove = (id) => {
  return db.doc(id).delete();
};

const DeviceService = {
  getAll,
  create,
  update,
  remove
};

export default DeviceService;
