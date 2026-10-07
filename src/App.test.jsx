import { afterEach, describe, expect, it } from 'vitest'
import { cleanup, fireEvent, render, screen } from '@testing-library/react'
import App from './App.jsx'

afterEach(cleanup)

describe('App', () => {
  it('renders the project heading', () => {
    render(<App />)
    expect(
      screen.getByRole('heading', { name: 'AI Capstone Project' }),
    ).toBeTruthy()
  })

  it('shows the submitted prompt', () => {
    render(<App />)

    fireEvent.change(screen.getByLabelText('Prompt'), {
      target: { value: 'Explain React hooks' },
    })
    fireEvent.click(screen.getByRole('button', { name: 'Submit' }))

    expect(screen.getByRole('heading', { name: 'Submitted prompt' })).toBeTruthy()
    expect(screen.getByText('Explain React hooks')).toBeTruthy()
  })
})
