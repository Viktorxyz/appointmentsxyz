import { useEffect, useRef, useState } from 'react';
import LoopScroll from '../LoopScroll'
import './style.css'

function TimePicker({ onChange, defaultValue }) {
  defaultValue = defaultValue?.split(":") || ["08", "00"]

  const hour = useRef(parseInt(defaultValue[0]))
  const minute = useRef(parseInt(defaultValue[1]))
  const hours = useRef((() => {
    const hours = [];
    for (let i = 0; i < 10; i++) hours.push(`0${i}`)
    for (let i = 10; i < 24; i++) hours.push(`${i}`)
    return hours
  })())
  const minutes = useRef((() => {
    const minutes = []
    for (let i = 0; i < 10; i++) minutes.push(`0${i}`)
    for (let i = 10; i < 60; i++) minutes.push(`${i}`)
    return minutes
  })())
  const hourElements = useRef((() => {
    const hourElements = [];
    for (let i = 0; i < 10; i++) hourElements.push(<div className='list-item-time-picker' key={i}>0{i}</div>)
    for (let i = 10; i < 24; i++) hourElements.push(<div className='list-item-time-picker' key={i}>{i}</div>)
    return hourElements
  })())
  const minuteElements = useRef((() => {
    const minuteElements = []
    for (let i = 0; i < 10; i++) minuteElements.push(<div className='list-item-time-picker' key={i}>0{i}</div>)
    for (let i = 10; i < 60; i++) minuteElements.push(<div className='list-item-time-picker' key={i}>{i}</div>)
    return minuteElements
  })())

  const setTime = () => {
    onChange(`${hours.current[hour.current]}:${minutes.current[minute.current]}`)
  }

  const setHour = (i) => {
    hour.current = i;
    setTime()
  }

  const setMinute = (i) => {
    minute.current = i;
    setTime()
  }

  return (
    <div className='time-picker'>
      <div className='time-picker-hours'>
        <LoopScroll onChange={setHour} defaultIndex={hour.current}>
          {hourElements.current}
        </LoopScroll>
      </div>
      <span className='clock-divider'>:</span>
      <div className='time-picker-minutes'>
        <LoopScroll onChange={setMinute} defaultIndex={minute.current}>
          {minuteElements.current}
        </LoopScroll>
      </div>
    </div>
  )
}

export default TimePicker