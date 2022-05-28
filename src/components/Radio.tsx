import styled from "@emotion/styled"
import { useEffect, useState } from "react"
import { generatePath, useHistory, useLocation } from "react-router-dom"
import { useCovidCases } from "../hooks/useCovidCases"

export function Radio () {
  const { Container, OptionContainer } = Radio
  const [query, setQuery] = useState("")
  const history = useHistory()

  const { setSelectedOptionView, optionView, dateView } = useCovidCases()

  useEffect(() => {
    if (query && dateView && optionView) {
      const gp = generatePath("dateview/:dateView/optionview/:optionView", {
        dateView: dateView,
        optionView: optionView
      });
      history.push({ search: gp.toString() })
    }
  }, [query, history])


  function handleSelectOption (selectedValue: any) {
    setSelectedOptionView(selectedValue)
    setQuery(selectedValue)
  }

  return (
    <Container>
      <OptionContainer>
        <input type="radio" id="casesOfDate" name="optionView" value="casesOfDate" onChange={(e) => handleSelectOption(e.target.value)} defaultChecked={optionView == 'casesOfDate'} />
        <strong>Cases of selected date</strong>
      </OptionContainer>
      <OptionContainer>
        <input type="radio" id="casesUntilDate" name="optionView" value="casesUntilDate" onChange={(e) => handleSelectOption(e.target.value)} defaultChecked={optionView == 'casesUntilDate'} />
        <strong> Cases until selected date</strong>
      </OptionContainer>
    </Container>
  )
}

Radio.Container = styled.div`
  margin: 0 10px;
`

Radio.OptionContainer = styled.div`
  display: flex;
  align-items: center;
`