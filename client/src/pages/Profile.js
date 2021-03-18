import ShovelerDashboard from '../views/ShovelerDashboard';
import UserProfile from '../views/UserProfile';
import axios from 'axios';
import {useEffect, useState} from 'react';
import Header from "../components/Header"
import JobPostForm from '../components/JobPostForm';
// import Weather from '../components/Weather';



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
    }, []);
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
        <JobPostForm />
      

        {jsx}
        {/* <Weather/> */}
        </>
    );
}

export default Profile;