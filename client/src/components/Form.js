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

  const hslToHex = () => {
    let hsl = `hsla(${Math.trunc(color.hue)}, ${
      Math.trunc(color.saturation * 100) + "%"
    }, ${Math.trunc(color.brightness * 100) + "%"}, ${parseFloat(
      color.alpha
    ).toFixed(1)})`;
    console.log(hsl);
    hsl = hsl.match(
      /^hsla?\(\s?(\d+)(?:deg)?,?\s(\d+)%,?\s(\d+)%,?\s?(?:\/\s?\d+%|\s+[\d+]?\.?\d+)?\)$/i
    );
    if (!hsl) {
      return null;
    }
    let h = hsl[1];
    let s = hsl[2];
    let l = hsl[3];
    h /= 360;
    s /= 100;
    l /= 100;
    let r, g, b;
    if (s === 0) {
      r = g = b = l;
    } else {
      const hue2rgb = function (p, q, t) {
        if (t < 0) t += 1;
        if (t > 1) t -= 1;
        if (t < 1 / 6) return p + (q - p) * 6 * t;
        if (t < 1 / 2) return q;
        if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
        return p;
      };
      const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
      const p = 2 * l - q;
      r = hue2rgb(p, q, h + 1 / 3);
      g = hue2rgb(p, q, h);
      b = hue2rgb(p, q, h - 1 / 3);
    }
    const toHex = function (x) {
      const hex = Math.round(x * 255).toString(16);
      return hex.length === 1 ? "0" + hex : hex;
    };
    return "#" + toHex(r) + toHex(g) + toHex(b);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const colorPicked = hslToHex();
    axios
      .post("/api", {
        quote,
        colorPicked,
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
