import { act, render, screen } from '@testing-library/react';
import { isDOMComponent } from 'react-dom/test-utils';
import { unmountComponentAtNode } from 'react-dom';
import App from '../App';
import { isTokenWritten } from '../App';

let container = null;

beforeEach(() => {
  container = document.createElement("div");
  document.body.appendChild(container);
})

afterEach(() => {
  unmountComponentAtNode(container);
  container.remove();
  container = null;
})

it("renders token write or not", () => {
  act(() => {
    render(<App />, container);
  });
  expect(container.textContent).toBe('');
})

// describe('App tests', () => {
//   test("Is App component in the DOM", () => {
//     expect(App).isDOMComponent
//   })
//   test("Check if token is written", () => {
//     const isTokenWritten = App;
//   })
// })
