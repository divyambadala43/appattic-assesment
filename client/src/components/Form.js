import React, { useState, useCallback, useEffect } from "react";
import { TextField, ColorPicker } from "@shopify/polaris";
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

  const handleSubmit = () => {
    axios
      .post("http://localhost:5000/post", {
        quote: quote,
        color,
      })
      .then((response) => {
        // console.log(response.data);
        console.log(color);
        setreceivedData(response.data);
      })
      .catch((error) => [console.log(error)]);
  };

  useEffect(() => {
    if (quote.length > 0) {
      handleSubmit();
    }
  }, [color, quote]);

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
      </form>
      {receivedData && <QuoteImage src={receivedData} />}
      <Footer />
    </>
  );
};

export default Form;
