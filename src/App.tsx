import React from 'react'
import { CovidCasesProvider, useCovidCases } from './hooks/useCovidCases';
import { MapContent } from './components/MapContent';
import { GlobalStyle } from './styles/GlobalStyles';
import { Header } from './components/Header';

function App () {
  return (
    <>
      <GlobalStyle />
      <CovidCasesProvider>
        <Header />
        <MapContent />
      </CovidCasesProvider>
    </>
  )
}

export default App
