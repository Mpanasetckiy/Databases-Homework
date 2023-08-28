const express = require("express");
const app = express();

const routes = require("./routes");

app.use(routes);

app.listen(process.env.PORT || 8000, () => {
  console.log("Server is live on port: " + (process.env.PORT || 8000));
});
