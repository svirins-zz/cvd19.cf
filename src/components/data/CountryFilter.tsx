import React from 'react';
import { Select, Tag } from 'antd';
import { Tags, TagRenderProps } from '@types';
import { getColorByCountryName } from 'lib';

const { Option } = Select;
// TODO: country remove doesn't works
const CountryFilter = ({
  selected,
  setSelected,
  countries,
}: {
  selected: string[],
  setSelected: (tags: string[]) => void,
  countries: Tags[]
}) => {
  console.log('selected: ', selected,
    'setFn: ', setSelected,
    'allCountries:', countries);
  const handleChange = (currentArr: string[]) => {
    setSelected(currentArr);
  };
  function tagRender(p) {
    const {
      label, closable, onClose,
    } = p;
    console.log('tag props: ', p);
    return (
      <Tag
        key={label}
        color={getColorByCountryName(label, countries)}
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
      style={{ width: '100%' }}
      showArrow
      defaultValue={selected}
      placeholder="Add Country"
      onChange={handleChange}
      tagRender={(p) => tagRender(p)}
      autoClearSearchValue
    >
      {countries.map((item) => (
        <Option value={item.label} key={item.id}>{item.label}</Option>
      ))}
    </Select>
  );
};

export default CountryFilter;
