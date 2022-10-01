import App from '../App';
import {render, screen} from "@testing-library/react";
import userEvent from "@testing-library/user-event";

describe('App', () => {
    it('renders', () => {
        render(<App/>);
        expect(screen.getByText('Vite + React')).toBeInTheDocument();
    });

    it('increments by one each time it is clicked', async () => {
        render(<App/>);
        expect(screen.getByRole('button', {name: /count is/i})).toHaveTextContent('count is 0');
        await userEvent.click(screen.getByRole('button', {name: /count is/i}));
        expect(screen.getByRole('button', {name: /count is/i})).toHaveTextContent('count is 1');
        await userEvent.click(screen.getByRole('button', {name: /count is/i}));
        expect(screen.getByRole('button', {name: /count is/i})).toHaveTextContent('count is 2');
    });
});
