import {Dispatch, FormEvent, SetStateAction, useState} from "react";
import {loginWithCredentials, registerWithCredentials, User, UserCredentials} from "./userApi";

type LoginPageProps = {
    setCurrentUser: Dispatch<SetStateAction<User | "isInLoadingState" | "noCurrentUser">>
}

const LoginPage = ({setCurrentUser}: LoginPageProps) => {
    const [formStatus, setFormStatus] = useState<'closed' | 'signIn' | 'register'>('closed');
    const [failedAttempt, setFailedAttempt] = useState<boolean>(false);

    const closeForm = () => {
        setCredentials({username: '', password: ''});
        setFormStatus('closed');
    }

    const [credentials, setCredentials] = useState<UserCredentials>({username: '', password: ''});

    const handleResponse = (response: any) => {
        if (response.status === 404) {
            setFailedAttempt(true);
        } else {
            setCurrentUser(response.data);
            closeForm();
        }
    };

    const handleError = (_error: any) => {
        setCurrentUser('noCurrentUser');
    };

    const onSubmitFn = (e: FormEvent) => {
        e.preventDefault();
        setCurrentUser('isInLoadingState');
        if (formStatus === 'signIn') loginWithCredentials(credentials).then(handleResponse).catch(handleError);
        if (formStatus === 'register') registerWithCredentials(credentials).then(handleResponse).catch(handleError);
    };

    return (
        <div data-testid='login-page'>
            <h1>My Application</h1>
            {failedAttempt && (
                <div>
                    <h3>Error fetching user with the credentials provided...</h3>
                    <h4>Ensure your credentials are correct and try again</h4>
                </div>
            )}
            <button onClick={() => setFormStatus('register')}>Create an Account</button>
            <button onClick={() => setFormStatus('signIn')}>Sign in</button>
            {formStatus !== 'closed' && (
                <div>
                    <h4>
                        {
                            formStatus === 'signIn' ?
                                'Enter Username and Password to Sign in' :
                                'Create Username and Password to Register'
                        }
                    </h4>
                    <form onSubmit={onSubmitFn}>
                        <label
                            id='username-label'
                            htmlFor='username'
                        >
                            Username:
                        </label>
                        <input
                            type='text'
                            id='username'
                            name='username'
                            onChange={(e) => setCredentials({...credentials, username: e.target.value})}
                            aria-labelledby='username-label'
                        />
                        <label
                            id='password-label'
                            htmlFor='password'
                        >
                            Password:
                        </label>
                        <input
                            type='text'
                            id='password'
                            name='password'
                            onChange={(e) => setCredentials({...credentials, password: e.target.value})}
                            aria-labelledby='password-label'
                        />
                        <button type='submit'>SUBMIT</button>
                    </form>
                </div>
            )}
        </div>
    );
};

export default LoginPage;
