import React from 'react';
import { Typography } from 'antd';
import { OutbreakStatus } from '@types';

const { Text } = Typography;

const Status = (status: OutbreakStatus) => {
  if (!status) return '';
  let statusString;
  if (status === OutbreakStatus.None) {
    statusString = (
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
    statusString = (
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
    statusString = (
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
    statusString = (
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
    statusString = (
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
    statusString = (
      <>
        getStatusInfo
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
    statusString = (
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
  console.log(statusString);
  return statusString;
};

export default Status;
