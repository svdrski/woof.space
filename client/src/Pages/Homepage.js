import './Css/Homepage.css'
import { Link } from 'react-router-dom'
import logo from '../Img/logo.svg'
import biglogo from '../Img/bigLogo.svg'
import dogimg from '../Img/dosgimg.jpg'
import lightHeart from '../Img/lightheart.svg'
import mockup from '../Img/mockup.png'
import MobileMenuContainer from '../Components/mobileMenuContainer'
import Header from '../Components/Header'
import { useMyContext } from '../Components/UserDataContext';

export default function Homepage (){

    const {userdata} = useMyContext()

    return(
        <>
         <Header/>
        <div className={`contContainer ${userdata._id ? "logvh" : ''}`}>
        {!userdata._id &&
            <div className='navigate'>
                <img src={logo}/>
                
                    <nav>
                    <Link  to='/Login'>Login</Link>
                    <Link className='ml' to='/registration'>Registration</Link>
                    </nav>
                
            </div>
        }
            <div className='mainBox'>
                <div className='leftSide'>
                    <div className='headerContainer'>
                        <img src={biglogo}/>
                        <h1>Let’s do <br />  something together !</h1>
                        <p>Connecting Dogs, Creating Bonds: Where Canine Companionship Begins</p>
                    </div>

                    <div className='bottomBlock'>
                        <img src={dogimg}/>
                        <div className='btnBlock'>
                            <div className='lighthrt'>
                                <img src={lightHeart}/>
                                <p>Best way to get puppies for your Dog</p>
                            </div>
                            <a href="https://wooff.space/search">Let's start</a>


                        </div>
                    </div>


                </div>

                <div className='rightSide'>
                    <img src={mockup}/>
                </div>
                <a className='startntm' href="https://wooff.space/search">Let's start</a>


            </div>
        </div>
        {userdata._id && <MobileMenuContainer/>}
        </>
        
    )
}