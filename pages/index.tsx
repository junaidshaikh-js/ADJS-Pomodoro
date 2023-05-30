import { useRef, useState } from 'react'
import Image from 'next/image'

import GearIcon from '../public/gear.svg'
import Check from '../public/check.svg'

const MINUTES_START = '15'
const SECONDS_START = '00'

export default function Home() {
  const [minutes, setMinutes] = useState(MINUTES_START)
  const [seconds, setSeconds] = useState(SECONDS_START)
  const [disabled, setDisabled] = useState(true)
  const [start, setStart] = useState(false)
  const [completed, setCompleted] = useState(false)
  const timerIdRef = useRef<NodeJS.Timer>()

  const handleMinuteChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    if (!/([0-9]|^$)/.test(value) || +value > 59) return
    setMinutes(value)
  }

  const handleSecondChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    if (!/([0-9]|^$)/.test(value) || +value > 59) return
    setSeconds(value)
  }

  const handleStart = (e: React.MouseEvent<HTMLSpanElement>) => {
    setStart(!start)
    setDisabled(true)

    const formatValue = (value: number): string => {
      if (value < 10) {
        return `0${value}`
      }
      return String(value)
    }
    let sec = +seconds
    let min = +minutes
    const id = setInterval(() => {
      sec -= 1

      if (sec === -1) {
        sec = 59
        min -= 1

        if (min === -1) {
          clearInterval(timerIdRef.current)
          setCompleted(true)
          setMinutes(MINUTES_START)
          setSeconds(SECONDS_START)
          setDisabled(false)
          return
        }
      }

      setSeconds(formatValue(sec))
      setMinutes(formatValue(min))
    }, 1000)
    timerIdRef.current = id
  }

  const renderStartStop = () => {
    if (completed) return null

    return (
      <div
        className="font-montserrat text-white absolute bottom-[25%]"
        role="button"
      >
        {!start ? (
          <span onClick={handleStart}>START</span>
        ) : (
          <span
            onClick={() => {
              clearInterval(timerIdRef.current)
              setStart(!start)
            }}
          >
            STOP
          </span>
        )}
      </div>
    )
  }

  const renderIcon = () => {
    if (start) return null
    
    return (
      <div className="absolute bottom-[10%] text-[#585858]">
        {!completed ? (
          <Image
            src={GearIcon}
            alt="Settings"
            onClick={() => {
              if (start) return
              setDisabled(!disabled)
            }}
            className="cursor-pointer brightness-50"
          />
        ) : (
          <Image
            src={Check}
            alt="Mark as done check icon"
            onClick={() => {
              setCompleted(!completed)
              setDisabled(true)
              setStart(false)
            }}
          />
        )}
      </div>
    )
  }

  return (
    <main className="h-screen">
      <div className="h-full flex items-center justify-center">
        <div className="h-[500px] w-[500px] rounded-full bg-gradient-radial from-ship-gray to-woodsmoke] flex justify-center items-center flex-col relative shadow-outer-glow">
          <div className="absolute z-[-1]">
            <svg height="518" width="518" viewBox="0 0 518 518">
              <circle
                cx="259"
                cy="259"
                r="254"
                stroke-width="9"
                stroke={completed ? 'green' : 'red'}
                fill="transparent"
              />
            </svg>
          </div>
          <div className="text-white text-9xl font-bebas">
            <input
              type="text"
              value={minutes}
              onChange={handleMinuteChange}
              className="bg-transparent	outline-none w-32  text-right border-dotted border-white	border-b-2 disabled:border-0"
              disabled={disabled}
            />
            <span className="mx-3">:</span>
            <input
              type="text"
              value={seconds}
              className="bg-transparent outline-none w-32 text-left border-dotted border-white	border-b-2 disabled:border-0"
              onChange={handleSecondChange}
              disabled={disabled}
            />
          </div>
          {renderStartStop()}
          {renderIcon()}
        </div>
      </div>
    </main>
  )
}
