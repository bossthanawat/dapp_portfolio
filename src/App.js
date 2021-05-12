import logo from "./logo.svg";
import "./App.css";
import { useState } from "react";
import axios from "axios";
function App() {
  const [accountData, setAccountData] = useState({
    accountAddress: "",
    accouuntAlias: "",
  });
  const handleInputAddress = (e) => {
    let value = e.target.value;
    accountData[e.target.id] = value;
  };

  const handleSaveAddress = () => {
    axios
      .post("http://localhost:8888/saveAddress", {
          accountAddress: accountData["accountAddress"],
          accountAlias: accountData["accouuntAlias"],
      })
      .then((res) => {
        console.log(res);
      });
  };
  return (
    <div style={{ margin: "1em" }}>
      <input
        id="accountAddress"
        placeholder="input metamask address"
        onChange={handleInputAddress}
      ></input>
      <br />
      <br />
      <input
        id="accouuntAlias"
        placeholder="input metamask  nickname"
        onChange={handleInputAddress}
      ></input>
      <br />
      <br />
      <button onClick={handleSaveAddress}> save </button>
    </div>
  );
}

export default App;
