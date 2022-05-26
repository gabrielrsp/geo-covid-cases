import styled from "@emotion/styled"
import { useEffect, useState } from "react"
import { useCovidCases } from "../hooks/useCovidCases"

export function Radio () {

  const { Container } = Radio

  const { setSelectedOptionView } = useCovidCases()
  function handleSelectOption (selectedValue: any) {
    setSelectedOptionView(selectedValue)
  }

  return (
    <Container>
      <div>
        <input type="radio" id="casesOfDate" name="optionView" value="casesOfDate" onChange={(e) => handleSelectOption(e.target.value)}  defaultChecked/>
        <label >Cases of selected date</label>
      </div>
      <input type="radio" id="casesUntilDate" name="optionView" value="casesUntilDate" onChange={(e) => handleSelectOption(e.target.value)}  />
      <label >Cases until selected date</label>
    </Container>
  )
}

Radio.Container = styled.div`
  margin: 0 10px;
  
`