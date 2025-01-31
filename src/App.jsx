import { useState } from 'react'
import TimerView from './components/TimerView'

function App() {

  return (
    <>
      <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white">
        <div className="bg-gray-800 p-8 rounded-xl shadow-xl border border-gray-700">
          <h1 className="text-2xl font-semibold text-center mb-6">Timers</h1>
          <div className="grid grid-cols-2 gap-4">
            <TimerView />
            <TimerView />
            <TimerView />
            <TimerView />
            <TimerView />
            <TimerView />
            <TimerView />
            <TimerView />
            <TimerView />
            <TimerView />
          </div>
        </div>
      </div>
    </>
  )
}

export default App