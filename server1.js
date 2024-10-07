const express = require("express");
const app = express();
const cors = require('cors')
app.use(cors);
const adminRoutes = require("./routes/admin");
const userroutes=require("./routes/user");
app.use(express.json());
app.use("/admin", adminRoutes);
app.use("/user",userroutes)
app.listen(3000, () => {
    console.log("Server is running on port 3000");
});
