const express = require("express");
const http = require("http");
const app = express();
const cors = require("cors");
const server = http.createServer(app);
const PORT = 3001;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded());
app.use("/api/book", require("./routes/book"));

server.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
