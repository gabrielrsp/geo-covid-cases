import { useEffect, useState } from "react";
import { useCovidCases } from "../hooks/useCovidCases";
import Select from 'react-select'

export function DateSelect () {
  const { availableDates, getCovidCasesByDate } = useCovidCases()
  const [content, setContent] = useState<any>({})

  function setSelectedDate (item: any) {
    getCovidCasesByDate(item.value)
  }

  const dates: any = []

  availableDates.forEach((date: any) => dates.push(new Date(date).getTime()))

  const sortedDates = dates
    .map((item: any) => new Date(item))
    .sort((dateA: any, dateB: any) => dateA - dateB)
    .map((date: any) => new Date(date).toISOString().split('T')[0])

  const options: any = []
  sortedDates.forEach((date: string) => {
    options.push({ value: date, label: date })
  })

  return (
    <Select onChange={(item) => setSelectedDate(item)} placeholder={"Select date"} options={options} />
  )
}

