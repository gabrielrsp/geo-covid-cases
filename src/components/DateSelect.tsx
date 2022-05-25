import { useEffect, useState } from "react";
import { useCovidCases } from "../hooks/useCovidCases";
import Select from 'react-select'

export function DateSelect () {
  const { availableDates, getCovidCasesOfDate, getCovidCasesUntilDate } = useCovidCases()

  function getSelectedDate (item: any) {
    getCovidCasesOfDate(item.value)
    getGroupDate(item.value)
  }

  const dates: any = []

  availableDates.forEach((date: any) => dates.push(new Date(date).getTime()))

  const sortedDates = dates
    .map((item: any) => new Date(item))
    .sort((dateA: any, dateB: any) => dateA - dateB)
    .map((date: any) => new Date(date).toISOString().split('T')[0])


  function getGroupDate (selectedDate: any) {
    const combinedDates: any = []
    for (let i in sortedDates) {
      if (sortedDates[i] === selectedDate) {
        combinedDates.push(sortedDates[i])
        break
      }
      combinedDates.push(sortedDates[i])
    }

    getCovidCasesUntilDate(combinedDates)
  }

  const options: any = []
  sortedDates.forEach((date: string) => {
    options.push({ value: date, label: date })
  })

  return (
    <Select onChange={(item) => getSelectedDate(item)} placeholder={"Select date"} options={options} />
  )
}

