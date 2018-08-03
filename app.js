const express = require('express');
const morgan = require('morgan');

const app = express();
app.use(morgan('dev'));

app.get("/", (req, res) => {
  res.send("<h1>Hello world</h1>");
})

const PORT = 1337;

app.listen(PORT, () => {
  console.log(`App listening in port ${PORT}`);
});
