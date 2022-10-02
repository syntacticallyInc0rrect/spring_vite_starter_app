import {Dispatch, SetStateAction} from 'react'
import './App.css'
import {User} from "./userApi";
import LoginPage from "./LoginPage";
import BodyElement from "./BodyElement";

type AppProps = {
    currentUser: User | 'noCurrentUser';
    setCurrentUser: Dispatch<SetStateAction<User | "noCurrentUser">>;
    isOnScoreboardPage: boolean;
}

const App = ({currentUser, setCurrentUser, isOnScoreboardPage}: AppProps) => {
    if (currentUser === 'noCurrentUser') return (
        <LoginPage setCurrentUser={setCurrentUser}/>
    );

    else return <BodyElement currentUser={currentUser} isOnScoreboardPage={isOnScoreboardPage}/>;
}

export default App
