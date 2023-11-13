import axios from 'axios'
import { useState } from 'react'
import errimg from '../Img/err.svg'
import RegistrationSteps from './RegistrationSteps'

export default function RegistrationForm (){

    const [message, setMessage] = useState('')
    const [formData, setFormData] = useState( {
        name:'',
        email:'',
        password:'',
        password2: '',
        dogname:'',
        breed:'',
        age: '',
        gender:'',
        description:'',
        city:''
    })
    const [step, setStep] = useState(1)


    function stepBrowse(e, param) {
        e.preventDefault()
        if( step === 1 && (!formData.name || !formData.email || !formData.password || !formData.password2)) {return setMessage('Empty fields')} else if(step === 1) {setMessage()}
                param === '+' ?  setStep(step + 1) : setStep(step - 1)
    }

    async function formSaver(e) {
        e.preventDefault();
        setMessage('');
      
        const formData = new FormData(e.target);
      
        try {
          const request = await axios.post('http://localhost:3333/registration', formData);
          console.log(request.data);
          setMessage(request.data.status);
        } catch (e) {
          // console.log(e)
          if (e.response.status === 409) {
            setStep(1);
          }
          if (e.response.status === 410) {
            setStep(2);
          }
          setMessage(e.response?.data);
        }
      }



    return(
        <div className="regFormContainer">
            <div className="headerBlock">
                <h3>Registration</h3>
            </div>

            <div className="formArea">
                <form onSubmit={formSaver}>
                    
                    <RegistrationSteps step={step} formData={formData} setFormData={setFormData}/>
                     {message && <span><img src={errimg}/> <p>{message}</p></span>}
                     <span className='navbtns'>
                        {step !== 1 && <button onClick={(e)=>{stepBrowse(e, '-')}} className='formPrevbtn'>Back</button>}
                        {step !== 3 && <button onClick={(e)=>{stepBrowse(e, '+')}} className='formNextbtn'>Next</button>}
                        {step === 3 && <input type='submit' className="formNextbtn submitreg" value='Registration'></input>}
                     </span>

                </form>


            </div>
        </div>
    )
}