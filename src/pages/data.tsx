import {
  Checkbox,
  Col,
  Divider,
  InputNumber,
  Radio,
  Row,
  Typography,
} from "antd";
import { DataChart } from "components/charts";
import { Page, SEO } from "components/layout";
import { Table } from "components/tables/table";
import { CountryFilter } from "components/ui/countryFilter";
import { PERIOD_LENGTH } from "const";
import { myContext } from "context";
import { useGetDetailedData } from "hooks";
import { getChartInfo, getColor } from "lib";
import React, { useContext, useEffect } from "react";
import { useImmer } from "use-immer";

import { DataPageState, FiltersState, TableType } from "../@types";

const { Title, Text, Paragraph } = Typography;

const Data = ({
  pageContext,
}: {
  pageContext: GatsbyTypes.SitePageContext;
}): JSX.Element => {
  const { width } = useContext(myContext);
  const data = pageContext.data;
  const [ filtersState, setFiltersState ] = useImmer<FiltersState>({
    periodLength: PERIOD_LENGTH,
    selectedTable: TableType.NewDeaths,
    selectedCountries: [{ name: "United States", color: "rgb(31,119,180)" }],
    startAtDeaths: false,
  })
  const [ dataState, setDataState ] = useImmer<DataPageState>({
    countriesList: [],
    preparedCountries: []
  });
  useEffect(() => {
    const { countriesList, preparedCountries } = useGetDetailedData(
      data,
      filtersState.periodLength
    );
    setDataState((draft) => {
      draft.countriesList = countriesList;
      draft.preparedCountries = preparedCountries;
    })  
  },[filtersState.periodLength]) 
  const chartInfo = getChartInfo(filtersState.selectedTable, filtersState.periodLength);

  const onCountriesChange = (currentCountries: string[]) => {
    const countriesWithColors = currentCountries.map((country, index) => {
      return {
        name: country,
        color: getColor(index),
      };
    });
    setFiltersState((draft) => {
      draft.selectedCountries = countriesWithColors;
    });
  };
  const onTableChange = (value: TableType) => {
    setFiltersState((draft) => {
      draft.selectedTable = value;
    });
  }
  const onInputChange = (value: number) => setFiltersState((draft) => {
    console.log(value)
    draft.periodLength = value;
  })
  const onDeathsChange = (value: boolean) => {
    setFiltersState((draft) => {
      draft.startAtDeaths = value;
    })
  }
  return (
    <Page>
      <SEO
        title="Covid-19 pandemic details"
        description="Covid-19 data, detailed and filtered"
        pathname="/data"
      />
      <>
        <Row gutter={[8, 8]}>
          <Col span={24}>
            <Title level={3} style={{ marginBottom: "0px" }}>
              Data reports constructor
            </Title>
            <Divider className="divider" />
            <Paragraph className="bold-blue">
              Choose data type, period, countries (up to 10). Current
              choice:&nbsp;
              <span className="choiceText">{chartInfo.title}</span>
            </Paragraph>
          </Col>
        </Row>
        <Row gutter={[8, 8]}>
          <Col span={24}>

            <Radio.Group
              value={filtersState.selectedTable}
              onChange={(event) => onTableChange(event.target.value)}
            >
              <Radio.Button value="newDeaths">New Deaths</Radio.Button>
              <Radio.Button value="totalDeaths">Total Deaths</Radio.Button>
              <Radio.Button value="growthRate">Change in Deaths</Radio.Button>
              <Radio.Button value="newCases">New Cases</Radio.Button>
              <Radio.Button value="totalCases">Total Cases</Radio.Button>
            </Radio.Group>
          </Col>
        </Row>
        <Row gutter={[8, 8]}>
          <Col span={24}>
            <Text>Period, days: </Text>
            <InputNumber
              min={1}
              max={20}
              placeholder="Period length, days"
              defaultValue={filtersState.periodLength}
              onChange={(value) => onInputChange(value as number)}
            />
            {"    "}
            <Checkbox
              onChange={(e) => onDeathsChange(e.target.checked)}
              checked={filtersState.startAtDeaths}
            >
              Start at 1-st death
            </Checkbox>
          </Col>
        </Row>{" "}
        <Row gutter={[8, 8]}>
          <Col span={24} style={{ marginBottom: "20px" }}>
            <CountryFilter
              selected={filtersState.selectedCountries}
              setSelected={onCountriesChange}
              countries={dataState.countriesList}
            />
          </Col>
        </Row>
        <Col span={24} style={{ marginBottom: "20px" }}>
          <div style={{ height: "450px" }}>
            <DataChart
              countries={dataState.preparedCountries}
              selectedCountries={filtersState.selectedCountries}
              yValue={chartInfo.y}
              isStartAtDeaths={filtersState.startAtDeaths}
              multiplyer={width?.multiplyer ?? 1}
            />
          </div>
        </Col>
        <Col span={24}>
          <Paragraph className="bold-blue" style={{ marginBottom: "20px" }}>
            {chartInfo.title}&nbsp;(all countries included)
          </Paragraph>
          <Table
            data={dataState.preparedCountries}
            periodLength={filtersState.periodLength}
            kind={filtersState.selectedTable}
            variation={"wide"}
            multiplyer={width?.multiplyer ?? 1}
          />
        </Col>
      </>
    </Page>
  );
};
export default Data;