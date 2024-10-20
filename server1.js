const express = require("express");
const app = express();
const cors = require('cors');
const jwt = require("jsonwebtoken");
const { admin, course } = require("../backend/db"); 
const { jwtsecret } = require("../backend/config");

app.use(cors({ origin: 'http://localhost:5173' }));
app.use(express.json());

const adminRoutes = require("./routes/admin");
const userRoutes = require("./routes/user");
app.use("/admin", adminRoutes);
app.use("/user", userRoutes);

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});