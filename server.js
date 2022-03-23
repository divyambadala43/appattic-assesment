const express = require("express");
const cors = require("cors");
const textToImage = require("text-to-image");
var convert = require('color-convert');
const port = process.env.PORT || 5000;

const app = express();
app.use(cors());
app.use(express.json());

// if (process.env.NODE_ENC == 'production') {

  app.use('/', express.static("client/build"))
//   }

app.get("/api", (req, res) => {
  res.send(req.body);
});

app.post("/api", async (req, res) => {
  const { color, quote } = req.body;
  const hue = color.hue;
  const saturation = color.saturation * 100
  const brightness = color.brightness * 100
  const alpha = color.alpha;
  const HSBtoHEX = convert.hsv.hex(hue, saturation, brightness, alpha)
  const HEXCode = `#${HSBtoHEX}`

  const dataUri = await textToImage.generate(quote, {
    debug: true,
    textAlign: "center",
    verticalAlign: "center",
    maxWidth: 1000,
    customHeight: 500,
    fontSize: 18,
    fontFamily: "Arial",
    lineHeight: 30,
    margin: 5,
    bgColor: "black",
    textColor: HEXCode,
  });
  res.send(dataUri);
});


app.listen(port, () => {
  console.log(`Listening to http://localhost:${port}`);
});
