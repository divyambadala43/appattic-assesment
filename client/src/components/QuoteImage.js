import React from "react";
import "./Form.css"

const QuoteImage = ({ src }) => {
  return (
    <div className="quoteImageContainer">
      <img src={src} alt="QuoteImage" />
    </div>
  );
};

export default QuoteImage;
