import React from 'react';
import { Typography, Table, Tag } from 'antd';
import { OutbreakStatus } from '../../types';
import { calcTagstyle } from '../../utilities/colorUtils';

const { Text, Paragraph } = Typography;

export const getStatusInfo = (status: OutbreakStatus | undefined) => {
  if (status === OutbreakStatus.None) {
    return (
      <>
        <Text className="statNone largeText">
          <strong>
            {OutbreakStatus.None}
            :
          </strong>
          {' '}
        </Text>
        <Text className="largeText">
          there have been
        </Text>
        <Text className="largeText">
          {' '}
          <strong>no deaths</strong>
          .
          {' '}
        </Text>
      </>
    );
  } if (status === OutbreakStatus.Small) {
    return (
      <>
        <Text className="statSmall largeText">
          {OutbreakStatus.Small}
          :
        </Text>
        {' '}
        <Text className="largeText">
          there have been
        </Text>
        <Text className="largeText">
          {' '}
          <strong>less than 10 deaths</strong>
          .
        </Text>
      </>
    );
  } if (status === OutbreakStatus.Losing) {
    return (
      <>
        <Text className="statLosing largeText">
          {OutbreakStatus.Losing}
          :
        </Text>
        {' '}
        <Text className="largeText">
          deaths rose by
        </Text>
        <Text className="largeText">
          {' '}
          <strong>100% or more</strong>
          {' '}
          OR
          {' '}
          <strong>stayed above 1000</strong>
          .
        </Text>
      </>
    );
  } if (status === OutbreakStatus.Flattening) {
    return (
      <>
        <Text className="statFlattening largetext">
          {OutbreakStatus.Flattening}
          :
        </Text>
        {' '}
        <Text className="largeText">
          deaths did not double, but did
        </Text>
        <Text className="largeText">
          {' '}
          <strong>increase</strong>
          {' '}
          OR
          {' '}
          <strong>stay above 100</strong>
          .
        </Text>
      </>
    );
  } if (status === OutbreakStatus.Crushing) {
    return (
      <>
        <Text className="statCrushing largetext">
          {OutbreakStatus.Crushing}
          :
        </Text>
        {' '}
        <Text className="largeText">
          deaths decreased
        </Text>
        <Text className="largeText">
          {' '}
          <strong>by 50% or more</strong>
          {' '}
          OR
          {' '}
          <strong>stay below 100</strong>
          .
        </Text>
      </>
    );
  } if (status === OutbreakStatus.Winning) {
    return (
      <>
        <Text className="statWinning largetext">
          {OutbreakStatus.Winning}
          :
        </Text>
        {' '}
        <Text className="largeText">
          new deaths decreased to
        </Text>
        <Text className="largeText">
          {' '}
          <strong>below 10</strong>
          .
        </Text>
      </>
    );
  } if (status === OutbreakStatus.Won) {
    return (
      <>
        <Text className="statWon largetext">
          {OutbreakStatus.Won}
          :
        </Text>
        {' '}
        <Text className="largeText">
          we have had
        </Text>
        <Text className="largeText">
          {' '}
          <strong>no new deaths</strong>
          {' '}
          for
          {' '}
          <strong>two periods</strong>
          {' '}
          in a row.
        </Text>
      </>
    );
  }
  return '';
};

export const LegendTable = () => {
  const data = [
    {
      key: '1',
      status: 'No Outbreak',
      descr: 'There have been no deaths',
    },
    {
      key: '2',
      status: 'Small Outbreak',
      descr: 'There have been less than 10 deaths',
    },
    {
      key: '3',
      status: 'Losing',
      descr: 'Deaths rose by 100% or more or stayed above 1000',
    },
    {
      key: '4',
      status: 'Flattening the Curve',
      descr: ' Deaths did not double, but did increase or stay above 100',
    },
    {
      key: '5',
      status: 'Crushing the Curve',
      descr: 'Deaths decreased by 50% or more or to below 50',
    },
    {
      key: '6',
      status: 'Winning',
      descr: 'New deaths decreased to below 10',
    },
    {
      key: '7',
      status: 'Won',
      descr: 'We have had no new deaths for two periods',
    },
  ];
  const columns = [
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (text, row, index) => (
        <Tag
          color={calcTagstyle(text)}
          key={index}
        >
          {text}
        </Tag>
      ),
    },
    {
      title: 'Description',
      dataIndex: 'descr',
      key: 'descr',
    },
  ];

  return (
    <>
      <Paragraph>
        The items below all cover a single period, unless otherwise stated.
      </Paragraph>
      <Paragraph>
        A single period is
        {' '}
        <strong>5-days</strong>
        {' '}
        by default, though you can set your own period length when exploring the data.
      </Paragraph>
      <Paragraph>
        The Won status above only looks at deaths, and should therefore be a slight
        leading indicator compared to the Pandemic Free status in the chart below,
        which requires both no deaths and no cases.
        Pandemic Free should also decrease in the begging as outbreaks start,
        and then increase once countries successfully eradicate the virus.
      </Paragraph>
      <Table
        columns={columns}
        dataSource={data}
        pagination={false}
      />
    </>
  );
};

// export const Legend = () => (
//   <>

//     <ul>
//       <li className="statNone">
//         {getStatusInfo(OutbreakStatus.None)}
//       </li>
//       <li className="statSmall">
//         {getStatusInfo(OutbreakStatus.Small)}
//       </li>
//       <li className="statLosing">
//         {getStatusInfo(OutbreakStatus.Losing)}
//       </li>
//       <li className="statFlattening">
//         {getStatusInfo(OutbreakStatus.Flattening)}
//       </li>
//       <li className="statCrushing">
//         {getStatusInfo(OutbreakStatus.Crushing)}
//       </li>
//       <li className="statWinning">
//         {getStatusInfo(OutbreakStatus.Winning)}
//       </li>
//       <li className="statWon">
//         {getStatusInfo(OutbreakStatus.Won)}
//       </li>
//     </ul>
//   </>
// );
