import {Dispatch, SetStateAction, useState} from "react";
import {loginWithCredentials, registerWithCredentials, User, UserCredentials} from "./userApi";

type LoginPageProps = {
    setCurrentUser: Dispatch<SetStateAction<User | "noCurrentUser">>;
}

const LoginPage = ({setCurrentUser}: LoginPageProps) => {
        const [formStatus, setFormStatus] = useState<'initial' | 'incorrectLoginCredentials' | 'unavailableUsername'>('initial');

        const resetForm = () => {
            setCredentials({username: '', password: ''});
            setFormStatus('initial');
        };

        const [credentials, setCredentials] = useState<UserCredentials>({username: '', password: ''});

        const handleResponse = (user: User) => {
            setCurrentUser(user);
            resetForm();
        };

        const onSubmitFn = (isRegistration: boolean) => {
            isRegistration ?
                registerWithCredentials(credentials)
                    .then(handleResponse)
                    .catch((_error: any) => {
                        setFormStatus('unavailableUsername');
                    }) :
                loginWithCredentials(credentials)
                    .then(handleResponse)
                    .catch((_error: any) => {
                        setFormStatus('incorrectLoginCredentials');
                    });
        };

        const FormStatusMessage = ({status}: { status: 'initial' | 'unavailableUsername' | 'incorrectLoginCredentials' }) => {
            if (status === 'incorrectLoginCredentials') return (
                <div>
                    <p className="mt-2 text-center text-sm text-gray-600">
                        I'm sorry, the credentials provided did not match our records...
                    </p>
                    <p className="mt-2 text-center text-sm text-gray-600">
                        Ensure your credentials are correct and try again
                    </p>
                </div>
            );

            if (status === 'unavailableUsername') return (
                <div>
                    <p className="mt-2 text-center text-sm text-gray-600">
                        I'm sorry, that username is already taken.
                    </p>
                    <p className="mt-2 text-center text-sm text-gray-600">
                        Please click the sign in button if you meant to sign in or try a new username if you meant to register.
                    </p>
                </div>
            );
            else return <></>;
        };

        return (
            <div data-testid='login-page'
                 className='flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8'>
                <div className="w-full max-w-md space-y-8">
                    <div>
                        <div className="flex items-center justify-center">
                            <img src="/vite.svg" className="logo" alt="Vite logo"/>
                        </div>
                        <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">Welcome!</h2>
                    </div>
                    <FormStatusMessage status={formStatus}/>
                    <div>
                        <h4 className="text-center">Please enter a Username and Password to Sign in or Register</h4>
                        <div
                            className="mt-3"
                        >
                            <label
                                id='username-label'
                                htmlFor='username'
                                className="sr-only"
                            >
                                Username:
                            </label>
                            <input
                                type='text'
                                id='username'
                                name='username'
                                placeholder='Username'
                                onChange={(e) => setCredentials({...credentials, username: e.target.value})}
                                aria-labelledby='username-label'
                                className="relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                            />
                            <label
                                id='password-label'
                                htmlFor='password'
                                className="sr-only"
                            >
                                Password:
                            </label>
                            <input
                                type='password'
                                id='password'
                                name='password'
                                placeholder='Password'
                                autoComplete='current-password'
                                onChange={(e) => setCredentials({...credentials, password: e.target.value})}
                                aria-labelledby='password-label'
                                className="relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                            />
                            <p className="mt-2 text-center text-sm text-gray-600">
                                WARNING: password is transferred and stored as plain text.
                            </p>
                            <p className="text-center text-sm text-gray-600">
                                DO NOT use a sensitive password!
                            </p>
                            <div className="mt-2 grid grid-cols-2 gap-1">
                                <button
                                    className="group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                    onClick={() => onSubmitFn(true)}
                                >
                                    Create an Account
                                </button>
                                <button
                                    className="group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                    onClick={() => onSubmitFn(false)}
                                >
                                    Sign in
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
;

export default LoginPage;
