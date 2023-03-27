import React from 'react';

import GoogleMapReact from 'google-map-react';
import { useTranslation } from 'react-i18next';

import { PageTitle } from '@app/components/common/PageTitle/PageTitle';
import * as S from './maps.styles';

const GoogleMaps: React.FC = () => {
  const { t } = useTranslation();

  return (
    <>
      <PageTitle>"Pet Shop and Veterinary Station"</PageTitle>
      <S.MapsCard>
        <GoogleMapReact
          defaultCenter={{
            lat: 10.822177061143336,
            lng: 106.68683554031087,
          }}
          defaultZoom={17}
        >
      
        </GoogleMapReact>
      </S.MapsCard>
    </>
  );
};

export default GoogleMaps;
