import { useState, useEffect } from 'react'
import axios from 'axios';
const serverURL = "http://localhost:3000";

// I want this to dislpay a survey for a user to take

// Define types for your data
type Question = {
  id: string;
  name: string;
  surveyId: string;
};

type Survey = {
  id: string;
  name: string;
  questions: Question[];
};

const Surveys: React.FC = () => {

  const [surveys, setSurveys] = useState<Survey[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // when the page loads, run useEffect and store all the survey data in state
  useEffect(() => {
    const fetchSurveys = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get<Survey[]>(`${serverURL}/surveys`);
        setSurveys(response.data);
        setError(null);
      } catch (err) {
        setError('Failed to fetch surveys. Please try again later.');
        console.error('Error fetching surveys:', err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchSurveys();
  }, []);

  if (isLoading) return <div>Loading surveys...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <div className='text-6xl'>Available Surveys</div>
      {surveys.length === 0 ? (
        <p>No surveys available.</p>
      ) : (
        surveys.map((survey) => (
          <div className='m-4 border-2' key={survey.id}>
            <div className='text-4xl'>{survey.name}</div>
            {survey.questions && survey.questions.length > 0 ? (
              <>
                <ul>
                  {survey.questions.map((question) => (
                    <li key={question.id}>{question.name}</li>
                  ))}
                </ul>
                <div>{survey.id}</div>
                {console.log(survey)}
              </>
            ) : (
              <p>No questions available for this survey.</p>
            )}
          </div>
        ))
      )}
    </div>
  )
}

export default Surveys