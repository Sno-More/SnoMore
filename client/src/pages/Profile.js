import ShovelerDashboard from '../views/ShovelerDashboard';
import UserProfile from '../views/UserProfile';
import axios from 'axios';
import {useEffect, useState} from 'react';
import Header from "../components/Header"

const Profile = () => {
    const [myJobs, setMyJobs] = useState([])
    const [view, setView] = useState('')
    useEffect(() => {
        const getRole = async () => {
            const user = await axios.get('/user/info');
            console.log(user.data);
            if (!user.data.length) return;

            if (user.data[0].role === 'Shoveler') {
                setView('Shoveler')
            } else {
                setView('Poster')
            };
        };
        getRole();
    }, [])
    const jsx = (view === '') ? (<div>Fetching profile...</div>)
         : (view === 'Shoveler') ? (<ShovelerDashboard myJobs={myJobs}/>) 
         : (<UserProfile myJobs={myJobs}/>)
    return (
        <>
        <Header />
        {jsx}
        </>
    );
}

export default Profile;