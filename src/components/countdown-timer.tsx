import React, { useState, useEffect, useMemo } from 'react'

export function CountdownTimer() {
  // Use useMemo to avoid recreating the date object on every render
  const targetDate = useMemo(() => new Date('2025-03-31T00:00:00Z'), []) // Set your target date here
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = +targetDate - +new Date()

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        })
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 })
      }
    }

    calculateTimeLeft()
    const timer = setInterval(calculateTimeLeft, 1000)

    return () => clearInterval(timer)
  }, [targetDate])

  return (
    <div className="mb-8">
      <h3 className="text-xl font-semibold mb-4 text-center text-purple-700 dark:text-purple-300">
        Starts in
      </h3>
      <div className="grid grid-cols-4 gap-4 max-w-lg mx-auto">
        <div className="flex flex-col items-center">
          <div className="text-3xl font-bold bg-white dark:bg-gray-800 rounded-lg px-4 py-2 w-full text-center border dark:border-gray-700">
            {timeLeft.days}
          </div>
          <span className="text-sm mt-1 text-muted-foreground">Days</span>
        </div>
        <div className="flex flex-col items-center">
          <div className="text-3xl font-bold bg-white dark:bg-gray-800 rounded-lg px-4 py-2 w-full text-center border dark:border-gray-700">
            {timeLeft.hours}
          </div>
          <span className="text-sm mt-1 text-muted-foreground">Hours</span>
        </div>
        <div className="flex flex-col items-center">
          <div className="text-3xl font-bold bg-white dark:bg-gray-800 rounded-lg px-4 py-2 w-full text-center border dark:border-gray-700">
            {timeLeft.minutes}
          </div>
          <span className="text-sm mt-1 text-muted-foreground">Minutes</span>
        </div>
        <div className="flex flex-col items-center">
          <div className="text-3xl font-bold bg-white dark:bg-gray-800 rounded-lg px-4 py-2 w-full text-center border dark:border-gray-700">
            {timeLeft.seconds}
          </div>
          <span className="text-sm mt-1 text-muted-foreground">Seconds</span>
        </div>
      </div>
    </div>
  )
}
