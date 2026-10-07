import { afterEach, describe, expect, it } from 'vitest'
import { cleanup, render, screen } from '@testing-library/react'
import App from './App.jsx'

afterEach(cleanup)

describe('App', () => {
  it('renders the project heading', () => {
    render(<App />)
    expect(
      screen.getByRole('heading', { name: 'AI Capstone Project' }),
    ).toBeTruthy()
  })
})
