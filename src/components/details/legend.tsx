import React from 'react';
import { Typography } from 'antd';
import { OutbreakStatus } from '../../types';

const { Text } = Typography;

export const getStatusInfo = (status: OutbreakStatus | undefined) => {
  if (status === OutbreakStatus.None) {
    return (
      <>
        <Text className="largeText statNone">
          <strong>
            {OutbreakStatus.None}
          </strong>
        </Text>
        <br />
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
        <Text className="largeText statSmall">
          {OutbreakStatus.Small}
          :
          {' '}
        </Text>
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
        <Text className="largeText statLosing">
          {OutbreakStatus.Losing}
          :
          {' '}
        </Text>
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
        <Text className="largeText statFlattening">
          {OutbreakStatus.Flattening}
          :
          {' '}
        </Text>
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
        <Text className="largeText statCrushing">
          {OutbreakStatus.Crushing}
          :
          {' '}
        </Text>
        <Text className="largeText">
          deaths decreased
        </Text>
        <Text className="largeText">
          {' '}
          <strong>by 50% or more</strong>
          {' '}
          OR
          {' '}
          <strong>to below 100</strong>
          .
        </Text>
      </>
    );
  } if (status === OutbreakStatus.Winning) {
    return (
      <>
        <Text className="largeText statWinning">
          {OutbreakStatus.Winning}
          :
          {' '}
        </Text>
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
        <Text className="largeText statWon">
          {OutbreakStatus.Won}
          :
          {' '}
        </Text>
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

const Legend = () => (
  <div>
    <h2>Legend</h2>
    <p>
      The itstrongs below all cover a single period, unless otherwise stated.
      A single period is
      {' '}
      <strong>5-days</strong>
      {' '}
      by default, though you can set your own period length when exploring the data.

    </p>
    <ul>
      <li className="statNone">
        {getStatusInfo(OutbreakStatus.None)}
      </li>
      <li className="statSmall">
        {getStatusInfo(OutbreakStatus.Small)}
      </li>
      <li className="statLosing">
        {getStatusInfo(OutbreakStatus.Losing)}
      </li>
      <li className="statFlattening">
        {getStatusInfo(OutbreakStatus.Flattening)}
      </li>
      <li className="statCrushing">
        {getStatusInfo(OutbreakStatus.Crushing)}
      </li>
      <li className="statWinning">
        {getStatusInfo(OutbreakStatus.Winning)}
      </li>
      <li className="statWon">
        {getStatusInfo(OutbreakStatus.Won)}
      </li>
    </ul>
  </div>
);

export default Legend;
