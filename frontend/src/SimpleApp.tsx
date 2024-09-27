import { useEffect, useState } from "react"
import Survey, { SurveyType } from "./Survey"
import axios from "axios"


// add React Router
// this is the Home Page
// also add a Survey/{id}/edit page
// also add a Survey/{id} page for taking the survey


const SimpleApp = () => {

  const [surveys, setSurveys] = useState<SurveyType[]>([])

  // i need to go get the surveys and then setSurveys()
  useEffect(() => {
    const fetch = async () => {
      const surveyRes = await axios.get('http://localhost:3000/surveys')
      console.log(surveyRes.data)
      setSurveys(surveyRes.data)
    }
    fetch()
  }, [])

  return (
    <div className="w-screen mx-auto">
      <div className="bg-red-600 rounded-lg gap-4 flex flex-col p-4 mx-auto max-w-screen-sm">
        {surveys.map((survey) => {
          return <Survey survey={survey} editMode={false} />
        })}
      </div>
    </div>
  )
}

export default SimpleApp