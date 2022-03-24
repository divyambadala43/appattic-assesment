import React, { useState, useCallback } from "react";
import { TextField, ColorPicker, Button } from "@shopify/polaris";
import axios from "axios";
import QuoteImage from "./QuoteImage";
import Footer from "./Footer";
import "./Form.css";

const Form = () => {
  const [quote, setQuote] = useState("");
  const handleQuoteChange = useCallback((value) => setQuote(value), []);
  const [receivedData, setreceivedData] = useState("");

  const [color, setColor] = useState({
    hue: 300,
    brightness: 1,
    saturation: 0.7,
    alpha: 0.7,
  });

  const handleChange = (e) => {
    const val = e.target.value;

    axios
      .post("/api", {
        quote: val,
        color,
      })
      .then((response) => {
        setreceivedData(response.data);
      })
      .catch((error) => [console.log(error)]);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <>
      <form onSubmit={handleSubmit} onChange={handleChange}>
        <div className="inputContainer">
          <TextField
            name="quote"
            placeholder="Quote"
            value={quote}
            onChange={handleQuoteChange}
            maxLength={100}
            autoComplete="off"
            showCharacterCount
          />
        </div>
        <div className="colorPickerContainer">
          <ColorPicker onChange={setColor} color={color} allowAlpha />
        </div>
        {/* <div className="submitButton">
          <Button onClick={handleSubmit}>Submit</Button>
        </div> */}
      </form>
      {receivedData && <QuoteImage src={receivedData} />}
      <Footer />
    </>
  );
};

export default Form;
