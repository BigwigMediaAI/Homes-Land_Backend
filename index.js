const express = require("express");
const cors = require("cors");
const { connect } = require("./config/db");
const leadRoutes = require("./routes/lead.route");
const blogRoutes = require("./routes/blog.route");
const buyproperty = require("./routes/propertyRoutes");
const sellproperty = require("./routes/Sell.route");
const contactRoutes = require("./routes/contact.route");
const SellApproval = require("./routes/AdminApproval");

require("dotenv").config();

const app = express();

app.use(express.json());
app.use(cors());

app.use("/api/lead", leadRoutes);
app.use("/blog", blogRoutes);
app.use("/property", buyproperty);
app.use("/property", sellproperty);
app.use("/api/contacts", contactRoutes);
app.use("/sell", SellApproval);

// Start server
app.listen(process.env.PORT, async () => {
  try {
    await connect();
  } catch (error) {
    console.error("❌ DB connection failed:", error);
  }

  console.log(`🚀 Server is listening on port ${process.env.PORT}`);
});
