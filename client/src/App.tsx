import {useState} from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import {User} from "./userApi";
import LoginPage from "./LoginPage";

const App = () => {
    const [count, setCount] = useState(0);
    const [currentUser, setCurrentUser] = useState<User | 'isInLoadingState' | 'noCurrentUser'>('noCurrentUser');

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

    if (currentUser === 'noCurrentUser') return <LoginPage setCurrentUser={setCurrentUser}/>;

    return (
        <div className="App">
            <h1>Vite + React</h1>
            <h2>{`Hello ${currentUser.username}!`}</h2>
            <div className="card">
                <button onClick={() => setCount((count) => count + 1)}>
                    count is {count}
                </button>
                <p>
                    Edit <code>src/App.tsx</code> and save to test HMR
                </p>
            </div>
            <p className="read-the-docs">
                Click on the Vite and React logos to learn more
            </p>
        </div>
    )
}

export default App
