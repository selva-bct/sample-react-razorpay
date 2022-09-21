import React, { useState } from "react";
import logo from "./logo.svg";
import "./App.css";

function loadScript(src) {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = src;
    script.onload = () => {
      resolve(true);
    };
    script.onerror = () => {
      resolve(false);
    };
    document.body.appendChild(script);
  });
}

function App() {
  const [orderId, setOrderId] = useState("");
  const [resp, setResp] = useState("");
  async function showRazorpay(orderId) {
    const res = await loadScript(
      "https://checkout.razorpay.com/v1/checkout.js"
    );

    if (!res) {
      alert("Razorpay SDK failed to load. Are you online?");
      return;
    }

    const options = {
      key: "rzp_test_8sbbL39KvCvDCb",
      order_id: orderId,
      handler: function (response) {
        setResp(response);
        // alert(response.razorpay_payment_id);
        // alert(response.razorpay_order_id);
        // alert(response.razorpay_signature);
        console.log(response, " =- = -= -=");
        setOrderId("");
        alert("Transaction successful");
      },
      prefill: {},
    };
    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>Razorpay payment portal</p>
        {/* <div className=""> */}
        <label for="" style={{ textAlign: "left" }}>
          Enter Order Id
        </label>
        <input
          style={{
            padding: "10px 5px",
            width: "300px",
          }}
          type="text"
          name="orderId"
          onChange={(e) => {
            setOrderId(e.target.value);
          }}
        />
        {/* </div> */}
        <a
          className="App-link"
          onClick={() => {
            if (orderId) {
              showRazorpay(orderId);
            } else {
              alert("enter orderID");
            }
          }}
          target="_blank"
          rel="noopener noreferrer"
        >
          Pay now
        </a>
      </header>
    </div>
  );
}

export default App;
