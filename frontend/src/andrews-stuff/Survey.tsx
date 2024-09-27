
// I want this component to represent a Survey.
// That means all the things that a Survey is.
// It also means it should be re-usable
// and I should be able to list it, and stuff like that.

import Question from "./Question"

export type Answer = {
  id: number,
  value: string,
}

export type QuestionType = {
  id: number,
  name: string,
  answers: Answer[]
}

export type SurveyType = {
  id: number,
  name: string,
  questions: QuestionType[]
}

const Survey = ({ survey, editMode }: { survey: SurveyType, editMode: boolean }) => {
  return (
    <div className="bg-red-300 rounded-lg p-4 gap-2 flex flex-col">
      This is a Survey
      <button className="w-32 h-8 border-2 border-black">take survey!</button>
      <button className="w-32 h-8 border-2 border-black">edit survey!</button>
      <div className="gap-2 flex flex-col">
        {survey?.questions?.map((question) => {
          return <Question question={question} editMode={editMode} />
        })}
      </div>
    </div>
  )
}

export default Survey