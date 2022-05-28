import { CovidCasesProvider } from './hooks/useCovidCases';
import { GlobalStyle } from './styles/GlobalStyles';
import { BrowserRouter } from "react-router-dom";
import 'antd/dist/antd.css'
import { Main } from './components/Main';

function App () {
  return (
    <BrowserRouter>
      <CovidCasesProvider>
        <Main />
        <GlobalStyle />
      </CovidCasesProvider>
    </BrowserRouter>
  )
}

export default App
