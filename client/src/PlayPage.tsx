import {ReactElement, useEffect, useState} from "react";
import {IconType} from "react-icons";
import {
    GiBabyFace,
    GiBearFace,
    GiCyborgFace,
    GiDoctorFace,
    GiDoubleFaceMask, GiSaberToothedCatHead, GiWitchFace,
    GiWizardFace, GiWomanElfFace,
    GoOctoface
} from "react-icons/all";
import {saveUserFinishTime, saveUserStartTime} from "./userApi";
import {PageProps} from "./BodyElement";

export const PlayPage = ({currentUser}: PageProps) => {
    type GameCardStatus = 'hidden' | 'revealed' | 'matched';
    type GameCardIcon = { id: number, icon: ReactElement<IconType> };
    type GameCard = { id: number, gameCardIcon: GameCardIcon, status: GameCardStatus };

    const [gameStatus, setGameStatus] =
        useState<'isInProgress' | 'isComplete' | 'isInErrorState'>('isInProgress');

    const gameCardIcons: GameCardIcon[] = [
        {
            id: 0,
            icon: <GiBabyFace data-testid='gi-baby-face' size='big'/>
        },
        {
            id: 1,
            icon: <GiDoubleFaceMask data-testid='gi-double-face-mask' size='big'/>
        },
        {
            id: 2,
            icon: <GoOctoface data-testid='go-octo-face' size='big'/>
        },
        {
            id: 3,
            icon: <GiWizardFace data-testid='gi-wizard-face' size='big'/>
        },
        {
            id: 4,
            icon: <GiDoctorFace data-testid='gi-doctor-face' size='big'/>
        },
        {
            id: 5,
            icon: <GiBearFace data-testid='gi-bear-face' size='big'/>
        },
        {
            id: 6,
            icon: <GiCyborgFace data-testid='gi-cyborg-face' size='big'/>
        },
        {
            id: 7,
            icon: <GiWomanElfFace data-testid='gi-woman-elf-face' size='big'/>
        },
        {
            id: 8,
            icon: <GiWitchFace data-testid='gi-witch-face' size='big'/>
        },
        {
            id: 9,
            icon: <GiSaberToothedCatHead data-testid='gi-saber-toothed-cat-head' size='big'/>
        },
    ];

    const resetGameCards = (): GameCard[] =>
        [...gameCardIcons, ...gameCardIcons]
            .sort(() => Math.random() - 0.5)
            .map((gci, index) => {
                return {
                    id: index,
                    gameCardIcon: gci,
                    status: 'hidden',
                }
            });

    const [gameCards, setGameCards] = useState<GameCard[]>(resetGameCards());

    useEffect(() => {
        setGameStatus('isInProgress');
    }, [currentUser]);

    useEffect(() => {
        if (gameStatus === 'isComplete') {
            saveUserFinishTime(currentUser, new Date())
                .then()
                .catch(() => setGameStatus('isInErrorState'));
        } else if (gameStatus === 'isInProgress') {
            saveUserStartTime(currentUser, new Date())
                .then()
                .catch(() => setGameStatus('isInErrorState'));
            setGameCards(resetGameCards());
            setMatchedIds([]);
        } else {
            setGameCards(resetGameCards());
            setMatchedIds([]);
        }
    }, [gameStatus]);

    type GameCardItemProps = {
        gameCardItem: GameCard;
        onClickFn: (firstClickItem?: ReactElement | undefined) => void;
    };

    const GameCardItem = ({gameCardItem, onClickFn}: GameCardItemProps): ReactElement => {
        const HiddenGameCard = () => (
            <button
                className='md:h-64 md:w-32 h-32 w-16 rounded-md border border-gray-300 bg-indigo-600'
                onClick={() => onClickFn()}>
                <h1 className="text-white text-3xl">?</h1>
            </button>
        );

        const RevealedGameCard = () => (
            <div
                className={gameCardItem.status === 'matched' ? 'md:h-64 md:w-32 h-32 w-16 rounded-md border border-blue-300 bg-gray-800' : 'md:h-64 md:w-32 h-32 w-16 rounded-md border border-gray-300'}
            >
                <h1 className="md:h-64 md:w-32 h-32 w-16 flex items-center justify-center">{gameCardItem.gameCardIcon.icon}</h1>
            </div>
        );

        return gameCardItem.status === 'hidden' ? <HiddenGameCard/> : <RevealedGameCard/>;
    };

    type Guess = {
        cardId: number;
        iconId: number;
    };

    const [firstGuess, setFirstGuess] = useState<Guess | undefined>();
    const [secondGuess, setSecondGuess] = useState<Guess | undefined>();
    const [matchedIds, setMatchedIds] = useState<number[]>([]);

    useEffect(() => {
        if (!firstGuess || !secondGuess) return;
        else if (firstGuess.iconId === secondGuess.iconId) {
            if (matchedIds.length > (gameCardIcons.length - 2)) {
                setGameStatus('isComplete');
            } else {
                setMatchedIds([...matchedIds, secondGuess.iconId]);
                setGameCards(
                    [...gameCards]
                        .map(
                            gc => (gc.id === firstGuess.cardId || gc.id === secondGuess.cardId) ?
                                {...gc, status: 'matched'} :
                                gc
                        )
                );
            }
            setFirstGuess(undefined);
            setSecondGuess(undefined);
        } else {
            setTimeout(function () {
                setGameCards(
                    [...gameCards]
                        .map(
                            gc => (gc.id === firstGuess.cardId || gc.id === secondGuess.cardId) ?
                                {...gc, status: 'hidden'} :
                                gc
                        )
                );
                setFirstGuess(undefined);
                setSecondGuess(undefined);
            }.bind(this), 2000);
        }
    }, [secondGuess]);

    useEffect(() => {
        if (matchedIds.length < 1) return;
        setGameCards(gameCards.map(gc => {
            return !matchedIds.find((mId) => mId === gc.gameCardIcon.id) ?
                gc :
                {...gc, status: 'matched'}
        }));
    }, [matchedIds]);

    const gameCardOnClickFn = (gc: GameCard) => {
        if (!firstGuess) {
            setFirstGuess({cardId: gc.id, iconId: gc.gameCardIcon.id});
            setGameCards(
                [...gameCards]
                    .map(card => {
                        return card.id === gc.id ? {...card, status: 'revealed'} : card;
                    })
            );
        } else if (!secondGuess) {
            setSecondGuess({cardId: gc.id, iconId: gc.gameCardIcon.id});
            setGameCards(
                [...gameCards]
                    .map(card => {
                        return card.id === gc.id ? {...card, status: 'revealed'} : card;
                    })
            );
        } else {
            return;
        }
    };

    if (gameStatus === 'isInErrorState') return <></>;
    if (gameStatus === 'isComplete') return <>
        <button onClick={() => setGameStatus('isInProgress')}>Play Again?</button>
    </>;

    else
        return (
            <div className="flex justify-center items-center">
                <div className="mt-8 mx-auto px-8 grid grid-cols-5 gap-4">
                    {gameCards.map(gc => <GameCardItem key={gc.id} gameCardItem={gc}
                                                       onClickFn={() => gameCardOnClickFn(gc)}/>)}
                </div>
            </div>
        );
};
