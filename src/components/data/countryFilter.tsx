import React from 'react';
import { Select, Tag } from 'antd';
import FlagIconFactory from 'react-flag-icon-css';
import iso3311a2 from 'iso-3166-1-alpha-2';
import { Tags } from '../../types';

const FlagIcon = FlagIconFactory(React, { useCssModules: false });
const CountryFilter = ({
  tags,
  setTags,
}: {
  tags: Tags,
  setTags: (tags: Tags) => void,
}) => {
  const handleChange = (e) => {
    console.log(e);
  };
  // process excusoins for 2 vessels
  // console.log iso3311a2.getCountry("DE")    // "Germany"

  const tagRender = (props) => {
    const {
      label, value, closable, onClose,
    } = props;
    return (
      <Tag color={value} closable={closable} onClose={onClose} style={{ marginRight: 3 }}>
        {label}
      </Tag>
    );
  };
  const defaultValuesArr = tags.currentTags.map((e, i) => ({ key: i, value: e, label: e }));
  const optionsValuesArr = tags.suggestedTags.map((e, i) => ({ key: i, value: e, label: e }));

  //
  return (
    <p>df</p>
    // <Select
    //   mode="multiple"
    //   style={{ width: '100%' }}
    //   showArrow
    //   allowClear
    //   maxTagCount={8}
    //   placeholder="Add Country"
    //   tagRender={tagRender}
    //   defaultValue={defaultValuesArr}
    //   options={optionsValuesArr}
    //   onChange={handleChange}
    // />
  );
};

export default CountryFilter;

// //     handleDelete={handleDelete}
// //     handleAddition={handleAddition}
// const handleDelete = (index: number) => {
//   const currentTags = tags.currentTags.slice(0);
//   currentTags.splice(index, 1);
//   setTags({ ...tags, currentTags });
// };
// const handleAddition = (tag: Tag) => {
//   const currentTags = tags.currentTags.length > 5
//     ? tags.currentTags.slice(1)
//     : tags.currentTags;
//   setTags({ ...tags, currentTags: [...currentTags, tag] });
// };