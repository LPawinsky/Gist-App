import { render, screen } from '@testing-library/react';
import { isDOMComponent } from 'react-dom/test-utils';
import App from '../App';

describe('App tests', () => {
  test("Is App component in the DOM", () => {
    expect(App).isDOMComponent()
  })
})
