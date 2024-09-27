
// this is a question and represents questions

import type { Answer, QuestionType } from "./Survey"

const Answer = ({ answer }: { answer: Answer }) => {
  return (
    <div>{answer.value}</div>
  )
}

const Question = ({ question }: { question: QuestionType }) => {
  return (
    <div className="bg-red-200 rounded-lg p-4">
      Question Name: {question.name}
      {question.answers.map((answer) => {
        return <Answer answer={answer} />
      })}
    </div>
  )
}

export default Question;