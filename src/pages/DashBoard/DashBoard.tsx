import React, { useEffect, useState } from 'react';
import { Button, Col, Row, DatePicker, Space, Empty } from 'antd';
import { Table } from 'components/common/Table/Table';
import { useTranslation } from 'react-i18next';
import { PageTitle } from '@app/components/common/PageTitle/PageTitle';
import * as S from '@app/pages/uiComponentsPages//UIComponentsPage.styles';

import ConfigSetting from './DashBoardService';

import type { DatePickerProps, RangePickerProps } from 'antd/es/date-picker';
import { Card } from 'components/common/Card/Card';
import * as s from './Tables.styles';
import moment from 'moment';
import { ColumnsType } from 'antd/es/table';
import { ArticleCard } from '@app/components/common/ArticleCard/ArticleCard';
import { NewsFilter } from '@app/components/apps/newsFeed/NewsFilter/NewsFilter';
import { Feed } from '@app/components/common/Feed/Feed';

const Dashboard: React.FC = () => {
  const [news, setNews] = useState<any[]>([]);
  const [hasMore] = useState<boolean>(true);
  const [loaded, setLoaded] = useState<boolean>(false);

  useEffect(() => {
    getAllData();
  }, []);

  const getAllData = () => {
    setLoaded(true);
    ConfigSetting.getNewFeed().then((data: any) => {
      setNews(data.body.posts);
      setLoaded(false);
    });
  };

  const next = () => {
    getAllData();
  };

  return (
    <NewsFilter news={news}>
      {({ filteredNews }) =>
        filteredNews?.length || !loaded ? (
          <Feed next={next} hasMore={hasMore}>
            {filteredNews.map((post, index) => (
              <ArticleCard
                key={index}
                title={post.pid}
                description={post.content}
                date={post.date}
                imgUrl={post.listImgPath}
                author={post.sid}
                avatar={post.avatarUrl}
              />
            ))}
          </Feed>
        ) : (
          <Empty />
        )
      }
    </NewsFilter>
  );
};

export default Dashboard;
