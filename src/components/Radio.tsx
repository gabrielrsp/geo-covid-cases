import { useEffect, useState } from "react"
import { useCovidCases } from "../hooks/useCovidCases"

export function Radio () {

  const { setSelectedOptionView } = useCovidCases()
  function handleSelectOption (selectedValue: any) {
    setSelectedOptionView(selectedValue)
  }

  return (
    <div>
      <div>
        <input type="radio" id="casesOfDate" name="optionView" value="casesOfDate" onChange={(e) => handleSelectOption(e.target.value)}  defaultChecked/>
        <label >Cases of selected date</label>
      </div>
      <input type="radio" id="casesUntilDate" name="optionView" value="casesUntilDate" onChange={(e) => handleSelectOption(e.target.value)}  />
      <label >Cases until selected date</label>
    </div>
  )
}