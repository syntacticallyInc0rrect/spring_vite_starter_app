import {useEffect, useState} from "react";
import {User} from "./userApi";
import App from "./App";
import {FaUserAlt} from "react-icons/all";

const AppWrapper = () => {
    const getInitialCurrentUserState = (): User | 'noCurrentUser' => {
        if (!localStorage.getItem('currentUserString') || localStorage.getItem('currentUserString') === 'noCurrentUser') {
            return 'noCurrentUser';
        } else {
            return {username: localStorage.getItem('currentUserString')} as User;
        }
    };

    const setLocalStorageForCurrentUser = (currentState: User | 'noCurrentUser'): void => {
        if (typeof currentState === 'string') localStorage.setItem('currentUserString', currentState);
        else localStorage.setItem('currentUserString', currentState.username);
    };

    const [currentUser, setCurrentUser] = useState<User | 'noCurrentUser'>(getInitialCurrentUserState());

    useEffect(() => {
        setLocalStorageForCurrentUser(currentUser);
    }, [currentUser]);

    const [isOnScoreboardPage, setIsOnScoreboardPage] = useState<boolean>(false);

    const getNavigationClassName = (isScoreboardNavLink: boolean) =>
        (isOnScoreboardPage && isScoreboardNavLink) || (!isOnScoreboardPage && !isScoreboardNavLink) ?
            "bg-gray-900 text-white px-3 py-2 rounded-md text-sm font-medium" :
            "text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium";

    const getNavigationAriaCurrent = (isScoreboardNavLink: boolean) =>
        (isOnScoreboardPage && isScoreboardNavLink) || (!isOnScoreboardPage && !isScoreboardNavLink) ?
            "true" :
            "false";

    return (
        <div className="min-h-full">
            <nav className="bg-gray-800">
                <div className="mx-auto w-full px-4 px-6 lg:px-8">
                    <div className="flex h-16 items-center justify-between">
                        <div className="flex items-center">
                            <div className="flex-shrink-0">
                                <img src="/vite.svg" className="logo" alt="Vite logo"/>
                            </div>
                            <div>
                                {currentUser !== 'noCurrentUser' && (
                                    <div className="ml-10 flex items-baseline space-x-4">
                                        <button
                                            className={getNavigationClassName(false)}
                                            aria-current={getNavigationAriaCurrent(false)}
                                            onClick={() => setIsOnScoreboardPage(false)}
                                        >
                                            Play
                                        </button>
                                        <button
                                            className={getNavigationClassName(true)}
                                            aria-current={getNavigationAriaCurrent(true)}
                                            onClick={() => setIsOnScoreboardPage(true)}
                                        >
                                            Scoreboard
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                        <div>
                            {currentUser !== 'noCurrentUser' && (
                                <div className="ml-4 flex items-center md:ml-6">
                                    <FaUserAlt className="text-gray-300 mr-2"/>
                                    <p className="hidden md:block text-center text-sm text-gray-300 mr-6">{`Welcome, ${currentUser.username}`}</p>
                                    <button type="button"
                                            className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                                            onClick={() => {
                                                localStorage.clear();
                                                setCurrentUser('noCurrentUser');
                                            }}
                                    >
                                        Sign Out
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </nav>

            <header className="bg-white shadow">
                <div className="mx-auto w-full py-6 px-4 sm:px-6 lg:px-8">
                    <h1 className="text-3xl font-bold tracking-tight text-gray-900">
                        {currentUser !== 'noCurrentUser' ? isOnScoreboardPage ? 'Scoreboard' : 'Play' : 'Welcome'}
                    </h1>
                </div>
            </header>
            <main>
                <App
                    currentUser={currentUser}
                    setCurrentUser={setCurrentUser}
                    isOnScoreboardPage={isOnScoreboardPage}
                />
            </main>
        </div>
    );
};

export default AppWrapper;
