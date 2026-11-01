
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const Calculation = require("./models/Calculation");

const app = express();

app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected Successfully!"))
  .catch((error) => console.log(error.message));

// Test API
app.get("/", (req, res) => {
  res.send("Calculator Backend is Running!");
});

// Calculate API
app.post("/calculate", async (req, res) => {
  try {
    const { num1, num2, operation } = req.body;

    let result;

    if (operation === "+") {
      result = num1 + num2;
    } else if (operation === "-") {
      result = num1 - num2;
    } else if (operation === "*") {
      result = num1 * num2;
    } else if (operation === "/") {
      if (num2 === 0) {
        return res.status(400).json({
          message: "Cannot divide by zero"
        });
      }
      result = num1 / num2;
    } else {
      return res.status(400).json({
        message: "Invalid operation"
      });
    }

    const calculation = new Calculation({
      num1,
      num2,
      operation,
      result
    });

    await calculation.save();

    res.json({
      result: result,
      message: "Calculation saved successfully!"
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
});

// Start server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
