import './Css/Homepage.css'
import { Link } from 'react-router-dom'
import logo from '../Img/logo.svg'
import MobileMenuContainer from '../Components/mobileMenuContainer'
import Header from '../Components/Header'
import { useMyContext } from '../Components/UserDataContext';

export default function Homepage (){

    const {userdata} = useMyContext()

    return(
        <>
         <Header/>
        <div className="container">
            <section className="left-side block-area">
                <img src={logo}></img>
                <h1>Let’s do something together !</h1>
                <h2>Connecting Dogs, Creating Bonds: Where Canine Companionship Begins</h2>
            <Link to='/login'><button>Let's start</button></Link>
            </section>

            <section className="right-side block-area">
                {
                    !userdata._id &&
                                        <nav>
                                        <Link to='/registration'>Registration</Link>
                                        <Link to='/Login'>Login</Link>
                                        </nav>
                }
              
            </section>
        </div>
        {userdata._id && <MobileMenuContainer/>}
        </>
        
    )
}