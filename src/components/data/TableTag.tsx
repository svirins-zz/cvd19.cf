import React from 'react';
import { Tag } from 'antd';
import { getTagColor, commafy } from 'lib';
import { OutbreakStatus } from '@types';

const TableTag = (status: OutbreakStatus, text: number, index: number): JSX.Element => (
  <Tag
    color={getTagColor(status)}
    key={index}
  >
    {commafy(text)}
  </Tag>
);

export default TableTag;
