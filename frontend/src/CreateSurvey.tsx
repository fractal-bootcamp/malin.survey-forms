import { Key, useState } from 'react'
import axios from 'axios';
const serverURL = "http://localhost:3000";

// I want this to create a new Survey
// The user should be able to give the survey a name and add blocks of questions (that they name)
// The form should extract the relevant information and store it in an object
// The form should send this object via a POST request to the backend for storage in the database

type QuestionArrayOfObjects = {
  name: string;
};

const GenerateNewForm = ({ surveyName, questions, addQuestion, setQuestions, submitFormToServer }) => {

  const handleNewQuestion = (e: any, index: number) => {
    const newQuestions = [...questions];
    newQuestions[index] = e.target.value;
    setQuestions(newQuestions)
  }

  return (
    <div>
      <div className='text-3xl'>{surveyName}</div>
      {questions.map((question: QuestionArrayOfObjects[], index: number) => (
        <NewQuestionBlock
          key={index}
          value={question}
          onChange={(e) => handleNewQuestion(e, index)}
        />
      ))}
      <button onClick={addQuestion} className='m-8'>Add a new survey question</button>
      <div>
        {questions.length > 0 ?
          <button onClick={submitFormToServer}>submit</button> :
          null}
      </div>

    </div>
  )
}

type NewSurveyNameProps = {
  value: string,
  onChange: React.ChangeEventHandler<HTMLInputElement>,
  generateForm: any
}

const NewSurveyName = ({ value, onChange, generateForm }: NewSurveyNameProps) => {
  return (
    <div>
      <div className='text-2xl mb-8'>You can create a new Survey here!</div>
      <div className='mb-8'>
        <h3>Enter Survey Name:</h3>
        <input className='border-2' value={value} onChange={onChange} />
        {/* <button className='border-red-200' onClick={generateForm}>create</button> */}
        {/* <button onClick={() => setSurveyName(value)}>set</button> */}
      </div>

    </div>
  )
}

const NewQuestionBlock = ({ value, onChange }) => {
  return (
    <div className='m-4'>
      <h3>Question:</h3>
      <input className='border-2' value={value} onChange={onChange} />

    </div>
  )
}

const CreateSurveyForm = () => {
  const [surveyName, setSurveyName] = useState('')
  const [questions, setQuestions] = useState([])
  const [isFormGenerated, setIsFormGenerated] = useState(false)
  const [newQuestion, setNewQuestion] = useState('')

  const submitFormToServer = async (e) => {
    const createdSurvey = { name: surveyName, questions: questions }

    e.preventDefault(); // Prevent the default form submission behavior
    const response = await axios.post(serverURL + "/create", createdSurvey);
    // const response = otherMachine.sum(2, 2)
    console.log(response)
    location.reload();
  };

  const addQuestion = () => {
    setQuestions([...questions, ''])
  }

  const generateForm = () => {
    console.log("generating form with name:", surveyName, "and questions:", questions)
  }

  console.log(questions)

  return (
    <div>
      <NewSurveyName
        value={surveyName}
        onChange={(e) => setSurveyName(e.target.value)}
        generateForm={generateForm}
      />
      <GenerateNewForm
        surveyName={surveyName}
        questions={questions}
        addQuestion={addQuestion}
        setQuestions={setQuestions}
        submitFormToServer={submitFormToServer}
      />



    </div>
  )


}

export default CreateSurveyForm