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
  const handleChange = (currentArr: any[]) => {
    const currentTags = currentArr.map((el) => ({
      id: el,
      name: el,
    }));
    setTags({ ...tags, currentTags });
  };

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
