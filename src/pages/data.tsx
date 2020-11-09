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
import { myContext } from "context";
import { Page, SEO } from "components/layout";
import { CountryFilter } from "components/data/countryFilter";
import { DataChart } from "components/charts";
import { Table } from "components/tables/table";
import { PERIOD_LENGTH } from "const";
import {
  calcCountries,
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

const { Title, Text } = Typography;

const Data = ({
  pageContext,
}: {
  pageContext: GatsbyTypes.SitePageContext;
}) => {
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
      <SEO title="All Data" />
      <myContext.Consumer>
        {(context) => (
          <>
            <Row gutter={[8, 8]}>
              <Col span={24}>
                <Title level={3} style={{ marginBottom: "0px" }}>
                  Data reports constructor
                </Title>
                <Title level={5} style={{ marginBottom: "0px" }}>
                  Choose data type, period, countries (up to 10). Current
                  choice:&nbsp;
                  <span className="choiceText">{chartInfo.title}</span>
                </Title>
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
                  <Radio.Button value="growthRate">
                    Change in Deaths
                  </Radio.Button>
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
              <div style={{ height: "450px" }}>
                <DataChart
                  countries={preparedCountries}
                  selectedCountries={selectedCountries.countries}
                  yValue={chartInfo.y}
                  isStartAtDeaths={startAtDeaths.isStart}
                  multiplyer={context.width?.multiplyer ?? 1}
                />
              </div>
            </Col>
            <Col span={24}>
              <Title level={5} style={{ marginBottom: "0px" }}>
                {chartInfo.title}&nbsp;(all countries included)
              </Title>
              <Divider className="divider" />
              <Table
                data={preparedCountries}
                periodLength={periodInfo.length}
                kind={selectedTable.table}
                variation={"wide"}
                multiplyer={context.width?.multiplyer ?? 1}
              />
            </Col>
          </>
        )}
      </myContext.Consumer>
    </Page>
  );
};

export default Data;
