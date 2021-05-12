module.exports.getFirebaseApp = () => {
  const admin = require("firebase");
  const config = {
    apiKey: "AIzaSyCn_raLlffNUEUOUnHSt6qkVnTm5sAEgcQ",
    authDomain: "dapp-portfolio.firebaseapp.com",
    databaseURL: "https://dapp-portfolio-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "dapp-portfolio",
    storageBucket: "dapp-portfolio.appspot.com",
    messagingSenderId: "634763992317",
    appId: "1:634763992317:web:9f2e074b18800f320ab294",
    measurementId: "G-ZR2W9PD6Z5"
  };
    admin.initializeApp(config);
  return admin;
};

module.exports.viewAllAddress = (admin, timeValue) => {
  return new Promise((resolve, reject) => {
    //filter
    return admin
      .database()
      .ref("/account")
      .once("value")
      .then((snapshot) => {
        return resolve(snapshot.val());
      });
  });
};

module.exports.createAccountAddress = (admin, req) => {
  let createCertNO = (dataInsert) => {
    return new Promise((resolve, reject) => {
      // console.log(dataInsert['jobID'] ,dataInsert['NoOld'] )
      admin
        .database()
        .ref(`/account`)
        .orderByChild("accountAddress")
        .equalTo(`${dataInsert["accountAddress"]}`)
        .once("value")
        .then((snapshot) => {
          if (!snapshot.exists()) {
            admin
              .database()
              .ref(`/account`)
              .push(dataInsert);
            resolve({ data: `${dataInsert["accountAddress"]} is ${dataInsert['accountAlias']}`, status: "new" });
          } else {
            try {
              let dataID = snapshot.val();
              dataID = Object.keys(dataID)[0];
              admin
                .database()
                .ref(`/certificateSheet/`)
                .update(dataInsert);
              resolve({ data: dataInsert["accountAddress"], status: "update" });
            } catch (error) {
              resolve({ error: "Internal server error!" });
            }
          }
        });
    });
  };
  return new Promise((resolve, reject) => {
    createCertNO(req.body).then((result) => {
      resolve(result);
    });
  });
};
