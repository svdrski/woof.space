import './Css/Homepage.css'
import { Link } from 'react-router-dom'
import logo from '../Img/logo.svg'

export default function Homepage (){


    return(
        <div className="container">
            <section className="left-side block-area">
                <img src={logo}></img>
                <h1>Let’s do something together !</h1>
                <h2>Connecting Dogs, Creating Bonds: Where Canine Companionship Begins</h2>
            <Link to='/login'><button>Let's start</button></Link>
            </section>

            <section className="right-side block-area">
                <nav>
                    <Link to='/registration'>Registration</Link>
                    <Link to='/Login'>Login</Link>
                </nav>
            </section>
        </div>
    )
}