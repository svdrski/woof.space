import { Link, useLocation} from "react-router-dom"

import homeimg from '../Img/Home1.svg'
import homeactive from '../Img/homeactive.svg'
import lupaimg from '../Img/Search1.svg'
import lupaactive from '../Img/seatchactive.svg'
import activechat from '../Img/activechat.svg'
import heartImg from '../Img/heartt.svg'
import activeHeart from '../Img/Heart1.svg'
import messageImg from '../Img/Chat1.svg'
import profileImg from '../Img/Group.svg'
import { useEffect, useState } from "react"


export default function MobileMenuContainer ( {setActivefriend, activefriend, sethideOnmobile}) {

    const location = useLocation();

    const [activePage, setActivePage] = useState('search')


    console.log(location.pathname);

      function clearActivefriend() {
        if(location.pathname === '/search') {return} 
        setActivefriend(null);
        sethideOnmobile(false)
      }


      console.log(location.pathname === '/')

    return (
        <div className="mobmenuContainer">
            <Link to={'/'}><img src={location.pathname === '/' ? homeactive : homeimg}/></Link>
            <Link to={'/search'} ><img src={location.pathname === '/search' ? lupaactive : lupaimg}/></Link>
            <Link to={'/chat'}  onClick={clearActivefriend} ><img src={location.pathname === '/chat' && activefriend === null? activeHeart : heartImg} /></Link>
            <Link to={'/chat'}  ><img src={location.pathname === '/chat' && activefriend !== null? activechat: messageImg}/></Link>
            <Link to={'/profile'}><img src={profileImg}/></Link>
        </div>
    )
}