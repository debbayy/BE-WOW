const express = require("express"); //
require("dotenv").config(); //

// Get routes to the variabel
const router = require("./src/routes"); //

const app = express();
const port = 5000;
const cors = require("cors"); //

app.use(express.json());

app.use(cors());

// Add endpoint grouping and router
app.use("/api/v1/", router);
app.use("/uploads", express.static("uploads"));

app.listen(port, () => console.log(`Listening on port ${port}!`));
