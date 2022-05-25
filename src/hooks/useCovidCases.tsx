import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { supabase } from '../services/supabase';
import alphaCodes from '../assets/alpha3code.json';
import { totalmem } from 'os';

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

interface OptionView {
  optionView: 'casesOfDate' | 'casesUntilDate' 
}

interface CovidCasesProviderProps {
  children: ReactNode;
}

interface CovidCasesContextData {
  covidCasesOfDate: CovidCasesMap[];
  covidCasesUntilDate: CovidCasesMap[];
  optionView: string;
  availableDates: any
  getCovidCasesOfDate: (dataRegistro: string) => Promise<any>;
  getCovidCasesUntilDate: (groupDate: Array<string>) => Promise<any>;
  setSelectedOptionView: (optionView: OptionView) => void;
}


const CovidCasesContext = createContext<CovidCasesContextData>(
  {} as CovidCasesContextData
);




export function CovidCasesProvider ({ children }: CovidCasesProviderProps) {
  const [covidCasesOfDate, setCovidCases] = useState<CovidCasesMap[]>([]);
  const [covidCasesUntilDate, setCovidCasesUntilDate] = useState<CovidCasesMap[]>([]);
  const [availableDates, setAvailableDates] = useState<any[]>([])
  const [optionView, setOptionView] = useState('')

  useEffect(() => {
    setOptionView('casesOfDate')
    fecthAllAvailableDates()
  }, [])

  function setSelectedOptionView (optionView: string) {
    setOptionView(optionView)
  }

  async function fecthAllAvailableDates () {
    const { data }: any = await supabase
      .from('covidvariants')
      .select('date')

    const availableDatesFound = [...new Map(data.map((item: any) => [item['date'], item])).values()] as any
    const formatedDates = availableDatesFound.map((item: any) => new Date(item.date).toISOString())
    setAvailableDates(formatedDates)
  }

  async function getCovidCasesOfDate (dataRegistro: string) {
    const { data }: any = await supabase
      .from('covidvariants')
      .select('location, date, variant, num_sequences, num_sequences_total')
      .match({ date: dataRegistro })

    const uniqDataByDate = [...new Map(data.map((item: any) => [item['location'], item])).values()] as any

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


  async function getCovidCasesUntilDate (groupDate: Array<string>) {
    const { data }: any = await supabase
      .from('covidvariants')
      .select('location, date, variant, num_sequences, num_sequences_total')
      .in('date', groupDate)

    const extractedCountries = data.map((item: CovidCases) => item.location)
    const countries = [...new Set(extractedCountries)];

    const InfoByCountry: any = []

    countries.forEach((country: any) => {
      const arrayCasesCountry: any = []
      data.forEach((covidCase: CovidCases) => {
        if (country === covidCase.location) {
          arrayCasesCountry.push(covidCase)
        }
      })

      InfoByCountry.push({ location: country, arrayCasesCountry })
    })

    const InfoByDate: any = []
    InfoByCountry.forEach((countryInfo: any) => {
      groupDate.forEach((date) => {

        const arrayCasesDate: any = []
        countryInfo.arrayCasesCountry.forEach((covidCase: CovidCases) => {

          if (date === covidCase.date) {
            arrayCasesDate.push({ ...covidCase, num_sequences: +covidCase.num_sequences })
          }
        })
        InfoByDate.push({ location: countryInfo.location, date, arrayCasesDate })

      })
    })

    const AllInfoByCountry: any = []

    countries.forEach((country: any) => {
      const arrayRawCases: any = []

      InfoByDate.forEach((item: any) => {
        if (country === item.location) {
          arrayRawCases.push(item.arrayCasesDate)
        }
      })
      AllInfoByCountry.push({ location: country, arrayRawCases })
    })

    const FlatedInfo: any = []
    countries.forEach((country: any) => {
      const arrayFlated: any = []

      AllInfoByCountry.forEach((dataLocation: any) => {
        if (country === dataLocation.location) {
          arrayFlated.push(dataLocation.arrayRawCases.flat())
        }
      })
      FlatedInfo.push({ location: country, arrayFlated })
    })


    const finalFormatedData: any = []
    FlatedInfo.forEach((item: any) => {

      let holder: any = {};
      item.arrayFlated[0].forEach(function (d: any) {
        if (holder.hasOwnProperty(d.variant)) {
          holder[d.variant] = holder[d.variant] + d.num_sequences;
        } else {
          holder[d.variant] = d.num_sequences;
        }
      });

      const ISOfound: any = alphaCodes.find(el => el.name === item.location)

      var variants = [];
      for (var prop in holder) {
        variants.push({ variant: prop, cases: holder[prop] });
      }

      let num_sequences_total = 0
      for (let i in variants) {
        if (variants[i].variant !== 'non_who') {
          num_sequences_total += variants[i].cases
        }
      }

      const non_who = variants.filter((v: any) => v.variant === 'non_who')
      finalFormatedData.push({ location: item.location, num_sequences: non_who[0].cases, num_sequences_total, ISO3: ISOfound['alpha-3'], date: groupDate[groupDate.length - 1], variants })

    })
    setCovidCasesUntilDate(finalFormatedData)
  }

  return (
    <CovidCasesContext.Provider value={{ covidCasesOfDate, covidCasesUntilDate, optionView, setSelectedOptionView, availableDates, getCovidCasesOfDate, getCovidCasesUntilDate }}>
      {children}
    </CovidCasesContext.Provider>
  );

}

export function useCovidCases () {
  const context = useContext(CovidCasesContext);
  return context;
}
