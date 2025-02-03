import { useEffect, useState } from 'react'

const TimerView = () => {
  const INITIAL_TIME = 6003
  const [time, setTime] = useState(INITIAL_TIME)
  const [isRunning, setIsRunning] = useState(false)
  const [color, setColor] = useState('border-gray-500')
  const [values, setValues] = useState([0, 0])

  const handleValueChange = (index, newValue) => {
    setValues(prevValues => {
      const newValues = [...prevValues]
      newValues[index] = newValue
      return newValues
    })
  }

  useEffect(() => {
    if (!isRunning) return setColor('border-gray-500')
    const interval = setInterval(() => {
      setTime((prevTime) => {
        (prevTime <= 800) ? setColor('border-red-500') : setColor('border-green-500')

        if (prevTime <= 0) {
          setTime(INITIAL_TIME)
        }
        return prevTime - 1
      })
    }, 10)
    return () => clearInterval(interval)
  }, [isRunning])

  function switchTimer() {
    setIsRunning(!isRunning)
  }

  function timer() {
    const minutes = String(Math.floor(time / 6000).toFixed(0).padStart(2, '0'))
    const seconds = String(Math.floor((time % 6000) / 100).toFixed(0).padStart(2, '0'))
    const milliseconds = String(time % 100).padStart(2, '0')

    return `${minutes}:${seconds}:${milliseconds}`
  }

  return (
    <div>
      <div className="text-center mb-3 relative">
        <div className='relative'>
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
        <section
          className="absolute top-6 left-1 flex space-x-0.5"
        >
          <img
            src='reset.svg'
            alt='reset'
            className='w-7 h-7 bg-gray-300 hover:bg-red-400  border border-2 border-gray-500 px-1 py-1 rounded-4xl shadow cursor-pointer'
            onClick={() => setTime(INITIAL_TIME)}
          />
          <img
            src='pos.svg'
            alt='position'
            className='w-7 h-7 bg-gray-300 hover:bg-cyan-400 border border-2 border-gray-500 px-1 py-1 rounded-4xl shadow cursor-pointer'
          />
        </section>
      </div>
      <div
        className={`bg-gray-700 hover:bg-gray-600 p-4 rounded-lg shadow border-2 ${color} cursor-pointer`}
        onClick={() => switchTimer()}
      >
        <div className="flex items-center justify-center">
          <div
            className={`text-4xl font-semibold w-[7ch] ${time == INITIAL_TIME ? "text-center" : null}`}>
            {time == INITIAL_TIME ? "Iniciar" : timer()}
          </div>
        </div>
      </div>
    </div>
  )
}

export default TimerView