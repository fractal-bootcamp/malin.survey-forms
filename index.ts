const express = require('express');
const cors = require('cors')
const port = 3000;
// import main from './add-to-db'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const app = express();
app.use(express.json())
app.use(cors());


interface ContactDetails {
  name: string;
  address: string;
  email: string;
}

const contacts:ContactDetails[] = [{name: '', address: '', email: ''}];

//Middleware
app.use(express.json())

app.get('/names', (req,res) => {
  res.send(contacts)
  console.log('testing that logging works')
});


app.get('/surveys', async (req, res) => {
  // this should display all existing surveys
  const surveys = await prisma.survey.findMany({
    include: {
      questions: {
        include: {
          answers: true
        }
      }
    }
  })
  return res.json(surveys)
})

type QuestionArrayOfObjects = {
  name: string;
};

app.post('/create', async (req: { body: { name: string; questions: string[]; }; }, res: any) => {
  // this should be to create a new survey
  const newSurveyName:string = req.body.name;
  const surveyQuestions: string[] = req.body.questions;

  console.log(req.body)
  const surveys = await prisma.survey.create({
    data: {
      name: newSurveyName,
      questions: {
        create: surveyQuestions.map((question) => ({name: question})) 
      }
    },
    include: {
      questions: true
    }
  });

  res.json("got it")
})

app.post("/submit", (req,res) => {
  // run some function that stores into to the database
  // add-to-db.ts
  const questionAnswerPair = req.body
  const [question] = Object.keys(questionAnswerPair)
  const answer = questionAnswerPair.question

  const info = req.body;
  console.log(req.body)
  contacts.push(info);
  res.send('Data recieved and stored');
})

app.listen(port, () => {
  console.log(`we are listening on port ${port}`)
  console.log(`access on http://localhost:${port}`)
});
