import React from 'react';
import { Select, Tag } from 'antd';
import { Tags, TagT } from '../../types';
import { getColorByCountryName } from '../../utilities/colorUtils';

const { Option } = Select;

const CountryFilter = ({
  tags,
  setTags,
}: {
  tags: Tags,
  setTags: (tags: Tags) => void,
}) => {
  const handleChange = (currentArr: string[]) => {
    // const currentTags: TagT[] = currentArr.map((el) => {
    //   id: el,
    //   label: el,
    //   value: el,
    // });
    setTags({ ...tags, currentArr });
    console.log(currentTags);
  };
  function tagRender(props) {
    const {
      label, closable, onClose
    } = props;
    return (
      <Tag
        key={label}
        color={getColorByCountryName(label, tags.suggestedTags)}
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
      placeholder="Add Country"
      onChange={handleChange}
      tagRender={tagRender}
    >
      {tags.suggestedTags.map((item) => (
        <Option value={item.label} key={item.id}>{item.label}</Option>
      ))}
    </Select>
  );
};

export default CountryFilter;
