import AutoCompleteField from '../Components/CityAutocomplete';
import icnlocat from '../Img/locationicn.svg'
import edit from '../Img/Vectoredit.svg'
import editact from '../Img/Vectoreditact.svg'
import msgicn from '../Img/mssg.svg'
import { useEffect, useState } from 'react';
import { useMyContext } from '../Components/UserDataContext';
import { useMessengerContext } from './Context/MessengerContext';
import { useNavigate } from 'react-router-dom';


import axios from 'axios';

export default function ProfileInfo  ({data}) {

    const [settings, setSettings] = useState(false)
    const [error, setError] = useState('')

    const navigate = useNavigate();



    const {userdata} = useMyContext()
    const {friendsList, setExtraOpponent} = useMessengerContext()


    const [formData, setFormData] = useState("")
    
    const sendMessage = () =>{
        setExtraOpponent(data)
        navigate('/chat');
    }


    const saver = async (e)=>{
        e.preventDefault()
        const data = {
            id: userdata._id,
            city: formData.city,
            name: e.target.name.value
        }

        const response =  await axios.post('http://localhost:3333/profile/update', data ,{
            headers: {"Contet-Type" : "application/json"},
            withCredentials: true
        })
        
        if (response.status === 203) { window.location.reload();} else {
        }


    }

    useEffect(()=>{
        console.log(friendsList, data)

    }, [friendsList])


    return (
        <div className='chatcontainer profileContainer'>
            <div className='imgblockProfile'>
            <img className='profileMainPhoto' src={data.photos[0] ? `http://localhost:3333/${data.photos[0].slice(2, data.photos[0].length)}` : 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAG1BMVEXr6+vY2Njp6ena2trd3d3g4ODj4+Pm5ubW1tbKf8WKAAADqklEQVR4nO3a25biIBBGYUMOzPs/8aiQSOAHk8zYTbn2d9m0LsqC4pDcbgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAY9w83S2u1u5D+0926f+ah2jyqnkZY/Mom/vnpuFF5OlNswFpBMMwZ61u3DVbDHEZhlYM+/iHsTpXu5Xl6G432ea8Nc9x/4oQhjFpzRNsMYlFCnfjtN1qgitDSNJUpvC+ovxmdy9QMbzSNInGsfV1HSqnYRKEV42DsYkoI1zLqW78igjjkiDqzLdEGKqJqkLfEmGoprIKmYtQR9GK0Fot1eUy5Kk1gg1pVJNmFbJDLerNCM2dgvVkq0dobRqq09PQrDTmpqHOVAhDViFja8WTCGOuthhMoUxidV9q5/zr054WM7F+tkiXCt9tVXXzM6TXBXBRbLau50vJFqCP39FlkH6LZ1xPulnRfM21bO+95tZN23d0uP7vRt4U0+hHEcfD8va/+ys9+4G3Vo7k3nvaFZMk42u6soz3djOVr+JbwpYpzs7sA3HWjvMaeF5+eiuvRd1MRpnzurO7v5d7oL6SKPZoJztY7tT7moliq3luK/3PX/BpajN9quCrffqnOnuJivBMqZAHqs9194L2Ffd78kbgc929QEZ4fCLpW50P9ve8xon+CAOnfi+H2eFhKj/d12qh+3i4msoR0NnmW46zMgvOe7HBkdf8vb2CImtFFuH98Bfk7xDpCH+w94eo+9E0wrjT3prSDMkI+9qW3t4+uJ7LK41XjPKR+C/E8IaoNVuEiy6W21j9YyCFcibGXjp9w5+EUf4AnS0VQVlOwzjUa+UukNpHe5OnKkwl/Rxm+59nKEX++wywOAY/x2A7wDWY7MfpbLFPTEU3q1Nw/0Psfpze1vqdZM14TrEDAYYQk8nadYC3beELd2uHAoxZjHdvBt6Jds4v8dHDwQDjXLx/bqncyvXqbZHJQjSn8tqM1Nv17yGVN58qutzDtMnn+A39LoE1JyZhYG0qVt6JaujwuNR0cow+9L8Qps7U0S2JpurphRTaKjany0xgKImXUmhpJp4vpIGdcnpxkBpaEy8OUju1pnX11GZld3plMQysTMTrEfb1ULSOCImwf/Va+nh2OI31Umulllbu2MY5XqU5r59FGdq2iRuMac4e+y7iZzCTwmKcjrPajvl8c2dlRxPE10rvM2+S4QV+Xt97HvMkG+Ae7114967fz/9SL2gAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAX+wvqtkVJSpt2GwAAAAASUVORK5CYII='}/>

            <div className='rightphotosProfile'> 
                <img className='profileSmPhoto' src={data.photos[1] ? `http://localhost:3333/${data.photos[1].slice(2, data.photos[1].length)}` : 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAG1BMVEXr6+vY2Njp6ena2trd3d3g4ODj4+Pm5ubW1tbKf8WKAAADqklEQVR4nO3a25biIBBGYUMOzPs/8aiQSOAHk8zYTbn2d9m0LsqC4pDcbgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAY9w83S2u1u5D+0926f+ah2jyqnkZY/Mom/vnpuFF5OlNswFpBMMwZ61u3DVbDHEZhlYM+/iHsTpXu5Xl6G432ea8Nc9x/4oQhjFpzRNsMYlFCnfjtN1qgitDSNJUpvC+ovxmdy9QMbzSNInGsfV1HSqnYRKEV42DsYkoI1zLqW78igjjkiDqzLdEGKqJqkLfEmGoprIKmYtQR9GK0Fot1eUy5Kk1gg1pVJNmFbJDLerNCM2dgvVkq0dobRqq09PQrDTmpqHOVAhDViFja8WTCGOuthhMoUxidV9q5/zr054WM7F+tkiXCt9tVXXzM6TXBXBRbLau50vJFqCP39FlkH6LZ1xPulnRfM21bO+95tZN23d0uP7vRt4U0+hHEcfD8va/+ys9+4G3Vo7k3nvaFZMk42u6soz3djOVr+JbwpYpzs7sA3HWjvMaeF5+eiuvRd1MRpnzurO7v5d7oL6SKPZoJztY7tT7moliq3luK/3PX/BpajN9quCrffqnOnuJivBMqZAHqs9194L2Ffd78kbgc929QEZ4fCLpW50P9ve8xon+CAOnfi+H2eFhKj/d12qh+3i4msoR0NnmW46zMgvOe7HBkdf8vb2CImtFFuH98Bfk7xDpCH+w94eo+9E0wrjT3prSDMkI+9qW3t4+uJ7LK41XjPKR+C/E8IaoNVuEiy6W21j9YyCFcibGXjp9w5+EUf4AnS0VQVlOwzjUa+UukNpHe5OnKkwl/Rxm+59nKEX++wywOAY/x2A7wDWY7MfpbLFPTEU3q1Nw/0Psfpze1vqdZM14TrEDAYYQk8nadYC3beELd2uHAoxZjHdvBt6Jds4v8dHDwQDjXLx/bqncyvXqbZHJQjSn8tqM1Nv17yGVN58qutzDtMnn+A39LoE1JyZhYG0qVt6JaujwuNR0cow+9L8Qps7U0S2JpurphRTaKjany0xgKImXUmhpJp4vpIGdcnpxkBpaEy8OUju1pnX11GZld3plMQysTMTrEfb1ULSOCImwf/Va+nh2OI31Umulllbu2MY5XqU5r59FGdq2iRuMac4e+y7iZzCTwmKcjrPajvl8c2dlRxPE10rvM2+S4QV+Xt97HvMkG+Ae7114967fz/9SL2gAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAX+wvqtkVJSpt2GwAAAAASUVORK5CYII='}/>
                <img className='profileSmPhoto' src={data.photos[2] ? `http://localhost:3333/${data.photos[2].slice(2, data.photos[2].length)}` : 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAG1BMVEXr6+vY2Njp6ena2trd3d3g4ODj4+Pm5ubW1tbKf8WKAAADqklEQVR4nO3a25biIBBGYUMOzPs/8aiQSOAHk8zYTbn2d9m0LsqC4pDcbgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAY9w83S2u1u5D+0926f+ah2jyqnkZY/Mom/vnpuFF5OlNswFpBMMwZ61u3DVbDHEZhlYM+/iHsTpXu5Xl6G432ea8Nc9x/4oQhjFpzRNsMYlFCnfjtN1qgitDSNJUpvC+ovxmdy9QMbzSNInGsfV1HSqnYRKEV42DsYkoI1zLqW78igjjkiDqzLdEGKqJqkLfEmGoprIKmYtQR9GK0Fot1eUy5Kk1gg1pVJNmFbJDLerNCM2dgvVkq0dobRqq09PQrDTmpqHOVAhDViFja8WTCGOuthhMoUxidV9q5/zr054WM7F+tkiXCt9tVXXzM6TXBXBRbLau50vJFqCP39FlkH6LZ1xPulnRfM21bO+95tZN23d0uP7vRt4U0+hHEcfD8va/+ys9+4G3Vo7k3nvaFZMk42u6soz3djOVr+JbwpYpzs7sA3HWjvMaeF5+eiuvRd1MRpnzurO7v5d7oL6SKPZoJztY7tT7moliq3luK/3PX/BpajN9quCrffqnOnuJivBMqZAHqs9194L2Ffd78kbgc929QEZ4fCLpW50P9ve8xon+CAOnfi+H2eFhKj/d12qh+3i4msoR0NnmW46zMgvOe7HBkdf8vb2CImtFFuH98Bfk7xDpCH+w94eo+9E0wrjT3prSDMkI+9qW3t4+uJ7LK41XjPKR+C/E8IaoNVuEiy6W21j9YyCFcibGXjp9w5+EUf4AnS0VQVlOwzjUa+UukNpHe5OnKkwl/Rxm+59nKEX++wywOAY/x2A7wDWY7MfpbLFPTEU3q1Nw/0Psfpze1vqdZM14TrEDAYYQk8nadYC3beELd2uHAoxZjHdvBt6Jds4v8dHDwQDjXLx/bqncyvXqbZHJQjSn8tqM1Nv17yGVN58qutzDtMnn+A39LoE1JyZhYG0qVt6JaujwuNR0cow+9L8Qps7U0S2JpurphRTaKjany0xgKImXUmhpJp4vpIGdcnpxkBpaEy8OUju1pnX11GZld3plMQysTMTrEfb1ULSOCImwf/Va+nh2OI31Umulllbu2MY5XqU5r59FGdq2iRuMac4e+y7iZzCTwmKcjrPajvl8c2dlRxPE10rvM2+S4QV+Xt97HvMkG+Ae7114967fz/9SL2gAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAX+wvqtkVJSpt2GwAAAAASUVORK5CYII='}/>
            </div>
            </div>


        <div className='infoContainer'>

            <div className='personalInfo'>
                <div className='nameLocat'>
                    <h2>{data.dogname}</h2>
                    <img src={icnlocat}></img>
                    <p>{data.city}</p>
                    {userdata._id === data._id ? <img className='edit' onClick={()=>{setSettings((prev)=> !prev)}} src={settings ? editact : edit}></img> : '' } 
                </div>

                <p className='stringP'>Gender: <span className='stringB'>{data.gender}</span></p>
                <p className='stringP'>Age: <span className='stringB'>{data.age}</span></p>
                <p className='stringP'>Breed: <span className='stringB'>{data.breed}</span></p>
                
                <div className='ownerData'>
                    <p>Owner: <span className='stringB'>{data.name}</span></p>
                </div>

                {
                          friendsList.find(item => item._id === data._id) ? (
                            <img className='msgbttn' src={msgicn} onClick={sendMessage}/>
                          ) : ""
                }
               

            </div>

            <div className={` personalInfo ${settings ? "activesetngs": "disablsetngs"}`}>
                <h3>Edit</h3>
                <form onSubmit={(e)=>{saver(e)}}>
                <AutoCompleteField setFormData={setFormData} formData={formData}/>
                <label htmlFor='name'>Owner name</label>
                <input className='inpedit'  value={formData.name} name='name' required/>
                <input className='savebtn' type='submit' value='save'/>
               {error.length ? <p> {error} </p> : ""}
                </form>

                {/* <button onClick={()=>{console.log(formData)}}>show</button> */}
                
            </div>

        </div>
           
        </div>
    )
}