import React from 'react'
import { CovidCasesProvider, useCovidCases } from './hooks/useCovidCases';
import { MapContent } from './components/MapContent';
import { GlobalStyle } from './styles/GlobalStyles';
import { Header } from './components/Header';
import { DateSlider } from './components/DateSlider';
import 'antd/dist/antd.css'

function App () {
  return (
    <>
      <GlobalStyle />
      <CovidCasesProvider>
        <Header />
        <DateSlider/>
        <MapContent />
      </CovidCasesProvider>
    </>
  )
}

export default App
