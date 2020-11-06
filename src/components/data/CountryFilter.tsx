import React from "react";
import { Select, Tag } from "antd";
import { RenderProps, Selected, CountriesList } from "@types";

const { Option } = Select;
const CountryFilter = ({
  selected = [],
  setSelected,
  countries,
}: {
  selected?: Selected[];
  setSelected: (currentCountries: string[]) => void;
  countries: CountriesList[];
}) => {
  function tagRender(props: RenderProps) {
    const { label, closable, onClose } = props;
    return (
      <Tag
        key={label}
        color={selected.find((country) => country.name === label)?.color}
        closable={closable}
        onClose={(e) => onClose(e)}
        style={{ marginRight: 3 }}
      >
        {label}
      </Tag>
    );
  }

  return (
    <Select
      mode="multiple"
      style={{ width: "100%" }}
      showArrow={true}
      defaultValue={selected.map((country) => country.name)}
      placeholder="Add Country"
      maxTagCount={10}
      onChange={(selectedCountriesArray) => setSelected(selectedCountriesArray)}
      tagRender={(p) => tagRender(p)}
      autoClearSearchValue={true}
    >
      {countries.map((item) => (
        <Option value={item.label} key={item.id}>
          {item.label}
        </Option>
      ))}
    </Select>
  );
};

export default CountryFilter;
