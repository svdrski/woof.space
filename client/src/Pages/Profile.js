import { useMyContext } from '../Components/UserDataContext';
import Header from '../Components/Header';
import './Css/Profile.css'
import ProfileInfo from '../Components/ProfileInfo';
import MobileMenuContainer from '../Components/mobileMenuContainer';
import './Css/Auth.css'

export default function Profile (){

    const {userdata} = useMyContext()

    return(
        <>
        <Header/>
        <ProfileInfo data={userdata}/>
        <MobileMenuContainer />
        </>
    )
}  