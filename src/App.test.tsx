import React from "react";
import { BrowserRouter } from "react-router-dom";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import "whatwg-fetch";
import server from "./mocks/server";
import App from "./App";

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe("render tests", () => {
  it("renders header", async () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );

    const header = screen.getByRole("heading");
    expect(header).toHaveTextContent("TeaCode Task");
  });
});

describe("search input tests", () => {
  it("handles user input correctly", async () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );

    const searchInput: HTMLInputElement = screen.getByRole("textbox");
    await userEvent.type(searchInput, "amabel");
    expect(searchInput.value).toBe("amabel");
  });
});
