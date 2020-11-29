import { Spin, Typography } from 'antd';
import React, { useMemo } from 'react';

import { SyncOutlined } from '@ant-design/icons';

const { Paragraph } = Typography;

export const Spinner = (): JSX.Element => {
	const antIcon = <SyncOutlined style={{ fontSize: 24 }} spin />;
	const displaySpinner = useMemo(() => {
		return (
			<div style={{ width: '100%', minHeight: '100vh' }}>
				<Paragraph style={{ textAlign: 'center', lineHeight: '100vh' }}>
					{' '}
					<Spin indicator={antIcon} />
				</Paragraph>
			</div>
		);
	}, []);
	return displaySpinner;
};
