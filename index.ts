const express = require('express');
const app = express();
const port = 3000;
const frontend = 'http://localhost:5173/'

app.get('/', (req,res) => {
  res.send("Hello World")
});

app.get('/app', (req,res) => {
  res.send(frontend)
});

app.listen(port, () => {
  console.log(`we are listening on port ${port}`)
  console.log(`access on http://localhost:${port}`)
});
