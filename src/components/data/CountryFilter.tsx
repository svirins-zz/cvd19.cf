import React from "react";
import { Select, Tag } from "antd";
import { Tags, TagRenderProps, Selected } from "@types";

const { Option } = Select;
const CountryFilter = ({
  selected,
  setSelected,
  countries,
}: {
  selected: Selected[];
  setSelected: (currentCountries: Selected[]) => void;
  countries: Tags[];
}) => {
  function tagRender(p: TagRenderProps) {
    const { label, closable, onClose } = p;
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
      onChange={(arr) => setSelected(arr)}
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
