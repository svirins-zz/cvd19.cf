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
import { CountryFilter } from "components/data/countryFilter";
import { Page, SEO } from "components/layout";
import { Table } from "components/tables/table";
import { PERIOD_LENGTH } from "const";
import { myContext } from "context";
import {
  calcCountries,
  getChartInfo,
  getColor,
  getCountriesList,
  sumPeriodData,
} from "lib";
import React, { useContext } from "react";
import { useImmer } from "use-immer";

import {
  Countries,
  CountriesList,
  Country,
  SelectedCountries,
  TableState,
} from "../@types";

const { Title, Text } = Typography;

const Data = ({
  pageContext,
}: {
  pageContext: GatsbyTypes.SitePageContext;
}) => {
  const { width } = useContext(myContext);
  // get build-time data
  const data = pageContext.data;

  // initialize state
  const [periodInfo, setPeriodInfo] = useImmer({
    length: PERIOD_LENGTH,
  });
  const [selectedTable, setSelectedTable] = useImmer<TableState>({
    table: "newDeaths",
  });
  const [selectedCountries, setSelectedCountries] = useImmer<SelectedCountries>(
    {
      countries: [{ name: "United States", color: "rgb(31,119,180)" }],
    }
  );
  const [startAtDeaths, setStartAtDeaths] = useImmer({
    isStart: false,
  });

  // util functions
  const chartInfo = getChartInfo(selectedTable.table, periodInfo.length);
  const onCountriesChange = (currentCountries: string[]) => {
    const countriesWithColors = currentCountries.map((country, index) => {
      return {
        name: country,
        color: getColor(index),
      };
    });
    setSelectedCountries((draft) => {
      draft.countries = [...countriesWithColors];
    });
  };

  // transform and prepare country data
  // TODO: move countries list co buildtime + move calcCountries to build time
  const countries: Country[] = calcCountries(
    data as Countries,
    periodInfo.length
  );
  const countriesList: CountriesList[] = getCountriesList(countries);
  const preparedCountries: Country[] = [
    ...countries,
    ...sumPeriodData(countries, periodInfo.length),
  ];
  return (
    <Page>
      <SEO
        title="Covid-19 pandemic details"
        description="Covid-19 data, detailed and filtered"
        pathname="/data"
      />
      <>
        <Row gutter={[8, 8]}>
          <Col span={24} style={{ marginBottom: "10px" }}>
            <Title level={3} style={{ marginBottom: "0px" }}>
              Data reports constructor
            </Title>
            <Divider className="divider" />
            <Title level={5}>
              Choose data type, period, countries (up to 10). Current
              choice:&nbsp;
              <span className="choiceText">{chartInfo.title}</span>
            </Title>
          </Col>
        </Row>
        <Row gutter={[8, 8]}>
          <Col span={24}>
            <Radio.Group
              value={selectedTable.table}
              onChange={(e) => {
                setSelectedTable((draft) => {
                  draft.table = e.target.value;
                });
              }}
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
              defaultValue={periodInfo.length}
              onChange={(val) =>
                setPeriodInfo((draft) => {
                  draft.length = Number(val);
                })
              }
            />
            {"    "}
            <Checkbox
              onChange={(e) =>
                setStartAtDeaths((draft) => {
                  draft.isStart = e.target.checked;
                })
              }
              checked={startAtDeaths.isStart}
            >
              Start at 1-st death
            </Checkbox>
          </Col>
        </Row>{" "}
        <Row gutter={[8, 8]}>
          <Col span={24} style={{ marginBottom: "20px" }}>
            <CountryFilter
              selected={selectedCountries.countries}
              setSelected={onCountriesChange}
              countries={countriesList}
            />
          </Col>
        </Row>
        <Col span={24} style={{ marginBottom: "20px" }}>
          <div style={{ height: "450px" }}>
            <DataChart
              countries={preparedCountries}
              selectedCountries={selectedCountries.countries}
              yValue={chartInfo.y}
              isStartAtDeaths={startAtDeaths.isStart}
              multiplyer={width?.multiplyer ?? 1}
            />
          </div>
        </Col>
        <Col span={24}>
          <Title level={5} style={{ marginBottom: "20px" }}>
            {chartInfo.title}&nbsp;(all countries included)
          </Title>
          <Table
            data={preparedCountries}
            periodLength={periodInfo.length}
            kind={selectedTable.table}
            variation={"wide"}
            multiplyer={width?.multiplyer ?? 1}
          />
        </Col>
      </>
    </Page>
  );
};

export default Data;
