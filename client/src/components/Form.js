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


  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post("/api", {
        quote,
        color,
      })
      .then((response) => {
        console.log(response.data);
        setreceivedData(response.data);
      })
      .catch((error) => [console.log(error)]);
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
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
        <div className="submitButton">
          <Button onClick={handleSubmit}>Submit</Button>
        </div>
      </form>
      {receivedData && <QuoteImage src={receivedData} />}
      <Footer />
    </>
  );
};

export default Form;
