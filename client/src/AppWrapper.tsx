import {useEffect, useState} from "react";
import {User} from "./userApi";
import App from "./App";
import {FaUserAlt} from "react-icons/all";

const AppWrapper = () => {
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
                <div className="mx-auto w-full px-4 sm:px-6 lg:px-8">
                    <div className="flex h-16 items-center justify-between">
                        <div className="flex items-center">
                            <div className="flex-shrink-0">
                                <img src="/vite.svg" className="logo" alt="Vite logo"/>
                            </div>
                            <div className="hidden md:block">
                                {currentUser !== 'noCurrentUser' && currentUser !== 'isInLoadingState' && (
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
                        <div className="hidden md:block">
                            {currentUser !== 'isInLoadingState' && currentUser !== 'noCurrentUser' && (
                                <div className="ml-4 flex items-center md:ml-6">
                                    <FaUserAlt className="text-gray-300 mr-2"/>
                                    <p className="text-center text-sm text-gray-300 mr-6">{`Welcome, ${currentUser.username}`}</p>
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
                        <div className="-mr-2 flex md:hidden">
                            <button type="button"
                                    className="inline-flex items-center justify-center rounded-md bg-gray-800 p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                                    aria-controls="mobile-menu" aria-expanded="false">
                                <span className="sr-only">Open main menu</span>
                            </button>
                        </div>
                    </div>
                </div>
            </nav>

            <header className="bg-white shadow">
                <div className="mx-auto w-full py-6 px-4 sm:px-6 lg:px-8">
                    <h1 className="text-3xl font-bold tracking-tight text-gray-900">
                        {currentUser !== 'noCurrentUser' && currentUser !== 'isInLoadingState' ? isOnScoreboardPage ? 'Scoreboard' : 'Play' : 'Welcome'}
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
