import ShovelerDashboard from '../views/ShovelerDashboard';
import UserProfile from '../views/UserProfile';
import axios from 'axios';
import {useEffect, useState} from 'react';
import Header from "../components/Header"
import {useHistory} from "react-router-dom";
// import Weather from '../components/Weather';



const Profile = () => {
    const [myJobs, setMyJobs] = useState([])
    const [view, setView] = useState('')
    let history = useHistory()
    useEffect(() => {
        const getRole = async () => {
            try {
                const user = await axios.get('/user/info');
    
                if (user.data[0].role === 'Shoveler') {
                    setView('Shoveler')
                } else {
                    setView('Poster')
                };
    
            } catch (error) {
                console.log(error)
                history.push('/')
            }
        };
        getRole();
    }, [history]);
    useEffect(() => {
        const fetchJobs = async () => {
            const jobs = await axios.get('/api/user/jobs');
            setMyJobs(jobs.data.jobs);
        };
        fetchJobs();
    }, []);
    const jsx = (view === '') ? (<div>Fetching profile...</div>)
         : (view === 'Shoveler') ? (<ShovelerDashboard myJobs={myJobs}/>) 
         : (<UserProfile myJobs={myJobs}/>)
    return (
        <>
        <Header />
        {jsx}
        {/* <Weather/> */}
        </>
    );
}

export default Profile;