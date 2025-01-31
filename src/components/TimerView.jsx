import { useEffect, useState } from 'react'

const TimerView = () => {
  const INITIAL_TIME = 6003
  const [time, setTime] = useState(INITIAL_TIME)
  const [isRunning, setIsRunning] = useState(false)
  const [color, setColor] = useState('border-gray-500')  


  useEffect(() => {
    if (!isRunning) return setColor('border-gray-500')
    const interval = setInterval(() => {
      setTime((prevTime) => {
        (prevTime <= 1000) ? setColor('border-red-500') : setColor('border-green-500')
        
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
    <div 
      className={`bg-gray-700 p-4 rounded-lg shadow border-2 ${color} cursor-pointer`}
      onClick={() => switchTimer()}  
    >
      <div className="flex items-center justify-center">
        <div 
          className="text-4xl font-semibold w-[7ch]" >
          {timer()}
        </div>
      </div>
    </div>
  )
}

export default TimerView