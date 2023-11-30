import axios from 'axios'
import { useState } from 'react'
import errimg from '../Img/err.svg'
import RegistrationSteps from './RegistrationSteps'
import { Link, useNavigate } from 'react-router-dom'

const URL = process.env.REACT_APP_BASE_URL


export default function RegistrationForm (){

    const navigate = useNavigate();

    const [message, setMessage] = useState('')
    const [selectedFiles, setSelectedFiles] = useState([]);

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
        try{
            if( step === 1 && (!formData.name || !formData.email || !formData.password || !formData.password2)) {return setMessage('Empty fields')} else if(step === 1) {setMessage()}
            param === '+' ?  setStep(step + 1) : setStep(step - 1)
            setSelectedFiles([])
        } catch(e) {console.log('Error ', e)}
    }


    const handleFileChange = (e) => {
        try{
            const files = Array.from(e.target.files);
            setSelectedFiles(files);
        } catch(e) {console.log('Error ', e)}

      };

    async function formSaver (e){
        e.preventDefault()
        setMessage('')
       const sendData = new FormData(e.target);
       for (const key in formData) {
        sendData.append(key, formData[key]);
    }

        try{
            setSelectedFiles([])
             await axios.post(`${URL}/registration`, sendData,{
                headers: {"Contet-Type" : "application/json"},
                withCredentials: true
            })
            navigate('/search')
        } catch(e) {
            if(e.response.status === 409) {setStep(1)}
            if(e.response.status === 410) {setStep(2)}
            setMessage(e.response?.data)
        }
    }

    return(
        <div className="regFormContainer">
            <div className="headerBlock">
                <h3>Registration</h3>
            </div>

            <div className="formArea">
                <form onSubmit={formSaver}>
                    <RegistrationSteps step={step} formData={formData} setFormData={setFormData} func={{selectedFiles, setSelectedFiles, handleFileChange}}/>
                     {message && <span><img src={errimg}/> <p>{message}</p></span>}
                     <span className='navbtns'>
                        {step !== 1 && <button onClick={(e)=>{stepBrowse(e, '-')}} className='formPrevbtn'>Back</button>}
                        {step !== 3 && <button onClick={(e)=>{stepBrowse(e, '+')}} className='formNextbtn'>Next</button>}
                        {step === 3 && <input type='submit' className="formNextbtn submitreg" value='Registration'></input>}
                     </span>

                </form>
            </div>

            <Link className='loginLInks' to='/login'>Already have account ? Login</Link>

        </div>

        
    )
}