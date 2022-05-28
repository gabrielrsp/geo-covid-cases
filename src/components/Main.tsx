
import { MapContent } from './MapContent';
import { Header } from './Header';
import { DateSlider } from './DateSlider';
import { useLocation } from 'react-router-dom';
import 'antd/dist/antd.css'
import { useCovidCases } from '../hooks/useCovidCases';
import { useEffect } from 'react';
export function Main () {

  const { setSelectedOptionView, getCovidCasesOfDate, getCovidCasesUntilDate, availableDates } = useCovidCases()
  const { search } = useLocation();
  const splitedUrl = search.split('/')
  const indexDateView = splitedUrl.indexOf('?dateview')
  const indexOptionView = splitedUrl.indexOf('optionview')


  const dates: any = []
  availableDates.forEach((date: any) => dates.push(new Date(date).getTime()))

  const sortedDates = dates
    .map((item: any) => new Date(item))
    .sort((dateA: any, dateB: any) => dateA - dateB)
    .map((date: any) => new Date(date).toISOString().split('T')[0])


  function getGroupDate (selectedDate: any) {
    if (sortedDates) {
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
  }


  useEffect(() => {
    if (availableDates) {
      if (splitedUrl[indexDateView + 1] && splitedUrl[indexOptionView + 1]) {

        if (splitedUrl[indexOptionView + 1] === 'casesUntilDate') {
          setSelectedOptionView('casesUntilDate')
          getGroupDate(splitedUrl[indexDateView + 1])
        }

        if (splitedUrl[indexOptionView + 1] === 'casesOfDate') getCovidCasesOfDate(splitedUrl[indexDateView + 1])
      }
    }

  }, [availableDates])


  return (
    <>
      <Header />
      <DateSlider />
      <MapContent />
    </>
  )
}

