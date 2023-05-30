import { useRef, useState } from 'react'
import Image from 'next/image'

import GearIcon from '../public/gear.svg'

const MINUTES_START = '01'
const SECONDS_START = '05'

export default function Home() {
  const [minutes, setMinutes] = useState(MINUTES_START)
  const [seconds, setSeconds] = useState(SECONDS_START)
  const [disabled, setDisabled] = useState(true)
  const [start, setStart] = useState(false)
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
          return
        }
      }

      setSeconds(formatValue(sec))
      setMinutes(formatValue(min))
    }, 1000)
    timerIdRef.current = id
  }

  return (
    <main className="h-screen">
      <div className="h-full flex items-center justify-center">
        <div className="h-[500px] w-[500px] rounded-full bg-gradient-radial from-ship-gray to-woodsmoke] flex justify-center items-center flex-col relative">
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

          <div className="absolute bottom-[10%] text-[#585858]">
            <Image
              src={GearIcon}
              alt="Settings"
              onClick={() => {
                if (start) return
                setDisabled(!disabled)
              }}
              className="cursor-pointer"
            />
          </div>
        </div>
      </div>
    </main>
  )
}
