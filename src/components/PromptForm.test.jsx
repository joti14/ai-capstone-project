import { afterEach, describe, expect, it, vi } from 'vitest'
import { cleanup, fireEvent, render, screen } from '@testing-library/react'
import PromptForm from './PromptForm.jsx'

afterEach(cleanup)

function renderForm(props = {}) {
  const onSubmit = vi.fn()
  render(<PromptForm onSubmit={onSubmit} {...props} />)
  return {
    onSubmit,
    textbox: screen.getByLabelText('Prompt'),
    submitButton: screen.getByRole('button', { name: 'Submit' }),
  }
}

describe('PromptForm', () => {
  it('renders a labelled prompt field and a submit button', () => {
    const { textbox, submitButton } = renderForm()
    expect(textbox.tagName).toBe('TEXTAREA')
    expect(submitButton.getAttribute('type')).toBe('submit')
  })

  it('submits the trimmed prompt and clears the field', () => {
    const { onSubmit, textbox, submitButton } = renderForm()

    fireEvent.change(textbox, { target: { value: '  Summarize this article  ' } })
    fireEvent.click(submitButton)

    expect(onSubmit).toHaveBeenCalledTimes(1)
    expect(onSubmit).toHaveBeenCalledWith('Summarize this article')
    expect(textbox.value).toBe('')
  })

  it('shows an error and does not submit when the prompt is empty', () => {
    const { onSubmit, submitButton } = renderForm()

    fireEvent.click(submitButton)

    expect(screen.getByRole('alert').textContent).toBe('Please enter a prompt.')
    expect(onSubmit).not.toHaveBeenCalled()
  })

  it('treats a whitespace-only prompt as empty', () => {
    const { onSubmit, textbox, submitButton } = renderForm()

    fireEvent.change(textbox, { target: { value: '   \n  ' } })
    fireEvent.click(submitButton)

    expect(screen.getByRole('alert').textContent).toBe('Please enter a prompt.')
    expect(onSubmit).not.toHaveBeenCalled()
  })

  it('shows an error and does not submit when the prompt is too long', () => {
    const { onSubmit, textbox, submitButton } = renderForm({ maxLength: 10 })

    fireEvent.change(textbox, { target: { value: 'a'.repeat(11) } })
    fireEvent.click(submitButton)

    expect(screen.getByRole('alert').textContent).toBe(
      'Prompt must be 10 characters or fewer.',
    )
    expect(onSubmit).not.toHaveBeenCalled()
  })

  it('accepts a prompt exactly at the character limit', () => {
    const { onSubmit, textbox, submitButton } = renderForm({ maxLength: 10 })

    fireEvent.change(textbox, { target: { value: 'a'.repeat(10) } })
    fireEvent.click(submitButton)

    expect(onSubmit).toHaveBeenCalledWith('a'.repeat(10))
    expect(screen.queryByRole('alert')).toBeNull()
  })

  it('updates the character counter as the user types', () => {
    const { textbox } = renderForm({ maxLength: 100 })

    expect(screen.getByText('0 / 100 characters')).toBeTruthy()
    fireEvent.change(textbox, { target: { value: 'Hello' } })
    expect(screen.getByText('5 / 100 characters')).toBeTruthy()
  })

  it('marks the field invalid and links the error message while an error is shown', () => {
    const { textbox, submitButton } = renderForm()

    expect(textbox.getAttribute('aria-invalid')).toBe('false')

    fireEvent.click(submitButton)

    const errorMessage = screen.getByRole('alert')
    expect(textbox.getAttribute('aria-invalid')).toBe('true')
    expect(textbox.getAttribute('aria-describedby')).toContain(errorMessage.id)
  })

  it('clears the error when the user edits the prompt', () => {
    const { textbox, submitButton } = renderForm()

    fireEvent.click(submitButton)
    expect(screen.getByRole('alert')).toBeTruthy()

    fireEvent.change(textbox, { target: { value: 'H' } })

    expect(screen.queryByRole('alert')).toBeNull()
    expect(textbox.getAttribute('aria-invalid')).toBe('false')
  })
})
