import {ReactElement, useEffect, useState} from "react";
import {getUserScoreboard, saveUserFinishTime, saveUserStartTime, User, UserScoreboard} from "./userApi";
import {
    GiBabyFace,
    GiBearFace,
    GiCyborgFace,
    GiDoctorFace,
    GiDoubleFaceMask,
    GiSaberToothedCatHead,
    GiWitchFace,
    GiWizardFace,
    GiWomanElfFace,
    GoOctoface
} from "react-icons/all";
import {IconType} from "react-icons";
import {ScoreboardPage} from "./ScoreboardPage";
import {PlayPage} from "./PlayPage";

type BodyElementProps = {
    currentUser: User;
    isOnScoreboardPage: boolean;
}

export type PageProps = {
    currentUser: User;
}

const BodyElement = ({currentUser, isOnScoreboardPage}: BodyElementProps) =>
    isOnScoreboardPage ? <ScoreboardPage currentUser={currentUser}/> : <PlayPage currentUser={currentUser}/>;

export default BodyElement;
