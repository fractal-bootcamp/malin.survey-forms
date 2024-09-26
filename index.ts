const express = require('express');
const cors = require('cors')
const port = 3000;

const app = express();
app.use(cors());



const dummyData:string[] = ['some data lives here', 'some second bit of data lives here']
let name:string[] = ['first'];

//Middleware
app.use(express.json())

app.get('/names', (req,res) => {
  res.send(name)
  console.log('testing that logging works')
  console.log(name)
});

app.get('/first', (req,res) => {
  res.send(dummyData[0])
});

app.get('/second', (req,res) => {
  res.send(dummyData[1])
});

app.post("/submit", (req,res) => {
  const info = req.body;
  console.log(req.body)
  name.push(info.name);
  res.send('Data recieved and stored');
})

app.listen(port, () => {
  console.log(`we are listening on port ${port}`)
  console.log(`access on http://localhost:${port}`)
});
