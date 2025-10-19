import express from "express";
import axios from "axios";
import bodyParser from "body-parser";
import 'dotenv/config'

const app = express();
const port = 3000;
const API_URL = "https://secrets-api.appbrewery.com";


//Add your own bearer token 

const config = {
  headers: { Authorization: `Bearer ${process.env.yourBearerToken}` },
};

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.render("index.ejs", { content: "Waiting for data..." });
});

app.post("/get-secret", async (req, res) => {
  const searchId = req.body.id;
  try {
    const result = await axios.get(API_URL + "/secrets/" + searchId, config);
    res.render("index.ejs", { content: JSON.stringify(result.data) });
  } catch (error) {
    res.render("index.ejs", { content: JSON.stringify(error.response.data) });
  }
});

app.post("/post-secret", async (req, res) => {
  // TODO 2: Use axios to POST the data from req.body to the secrets api servers.
  let secret = req.body.secret;
  let score = req.body.score
  const data = {
    secret:secret,
    score:score
  }
  try {
    const result = await axios.post(API_URL + "/secrets", data, config)
    res.render("index.ejs",{ content:JSON.stringify(result.data) })
  } catch (error) {
    res.render("index.ejs", { content: JSON.stringify(error.response.data) })
  }
});

app.post("/put-secret", async (req, res) => {
  
  const searchId = req.body.id;
  let secret = req.body.secret;
  let score = req.body.score
  const data = {
    secret:secret,
    score:score
  }
  try {
    const result = await axios.put(API_URL + "/secrets/" + searchId, data, config)
    res.render("index.ejs",{ content:JSON.stringify(result.data) })
  } catch (error) {
    res.render("index.ejs", { content: JSON.stringify(error.response.data) })
  }
});

app.post("/patch-secret", async (req, res) => {
  const searchId = req.body.id;
  
  let secret = req.body.secret;
  let score = req.body.score
  const data = {
    secret:secret,
    score:score
  }
  try {
    const result = await axios.patch(API_URL + "/secrets/" + searchId, data, config)
    res.render("index.ejs",{ content:JSON.stringify(result.data) })
  } catch (error) {
    res.render("index.ejs", { content: JSON.stringify(error.response.data) })
  }
});

app.post("/delete-secret", async (req, res) => {
  
  const searchId = req.body.id;
  
  try {
    const result = await axios.delete(API_URL + "/secrets/" + searchId, config)
    res.render("index.ejs",{ content:JSON.stringify(result.data) })
  } catch (error) {
    res.render("index.ejs", { content: JSON.stringify(error.response.data) })
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
