import React from 'react';
import { Select, Tag } from 'antd';
import { Tags } from '../../types';
import { getColorByCountryName } from '../../utilities/colorUtils';

const { Option } = Select;

const CountryFilter = ({
  selected,
  setSelected,
  countries,
}: {
  selected: string[],
  setSelected: (tags: string[]) => void,
  countries: Tags[]
}) => {
  const handleChange = (currentArr: string[]) => {
    setSelected(currentArr);
  };
  function tagRender(props: {label: string, closable: boolean, onClose: Function}) {
    const {
      label, closable, onClose,
    } = props;
    return (
      <Tag
        key={label}
        color={getColorByCountryName(label, countries)}
        closable={closable}
        onClose={onClose}
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
      tagRender={tagRender}
    >
      {countries.map((item) => (
        <Option value={item.label} key={item.id}>{item.label}</Option>
      ))}
    </Select>
  );
};

export default CountryFilter;
