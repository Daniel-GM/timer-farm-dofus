import { useState, useEffect } from 'react'

const TimerView = () => {
  const INITIAL_TIME = 6003
  const [time, setTime] = useState(INITIAL_TIME)
  const [isRunning, setIsRunning] = useState(false)
  const [color, setColor] = useState('border-gray-500')
  const [values, setValues] = useState([0, 0])
  const [targetTime, setTargetTime] = useState(null)

  const handleValueChange = (index, newValue) => {
    setValues((prevValues) => {
      const newValues = [...prevValues]
      newValues[index] = newValue
      return newValues
    })
  }

  const handleCopyTravel = () => {
    const textToCopy = values.map(val => val.toString()).join(', ')
    navigator.clipboard.writeText("/travel " + textToCopy)
  }

  const handleReset = () => {
    const newTarget = Date.now() + INITIAL_TIME * 10
    setTargetTime(newTarget)
    setTime(INITIAL_TIME)
    isRunning ? setIsRunning(true) : setIsRunning(false)
  }

  useEffect(() => {
    let intervalId

    if (isRunning) {
      if (!targetTime) {
        setTargetTime(Date.now() + time * 10)
      }

      intervalId = setInterval(() => {
        const remaining = Math.ceil((targetTime - Date.now()) / 10)

        if (remaining <= 0) {
          const newTarget = Date.now() + INITIAL_TIME * 10
          setTargetTime(newTarget)
          setTime(INITIAL_TIME)
        } else {
          setTime(remaining)
        }

        if (remaining <= 800) {
          setColor('border-red-500')
        } else {
          setColor('border-green-500')
        }
      }, 30)
    } else {
      if (time != INITIAL_TIME) {
        setColor('border-yellow-500')
      } else {
        setColor('border-gray-500')
      }
    }

    return () => clearInterval(intervalId)
  }, [isRunning, targetTime])

  const timer = () => {
    const minutes = String(Math.floor(time / 6000)).padStart(2, '0')
    const seconds = String(Math.floor((time % 6000) / 100)).padStart(2, '0')
    const centiseconds = String(time % 100).padStart(2, '0')
    return `${minutes}:${seconds}:${centiseconds}`
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
            className={`w-7 h-7 bg-gray-300 hover:bg-red-400 border-2 ${color} px-1 py-1 rounded-4xl shadow cursor-pointer`}
            onClick={handleReset}
          />
          <img
            src="pos.svg"
            alt="position"
            className={`w-7 h-7 bg-gray-300 hover:bg-cyan-400 border-2 ${color} px-1 py-1 rounded-4xl shadow cursor-pointer`}
            onClick={handleCopyTravel}
          />
        </section>
      </div>
      <div
        className={`bg-gray-700 hover:bg-gray-600 p-4 rounded-lg shadow border-2 ${color} cursor-pointer`}
        onClick={() => {
          if (!isRunning) {
            setTargetTime(Date.now() + time * 10)
          }
          setIsRunning(!isRunning)
        }}
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
