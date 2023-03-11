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
import { ValidationForm } from '@app/components/forms/ValidationForm/ValidationForm';

const Dashboard: React.FC = () => {
  const [news, setNews] = useState<any[]>([]);
  const [hasMore] = useState<boolean>(true);
  const [loaded, setLoaded] = useState<boolean>(false);
  const { t } = useTranslation();
  useEffect(() => {
    getAllData();
  }, []);

  const getAllData = () => {
    setLoaded(true);
    ConfigSetting.getNewFeed(news[news.length - 1]?.pid || 0).then((data: any) => {
      setNews((oldNews) => [...oldNews, ...data.body.posts]);
      setLoaded(false);
    });
  };

  const getnew = () => {
    setLoaded(true);
    ConfigSetting.getNewFeed(0).then((data: any) => {
      setNews(data.body.posts);
      setLoaded(false);
    });
  };
  const next = () => {
    getAllData();
  };

  return (
    <>
      <s.TablesWrapper>
        <s.Card title="Upload Post">
          <Row style={{ width: '100%', margin: '-30px 0px' }}>
            <ValidationForm getnew={getnew} />
          </Row>
        </s.Card>
        <s.Card title="Please adopt a cat ❤️">
          <Row style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
            <NewsFilter news={news}>
              {({ filteredNews }) =>
                filteredNews?.length || !loaded ? (
                  <Feed next={next} hasMore={hasMore}>
                    {filteredNews.map((post, index) => (
                      <ArticleCard
                        key={index}
                        title={post.sid}
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
          </Row>
        </s.Card>
      </s.TablesWrapper>
    </>
  );
};

export default Dashboard;
