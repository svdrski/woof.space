import axios from 'axios'
import { useEffect, useState, useContext } from 'react'
import errimg from '../Img/err.svg'
import { Link, useNavigate } from 'react-router-dom'
import { cookies } from '../App'

export default function LoginForm (){

    const [message, setMessage] = useState('')
    const navigate = useNavigate();

    async function formSaver (e){
        e.preventDefault()
        setMessage('')

        const data = Object.fromEntries(new FormData(e.target))
        try{
             const user = await axios.post('http://localhost:3333/login', data, {
                headers: {"Contet-Type" : "application/json"},
                withCredentials: true
            } )
            navigate('/search')
        } catch(e) {
            setMessage(e.response?.data)
        }

    }

    // useEffect(()=>{
    //     const myCookieValue = cookies.get('token');
    //     if(myCookieValue) {navigate('/search')}
    
    // },[])



    return(
        <div className="regFormContainer">
            <div className="headerBlock">
                <h3>Login</h3>
            </div>

            <div className="formArea">
                <form onSubmit={formSaver}>
                        <label htmlFor='email'>Email</label>
                        <input className='inp' type="email" name='email' required/>
                        <label htmlFor='password'>Password</label>
                        <input className='inp'   type="password" name='password' required/>
                
                     {message && <span><img src={errimg}/> <p>{message}</p></span>}

                     <span className='navbtns'>
                         <input type='submit' className="formNextbtn submitreg" value='Login'></input>
                     </span>
                </form>
            </div>

            <Link className='loginLInks' to='/registration'>Don't have account ? Registration</Link>

        </div>

        
    )
}

