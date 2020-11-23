import { Select, Tag } from "antd";
import React from "react";

import { CountriesList, SelectedCountries, TagRenderProps } from "@types";

const { Option } = Select;
export const CountryFilter = ({
  selected = [],
  setSelected,
  countries,
}: {
  selected: SelectedCountries[];
  setSelected: (currentCountries: string[]) => void;
  countries: CountriesList[];
}): JSX.Element => {
  function tagRender(props: TagRenderProps) {
    const { label, closable, onClose } = props;
    return (
      <Tag
        key={label.toString()}
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
