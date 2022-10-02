import {PlayPage} from '../BodyElement';
import {render, screen, waitFor} from "@testing-library/react";
import {describe, expect, it, vi} from "vitest";
import * as UserApi from "../userApi";
import {User} from "../userApi";

describe('PlayPage', () => {
    const testUser: User = {username: 'RonBurgundy'};

    it('presents a user with ten pairs of cards to match', async () => {
        // vi.spyOn(GameApi, 'saveUserGameResults').mockImplementation((_user, _results) => Promise.resolve());

        render(<PlayPage currentUser={testUser}/>);

        expect(screen.getAllByTestId('gi-baby-face')).toHaveLength(2);
        expect(screen.getAllByTestId('gi-double-face-mask')).toHaveLength(2);
        expect(screen.getAllByTestId('go-octo-face')).toHaveLength(2);
        expect(screen.getAllByTestId('gi-wizard-face')).toHaveLength(2);
        expect(screen.getAllByTestId('gi-doctor-face')).toHaveLength(2);
        expect(screen.getAllByTestId('gi-bear-face')).toHaveLength(2);
        expect(screen.getAllByTestId('gi-cyborg-face')).toHaveLength(2);
        expect(screen.getAllByTestId('gi-woman-elf-face')).toHaveLength(2);
        expect(screen.getAllByTestId('gi-witch-face')).toHaveLength(2);
        expect(screen.getAllByTestId('gi-saber-toothed-cat-head')).toHaveLength(2);

    });

    // it('displays error state when server returns an error instead of a user scoreboard', async () => {
    //     // vi.spyOn(GameApi, 'saveUserGameResults').mockImplementation((_user, _results) => Promise.reject());
    //
    //     render(<PlayPage currentUser={testUser}/>);
    //
    //     expect(screen.getByTestId('play-error-page')).toBeInTheDocument();
    // });
});
