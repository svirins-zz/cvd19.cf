import React from "react";
import { useImmer } from "use-immer";
import {
  Typography,
  Divider,
  Col,
  Row,
  Radio,
  Checkbox,
  InputNumber,
} from "antd";
import useSWR from "swr";
import { myContext } from "context";
import COUNTRY_QUERY from "queries";
import { fetcher } from "api";
import { Loading, Error, Page, SEO } from "components/layout";
import CountryFilter from "components/data/CountryFilter";
import { DataChart } from "components/charts";
import TotalTable from "components/tables/TotalTable";
import { PERIOD_LENGTH } from "const";
import {
  calculateData,
  sumPeriodData,
  getColor,
  getCountriesList,
  getChartInfo,
} from "lib";
import {
  TableState,
  CountriesList,
  Country,
  Countries,
  SelectedCountries,
} from "../@types";
const { Title, Text, Paragraph } = Typography;

const Data = () => {
  // initialize state
  const [periodInfo, setPeriodInfo] = useImmer({
    length: PERIOD_LENGTH,
  });
  const [selectedTable, setSelectedTable] = useImmer<TableState>({
    table: "newDeaths",
  });
  const [selectedCountries, setSelectedCountries] = useImmer<SelectedCountries>(
    {
      countries: [],
    }
  );
  const [startAtDeaths, setStartAtDeaths] = useImmer({
    isStart: false,
  });
  const chartInfo = getChartInfo(selectedTable.table, periodInfo.length);
  const onCountriesChange = (currentCountries: string[]) => {
    const countriesWithcolors = currentCountries.map((country, index) => {
      return {
        name: country,
        color: getColor(index),
      };
    });
    setSelectedCountries((draft) => {
      draft.countries = [...countriesWithcolors];
    });
  };

  // fetch data
  const { data, error } = useSWR<Countries>(COUNTRY_QUERY, fetcher);
  if (!error && !data) return <Loading />;
  if (error) return <Error error={error} />;

  // transform and prepare adata
  const countries: Country[] = calculateData(data, periodInfo.length);
  const countriesList: CountriesList[] = getCountriesList(countries);
  const preparedCountries: Country[] = [
    ...countries,
    ...sumPeriodData(countries, periodInfo.length),
  ];
  return (
    <Page>
      <SEO title="All Data" />
      <Row gutter={[8, 8]}>
        <Col span={24}>
          <Title level={3} style={{ marginBottom: "0px" }}>
            Data reports constructor
          </Title>
          <Paragraph>choose data type, period, countries (up to 10)</Paragraph>
          <Divider className="divider" />
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
        <Col span={24}>
          <CountryFilter
            selected={selectedCountries.countries}
            setSelected={onCountriesChange}
            countries={countriesList}
          />
        </Col>
      </Row>
      <Col span={24}>
        <Title level={5} style={{ marginBottom: "0px" }}>
          {chartInfo.title}
        </Title>
        <myContext.Consumer>
          {(context) => (
            <div style={{ height: "450px" }}>
              <DataChart
                countries={preparedCountries}
                selectedCountries={selectedCountries.countries}
                yValue={chartInfo.y}
                isStartAtDeaths={startAtDeaths.isStart}
                multiplyer={context.width!.multiplyer}
              />
            </div>
          )}
        </myContext.Consumer>
      </Col>
      <Col span={24}>
        <Title level={3} style={{ marginBottom: "0px" }}>
          {chartInfo.title}
        </Title>
        <Paragraph>all countries included, last 5 periods</Paragraph>
        <Divider className="divider" />
        <TotalTable
          data={preparedCountries}
          periodLength={periodInfo.length}
          kind={selectedTable.table}
          size={6}
        />
      </Col>
    </Page>
  );
};

export default Data;
