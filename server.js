const express = require("express");
const cors = require("cors");
const textToImage = require("text-to-image");
const port = process.env.PORT || 5000;

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send(req.body);
});

app.post("/", async (req, res) => {
  const { colorPicked, quote } = req.body;
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
    textColor: colorPicked,
  });
  res.send(dataUri);
});

if (process.env.NODE_ENC == 'production') {
  app.use(express.static("client/build"))
}

app.listen(port, () => {
  console.log(`Listening to http://localhost:${port}`);
});
