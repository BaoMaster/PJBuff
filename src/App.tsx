import React, { useEffect } from 'react';
import { ConfigProvider } from 'antd';
import viVN from 'antd/lib/locale/vi_VN';
import enUS from 'antd/lib/locale/en_US';
import Stomp from 'stompjs';
import SockJS from 'sockjs-client';
import GlobalStyle from './styles/GlobalStyle';
import 'typeface-montserrat';
import 'typeface-lato';
import { AppRouter } from './components/router/AppRouter';
import { useLanguage } from './hooks/useLanguage';
import { useAutoNightMode } from './hooks/useAutoNightMode';
import { usePWA } from './hooks/usePWA';
import { useThemeWatcher } from './hooks/useThemeWatcher';
import { useAppSelector } from './hooks/reduxHooks';
import { themeObject } from './styles/themes/themeVariables';

const App: React.FC = () => {
  const { language } = useLanguage();
  const theme = useAppSelector((state) => state.theme.theme);

  usePWA();

  useAutoNightMode();

  useThemeWatcher();
  useEffect(() => {
    const UserData = localStorage.getItem('UserData');
    const userInfo = JSON.parse(UserData);
    const AccessToken = localStorage.getItem('AccessToken');
    if (AccessToken && userInfo) {
      const socket = new SockJS('http://localhost:8081/system/ws');
      const stompClient = Stomp.over(socket);
      stompClient.connect({ Authorization: AccessToken, userId: userInfo?.id }, function (frame: any) {
        console.log('Connected: ' + frame);
        console.log(userInfo?.topicId);
        if (userInfo.topicId) stompClient.subscribe(`/topic/user/${userInfo?.topicId}`, {}, () => console.log('ccc'));
      });
    }
  }, [localStorage.getItem('UserData'), localStorage.getItem('AccessToken')]);

  return (
    <>
      <meta name="theme-color" content={themeObject[theme].primary} />
      <GlobalStyle />
      <ConfigProvider locale={language === 'en' ? enUS : viVN}>
        <AppRouter />
      </ConfigProvider>
    </>
  );
};

export default App;
