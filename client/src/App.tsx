import {Dispatch, SetStateAction} from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import {User} from "./userApi";
import LoginPage from "./LoginPage";
import BodyElement from "./BodyElement";

type AppProps = {
    currentUser: User | 'isInLoadingState' | 'noCurrentUser';
    setCurrentUser: Dispatch<SetStateAction<User | "isInLoadingState" | "noCurrentUser">>;
    isOnScoreboardPage: boolean;
}

const App = ({currentUser, setCurrentUser, isOnScoreboardPage}: AppProps) => {
    if (currentUser === 'isInLoadingState') return (
        <div>
            <h1>Fetching current user...</h1>
            <img src={reactLogo} className="logo react" alt="React logo"/>
        </div>
    );

    if (currentUser === 'noCurrentUser') return (
        <LoginPage setCurrentUser={setCurrentUser}/>
    );

    else return <BodyElement currentUser={currentUser} isOnScoreboardPage={isOnScoreboardPage}/>;
}

export default App
