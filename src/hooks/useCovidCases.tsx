import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { supabase } from '../services/supabase';
import alphaCodes from '../assets/alpha3code.json';

interface CovidCases {
  date: string;
  location: string;
  num_sequences: string;
  num_sequences_total: number;
  variant: string;
}

interface Variant {
  cases: string;
  variant: string;
}

interface CovidCasesMap {
  ISO3: string;
  date: string;
  location: string;
  num_sequences: string;
  num_sequences_total: number;
  variants: Variant[];

}

interface CovidCasesProviderProps {
  children: ReactNode;
}

interface CovidCasesContextData {
  covidCases: CovidCasesMap[];
  availableDates: any
  getCovidCasesByDate: (dataRegistro: string) => Promise<any>;
}


const CovidCasesContext = createContext<CovidCasesContextData>(
  {} as CovidCasesContextData
);


export function CovidCasesProvider ({ children }: CovidCasesProviderProps) {
  const [covidCases, setCovidCases] = useState<CovidCasesMap[]>([]);
  const [availableDates, setAvailableDates] = useState<any[]>([])

  useEffect(() => {
    getCovidCasesByDate('2021-02-08')
    fecthAllAvailableDates()
  }, [])

  async function fecthAllAvailableDates () {
    const { data }: any = await supabase
      .from('covidvariants')
      .select('date')

    const availableDatesFound = [...new Map(data.map((item: any) => [item['date'], item])).values()] as any
    const formatedDates = availableDatesFound.map((item: any) => new Date(item.date).toISOString())
    setAvailableDates(formatedDates)
  }

  async function getCovidCasesByDate (dataRegistro: string) {
    const { data }: any = await supabase
      .from('covidvariants')
      .select('location, date, variant, num_sequences, num_sequences_total')
      .match({ date: dataRegistro || '2021-02-08' })

    const uniqDataByDate = [...new Map(data.map((item: any) => [item['num_sequences_total'], item])).values()] as any

    const countriesVariantsAndCases = [] as any
    data.forEach((item: CovidCases) => countriesVariantsAndCases
      .push({ location: item.location, variant: item.variant, cases: item.num_sequences }))

    const casesPerCountryByDateWithCode = [] as any

    uniqDataByDate.forEach((cas: CovidCases) => {
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

    setCovidCases(casesPerCountryByDateWithCode)

  }

  return (
    <CovidCasesContext.Provider value={{ covidCases, availableDates, getCovidCasesByDate }}>
      {children}
    </CovidCasesContext.Provider>
  );

}

export function useCovidCases () {
  const context = useContext(CovidCasesContext);
  return context;
}









