import { Link} from "react-router-dom"

import homeimg from '../Img/Home1.svg'
import lupaimg from '../Img/Search1.svg'
import heartImg from '../Img/Heart1.svg'
import messageImg from '../Img/Search1.svg'
import profileImg from '../Img/Group.svg'


export default function MobileMenuContainer () {


    return (
        <div className="mobmenuContainer">
            <Link to={'/'}><img src={homeimg}/></Link>
            <Link to={'/search'}><img src={lupaimg}/></Link>
            <Link to={'/matches'}><img src={heartImg}/></Link>
            <Link to={'/chat'}><img src={messageImg}/></Link>
            <Link to={'/profile'}><img src={profileImg}/></Link>
        </div>
    )
}