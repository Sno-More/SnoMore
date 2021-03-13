import SignUp from '../views/SignUp';
import LogIn from '../views/LogIn';
import {useState} from 'react';

const Welcome = () => {
    const [welcome, setWelcome] = useState(true);
    const handleChangeView = (e) => {
        e.preventDefault();
        setWelcome(!welcome);
    };
    const views = (welcome) ? <LogIn handleChangeView={handleChangeView}/> : <SignUp handleChangeView={handleChangeView}/>;
    console.log(views)
    return (
        <>
        {views}
        </>
    );
}

export default Welcome;