import React from 'react';
import { Select, Tag } from 'antd';

import { Tags } from '../../types';

const CountryFilter = ({
  tags,
  setTags,
}: {
  tags: Tags,
  setTags: (tags: Tags) => void,
}) => {
  // TODO: process excusoins for 2 vessels
  // const handleChange = (currentArr => setTags(currentArr));
    // const currentCountries = [];
    // currentArr.map(el => (
    //   currentCountries.push({id: el, name: el})
    // ));
  const handleChange = (currentArr) => console.log(currentArr);

  const defaultValuesArr = tags.currentTags.map((e) => e.id);
  const optionsValuesArr = tags.suggestedTags.map((e) => (
    { value: e.id }
  ));

  return (
    <Select
      mode="multiple"
      style={{ width: '100%' }}
      showArrow
      placeholder="Add Country"
      defaultValue={defaultValuesArr}
      options={optionsValuesArr}
      onChange={handleChange}
    />
  );
};

export default CountryFilter;
