import { useEffect, useState } from "react";
import { useCovidCases } from "../hooks/useCovidCases";
import styled from '@emotion/styled'
import MapChart from "../components/MapChart";
import { Show } from "./Show";
import ReactTooltip from "react-tooltip";

export function MapContent () {
  const { covidCasesOfDate, covidCasesUntilDate, optionView } = useCovidCases()
  const [content, setContent] = useState<any>({})
  const { Container } = MapContent

  useEffect(() => {

  }, [covidCasesOfDate, covidCasesUntilDate, optionView])

  function setTooltipContent (contentToolTip: any) {
    if (!!contentToolTip) setContent(contentToolTip)
  }

  return (
    <>
      <Container>
        <MapChart setTooltipContent={setTooltipContent} dataForMap={optionView === 'casesUntilDate' ? covidCasesUntilDate : covidCasesOfDate} />
        <HeaderInfo headerInfo={content} />
      </Container>
    </>
  )
}

MapContent.Container = styled.div`
  width: 69rem;
  height: 45rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: '#fff';
  margin: auto;
  margin-top: 20px;
  border: 2px solid #cccccc;
  border-radius: 5px;
`

const VariantInfo = ({ variantInfo }: any) => {
  const { Info, Title } = VariantInfo
  return (
    <Show condition={variantInfo.cases > 0 && variantInfo.variant !== 'non_who'}>
      <Info> Variant {variantInfo.variant}: <Title>{variantInfo.cases} cases </Title></Info>
    </Show>
  )
}

VariantInfo.Info = styled.p`
  font-weight: bold;
  color: var(--red);
  font-weight: normal;
  `
VariantInfo.Title = styled.strong`
`

const HeaderInfo = ({ headerInfo }: any) => {
  const { Header, Title } = HeaderInfo
  return (
    <Show condition={Object.keys(headerInfo).length !== 0}>
      <ReactTooltip place="right">
        <Header>Location: {headerInfo.location}</Header>
        <Header>Date: {headerInfo.date}</Header>
        {headerInfo?.variants?.map((item: any) => <VariantInfo variantInfo={item} />)}
        <Header>Total: <Title>{headerInfo.num_sequences_total} cases</Title> </Header>
      </ReactTooltip>
    </Show>
  )
}

HeaderInfo.Header = styled.p`
  font-weight: bold;
`
HeaderInfo.Title = styled.strong`
  font-weight: bold;
  color: var(--red);
`