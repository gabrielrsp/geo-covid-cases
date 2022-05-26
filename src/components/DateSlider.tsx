import { useCovidCases } from "../hooks/useCovidCases"
import { Slider } from 'antd';
import type { SliderMarks } from 'antd/lib/slider';
import styled from "@emotion/styled";

export const DateSlider = () => {
  const { ContainerSlider } = DateSlider
  const { availableDates, getCovidCasesOfDate, getCovidCasesUntilDate } = useCovidCases()

  const dates: any = []
  availableDates.forEach((date: any) => dates.push(new Date(date).getTime()))

  function sortAndConvertDates (dates: any) {
    return dates
      .map((item: any) => new Date(item))
      .sort((dateA: any, dateB: any) => dateA - dateB)
      .map((date: any) => new Date(date).toISOString().split('T')[0])
  }

  const datesUntilJul2020 = availableDates.filter((date: any) => new Date(date).getTime() < new Date('2020-07-01T00:00:00.000Z').getTime())
  const datesUntilJan2021 = availableDates.filter((date: any) => new Date(date).getTime() < new Date('2021-01-01T00:00:00.000Z').getTime())
  const datesUntilJul2021 = availableDates.filter((date: any) => new Date(date).getTime() < new Date('2021-07-01T00:00:00.000Z').getTime())
  const datesUntilJan2022 = availableDates.filter((date: any) => new Date(date).getTime() < new Date('2022-01-01T00:00:00.000Z').getTime())

  function changeMarkDate (value: any) {

    switch (value) {
      case 0:
        getCovidCasesOfDate('2020-01-01')
        getCovidCasesUntilDate([])
        break;
      case 25:
        const groupedDateJul2020 = sortAndConvertDates(datesUntilJul2020)
        getCovidCasesOfDate(groupedDateJul2020[groupedDateJul2020.length - 1])
        getCovidCasesUntilDate(groupedDateJul2020)
        break;
      case 50:
        const groupedDateJan2021 = sortAndConvertDates(datesUntilJan2021)
        getCovidCasesOfDate(groupedDateJan2021[groupedDateJan2021.length - 1])
        getCovidCasesUntilDate(groupedDateJan2021)
        break;
      case 75:
        const groupedDateJul2021 = sortAndConvertDates(datesUntilJul2021)
        getCovidCasesOfDate(groupedDateJul2021[groupedDateJul2021.length - 1])
        getCovidCasesUntilDate(groupedDateJul2021)
        break;
      case 100:
        const groupedDateJan2022 = sortAndConvertDates(datesUntilJan2022)
        getCovidCasesOfDate(groupedDateJan2022[groupedDateJan2022.length - 1])
        getCovidCasesUntilDate(groupedDateJan2022)
        break;
    }
  }

  const marks: SliderMarks = {
    0: 'jan/2020',
    25: 'jul/2020',
    50: 'jan/2021',
    75: 'jul/2021',
    100: 'jan/2022',
  };

  return (
    <ContainerSlider>
      <Slider marks={marks} step={null} defaultValue={0} tooltipVisible={false} onChange={(e: any) => changeMarkDate(e)} />
    </ContainerSlider>
  )
}

DateSlider.ContainerSlider = styled.div`
  margin: auto;
  width: 90%;

  span {
    font-size: 13px;
    color: #343148;
    font-weight: bold;
  }
`


