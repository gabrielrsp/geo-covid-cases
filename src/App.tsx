import { useEffect, useState } from 'react'
import { supabase } from './api/supabase'
import ReactTooltip from "react-tooltip"
import MapChart from './MapChart'
import alphaCodes from '../public/alpha3code.json';
import { Show } from './components/Show'

function App () {
  const [casesPerCountryByDate, setCasesPerCountryByDate] = useState([])
  const [countriesAndVariantsAndCasesByDate, setCountriesVariantsAndCasesByDate] = useState([])
  const [availableDates, setAvailableDates] = useState([])
  const [content, setContent] = useState<any>({})
  const [dataForMap, setDataForMap] = useState([])

  useEffect(() => {
    fetchDataByDate()
    fecthAllAvailableDates()
  }, [])

  async function fetchDataByDate () {
    const { data }: any = await supabase
      .from('covidvariants')
      .select('location, date, variant, num_sequences, num_sequences_total')
      .match({ date: '2021-02-08' })

    const uniqDataByDate = [...new Map(data.map((item: any) => [item['num_sequences_total'], item])).values()] as any
    setCasesPerCountryByDate(uniqDataByDate)


    const countriesVariantsAndCases = [] as any
    data.forEach((item: any) => countriesVariantsAndCases.push({ location: item.location, variant: item.variant, cases: item.num_sequences }))
    setCountriesVariantsAndCasesByDate(countriesVariantsAndCases)

    const casesPerCountryByDateWithCode = [] as any

    uniqDataByDate.forEach((cas: any) => {
      const found = alphaCodes.find(el => el.name === cas.location)
      const variants = countriesVariantsAndCases
        .filter((countryAndVariant: any) => countryAndVariant.location === cas.location)
        .map((item: any) => { return { variant: item.variant, cases: item.cases } })

      if (found) casesPerCountryByDateWithCode.push(
        {
          location: cas.location,
          ISO3: found['alpha-3'], variants,
          date: cas.date,
          num_sequences: cas.num_sequences,
          num_sequences_total: cas.num_sequences_total,
        })
    })

    setDataForMap(casesPerCountryByDateWithCode)
  }

  async function fecthAllAvailableDates () {
    const { data }: any = await supabase
      .from('covidvariants')
      .select('date')

    const availableDates = [...new Map(data.map((item: any) => [item['date'], item])).values()] as any
    const formatedDates = availableDates.map((item: any) => new Date(item.date).toISOString())
    setAvailableDates(formatedDates)
  }

  if (!casesPerCountryByDate) {
    return <pre>Loading...</pre>;
  }

  function setTooltipContent (contentToolTip: any) {

    if (!!contentToolTip) {
      setContent(contentToolTip)
    }
  }

  return (
    <div className="App" style={{
      width: "100%",
      height: "20%",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      background: '#fff'
    }}>

      <h1>Covid Daily Cases</h1>
      <div style={{ width: "1000px", borderStyle: "double" }}>
        <MapChart setTooltipContent={setTooltipContent} dataForMap={dataForMap} />
        <Show condition={Object.keys(content).length !== 0}>
          <ReactTooltip place="right">
            <p>Location: {content.location}</p>
            <p>Total: {content.num_sequences_total} </p>
            <p>Date: {content.date}</p>
            {
              content?.variants?.map((item: any) => {

                return (
                  <Show condition={item.cases > 0 && item.variant !== 'non_who'}>
                    <p>Variant: {item.variant} - {item.cases} Cases</p>
                  </Show>
                )
              })
            }
          </ReactTooltip>
        </Show>
      </div>
    </div>

  )
}

export default App
