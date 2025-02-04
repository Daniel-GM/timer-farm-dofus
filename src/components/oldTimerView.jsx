import { useEffect, useState } from 'react'

const TimerView = () => {
  const INITIAL_TIME = 603
  const [time, setTime] = useState(INITIAL_TIME)
  const [isRunning, setIsRunning] = useState(false)
  const [color, setColor] = useState('border-gray-500')
  const [values, setValues] = useState([0, 0])

  const handleValueChange = (index, newValue) => {
    setValues((prevValues) => {
      const newValues = [...prevValues]
      newValues[index] = newValue
      return newValues
    })
  }

  useEffect(() => {
    let animationFrame
    if (!isRunning) return setColor('border-gray-500')

    const updateTimer = () => {
      setTime((prevTime) => {
        const newTime = prevTime > 0 ? prevTime - 1 : INITIAL_TIME
        newTime <= 800 ? setColor('border-red-500') : setColor('border-green-500')
        return newTime
      })
      animationFrame = requestAnimationFrame(updateTimer)
    }
    updateTimer()

    return () => cancelAnimationFrame(animationFrame)
  }, [isRunning])

  const timer = () => {
    const minutes = String(Math.floor(time / 6000)).padStart(2, '0')
    const seconds = String(Math.floor((time % 6000) / 100)).padStart(2, '0')
    const milliseconds = String(time % 100).padStart(2, '0')

    return `${minutes}:${seconds}:${milliseconds}`
  }

  const handleReset = () => {
    setTime(INITIAL_TIME)
    setIsRunning(true)
  }

  return (
    <div>
      <div className="text-center mb-3 relative">
        <div className="relative">
          {values.map((value, index) => (
            <span key={index}>
              <label
                onClick={() => {
                  const newValue = prompt('Digite um novo valor:', value)
                  if (newValue !== null && !isNaN(parseFloat(newValue))) {
                    handleValueChange(index, parseFloat(newValue))
                  } else {
                    alert('Valor inválido')
                  }
                }}
              >
                {value}
              </label>
              {index < values.length - 1 && <label> , </label>}
            </span>
          ))}
        </div>
        <section className="absolute top-6 left-1 flex space-x-0.5">
          <img
            src="reset.svg"
            alt="reset"
            className="w-7 h-7 bg-gray-300 hover:bg-red-400 border border-2 border-gray-500 px-1 py-1 rounded-4xl shadow cursor-pointer"
            onClick={handleReset}
          />
          <img
            src="pos.svg"
            alt="position"
            className="w-7 h-7 bg-gray-300 hover:bg-cyan-400 border border-2 border-gray-500 px-1 py-1 rounded-4xl shadow cursor-pointer"
          />
        </section>
      </div>
      <div
        className={`bg-gray-700 hover:bg-gray-600 p-4 rounded-lg shadow border-2 ${color} cursor-pointer`}
        onClick={() => setIsRunning(!isRunning)}
      >
        <div className="flex items-center justify-center">
          <div className={`text-4xl font-semibold w-[7ch] ${time === INITIAL_TIME ? 'text-center' : ''}`}>
            {time === INITIAL_TIME ? 'Iniciar' : timer()}
          </div>
        </div>
      </div>
    </div>
  )
}

export default TimerView
