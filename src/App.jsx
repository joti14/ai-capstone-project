import { useState } from 'react'
import PromptForm from './components/PromptForm.jsx'

function App() {
  const [submittedPrompt, setSubmittedPrompt] = useState('')

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-12 text-slate-900">
      <div className="mx-auto max-w-2xl">
        <h1 className="text-3xl font-bold">AI Capstone Project</h1>
        <p className="mt-2 text-slate-600">
          Frontend AI Engineering track capstone.
        </p>

        <section className="mt-8">
          <PromptForm onSubmit={setSubmittedPrompt} />
        </section>

        {submittedPrompt && (
          <section className="mt-8 rounded-md border border-slate-200 bg-white p-4">
            <h2 className="text-sm font-medium text-slate-600">Submitted prompt</h2>
            <p className="mt-1 whitespace-pre-wrap break-words">{submittedPrompt}</p>
          </section>
        )}
      </div>
    </main>
  )
}

export default App
