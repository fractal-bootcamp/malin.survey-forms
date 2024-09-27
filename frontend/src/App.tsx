import { useEffect, useState } from 'react'
import Alert from 'react-popup-alert'
import './App.css'
import axios from 'axios'
const serverURL = "http://localhost:3000";

interface CreateFormSectionProps {
  questionToAsk: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

interface ContactDetails {
  name: string;
  address: string;
  email: string;
}

interface SubmitFormProps {
  value: ContactDetails;
  onSubmit: (e: React.FormEvent<HTMLFormElement>, formData: ContactDetails) => Promise<void>;
}

const CreateFormSection: React.FC<CreateFormSectionProps> = ({ questionToAsk, value, onChange }) => {
  // we're literally passing the onFormSubmit(e,formData) function to CreateForm component
  // wherever you see the onSubmit below you can replace it in your head with onFormSubmit()

  return (
    <div className='m-2'>
      <div className='text-base p-1 text-left'>
        {questionToAsk}
      </div>
      <div className='flex flex-row'>
        <div className='border-2'>
          <input value={value} onChange={onChange} />
        </div>
      </div>
    </div>
  )
}

const SubmitForm: React.FC<SubmitFormProps> = ({ value, onSubmit }) => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(e, value)
    window.location.reload();
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <button type="submit" className='ml-2'>submit</button>
      </div>
    </form>

  )
}

function App() {
  const [contactDetails, setContactDetails] = useState({
    name: '',
    address: '',
    email: '',
  })

  const onFormSubmit = async (e: React.FormEvent<HTMLFormElement>, formData: ContactDetails) => {
    e.preventDefault(); // Prevent the default form submission behavior
    await axios.post(serverURL + "/submit", contactDetails);
  };

  return (
    <>
      <h2 className='text-3xl mb-4'>Contact Details</h2>

      <CreateFormSection
        questionToAsk="What is your name homie?"
        value={contactDetails.name}
        onChange={(e) => setContactDetails(prevDetails => ({ ...prevDetails, name: e.target.value }))}
      />
      <CreateFormSection
        questionToAsk="What city do you live in?"
        value={contactDetails.address}
        onChange={(e) => setContactDetails(prevDetails => ({ ...prevDetails, address: e.target.value }))}
      />
      <CreateFormSection
        questionToAsk="What's your email address?"
        value={contactDetails.email}
        onChange={(e) => setContactDetails(prevDetails => ({ ...prevDetails, email: e.target.value }))}
      />
      <SubmitForm
        value={contactDetails}
        onSubmit={onFormSubmit}
      />

    </>
  )
}

export default App
