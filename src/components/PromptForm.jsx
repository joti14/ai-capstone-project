import { useId, useState } from 'react'

const DEFAULT_MAX_LENGTH = 500

function PromptForm({ onSubmit, maxLength = DEFAULT_MAX_LENGTH }) {
  const [prompt, setPrompt] = useState('')
  const [error, setError] = useState('')

  const promptId = useId()
  const errorId = useId()
  const counterId = useId()

  const isOverLimit = prompt.length > maxLength

  function validate(value) {
    if (value.trim() === '') {
      return 'Please enter a prompt.'
    }
    if (value.length > maxLength) {
      return `Prompt must be ${maxLength} characters or fewer.`
    }
    return ''
  }

  function handleChange(event) {
    setPrompt(event.target.value)
    if (error) {
      setError('')
    }
  }

  function handleSubmit(event) {
    event.preventDefault()

    const validationError = validate(prompt)
    if (validationError) {
      setError(validationError)
      return
    }

    onSubmit(prompt.trim())
    setPrompt('')
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-3">
      <label htmlFor={promptId} className="block text-sm font-medium text-slate-800">
        Prompt
      </label>

      <textarea
        id={promptId}
        value={prompt}
        onChange={handleChange}
        rows={4}
        placeholder="Ask something..."
        aria-invalid={error ? 'true' : 'false'}
        aria-describedby={error ? `${counterId} ${errorId}` : counterId}
        className={`block w-full resize-y rounded-md border bg-white px-3 py-2 text-slate-900 shadow-sm focus:outline-none focus:ring-2 ${
          error
            ? 'border-red-600 focus:ring-red-600'
            : 'border-slate-300 focus:ring-blue-600'
        }`}
      />

      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <p
          id={counterId}
          className={`text-sm ${isOverLimit ? 'font-medium text-red-700' : 'text-slate-600'}`}
        >
          {prompt.length} / {maxLength} characters
        </p>

        <button
          type="submit"
          className="rounded-md bg-blue-700 px-4 py-2 font-medium text-white hover:bg-blue-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2"
        >
          Submit
        </button>
      </div>

      {error && (
        <p id={errorId} role="alert" className="text-sm font-medium text-red-700">
          {error}
        </p>
      )}
    </form>
  )
}

export default PromptForm
