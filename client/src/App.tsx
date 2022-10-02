import {useEffect, useState} from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import {User} from "./userApi";
import LoginPage from "./LoginPage";

const App = () => {
    const getInitialCurrentUserState = (): User | 'isInLoadingState' | 'noCurrentUser' => {
        if (!localStorage.getItem('currentUserString') || localStorage.getItem('currentUserString') === 'noCurrentUser') {
            return 'noCurrentUser';
        } else if (localStorage.getItem('currentUserString') === 'isInLoadingState') {
            return 'isInLoadingState';
        } else {
            return {username: localStorage.getItem('currentUserString')} as User;
        }
    };

    const setLocalStorageForCurrentUser = (currentState: User | 'isInLoadingState' | 'noCurrentUser'): void => {
        if (typeof currentState === 'string') localStorage.setItem('currentUserString', currentState);
        else localStorage.setItem('currentUserString', currentState.username);
    };

    const [currentUser, setCurrentUser] = useState<User | 'isInLoadingState' | 'noCurrentUser'>(getInitialCurrentUserState());
    const [failedLoginAttempt, setFailedLoginAttempt] = useState<boolean>(false);


    useEffect(() => {
        setLocalStorageForCurrentUser(currentUser);
    }, [currentUser]);

    if (currentUser === 'isInLoadingState') return (
        <div>
            <h1>Fetching current user...</h1>
            <div>
                <a href="https://vitejs.dev" target="_blank">
                    <img src="/vite.svg" className="logo" alt="Vite logo"/>
                </a>
                <a href="https://reactjs.org" target="_blank">
                    <img src={reactLogo} className="logo react" alt="React logo"/>
                </a>
            </div>
        </div>
    );

    if (currentUser === 'noCurrentUser') return (
        <LoginPage
            setCurrentUser={setCurrentUser}
            failedLoginAttempt={failedLoginAttempt}
            setFailedLoginAttempt={setFailedLoginAttempt}
        />
    );

    return (
        <div className="App">
            <h1>Midterm</h1>
            <h2>{`Hello ${currentUser.username}!`}</h2>
            <div className="card">
                <button onClick={() => {
                    localStorage.clear();
                    setCurrentUser('noCurrentUser');
                }}>
                    SIGN OUT
                </button>
            </div>
        </div>
    )
}

export default App
