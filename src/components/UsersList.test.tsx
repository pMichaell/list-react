import React from "react";
import {BrowserRouter} from "react-router-dom";
import {render, screen} from "@testing-library/react";
import {rest} from "msw";

import "@testing-library/jest-dom";
import "whatwg-fetch"

import server from "../mocks/server";
import {usersPath} from "../utils/paths";

import UsersList from "./UsersList";


beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('usersList render tests', () => {
    it('renders users when response is OK', async () => {
        render(
            <UsersList/>, {wrapper: BrowserRouter}
        );

        const users = await screen.findAllByRole('button');
        expect(users).toHaveLength(20);
    })

    it('renders error message, when response is not OK', async () => {
        server.use(rest.get(usersPath, (req, res, context) => {
            return res(context.status(403));
        }))

        render(
            <UsersList/>, {wrapper: BrowserRouter}
        );

        const alertElement = await screen.findByRole('alert');
        expect(alertElement).toBeInTheDocument();
    })
})
