const express = require("express");
const connectDB = require("./config/db");
const recordRoutes = require("./routes/recordRoutes");
const app = express();
const PORT = process.env.PORT || 3000;
const cors = require("cors");
app.use(express.json());
app.use(cors());

connectDB();
app.use("/api/records", recordRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
