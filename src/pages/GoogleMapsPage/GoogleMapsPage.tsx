import React from 'react';

import GoogleMapReact from 'google-map-react';
import { withGoogleMap, withScriptjs, GoogleMap } from 'react-google-maps';
import { useTranslation } from 'react-i18next';

import { PageTitle } from '@app/components/common/PageTitle/PageTitle';
import * as S from './maps.styles';

const GoogleMaps: React.FC = () => {
  const { t } = useTranslation();
  const renderMarkers = (map: any, maps: any) => {
    let marker = new maps.Marker({
      position: { lat: 10.822177061143336, lng: 106.68683554031087 },
      map,
      title: 'IUH',
    });
    let marker2 = new maps.Marker({
      position: { lat: 10.819549976998982, lng: 106.68300492634789 },
      map,
      title: 'Cửa hàng thức ăn thú cưng Pet Likes',
    });
    let marker3 = new maps.Marker({
      position: { lat: 10.82281746092701, lng: 106.68575211854676 },
      map,
      title: 'Bác Sĩ Thú Y',
    });
    let marker4 = new maps.Marker({
      position: { lat: 10.819968208084344, lng: 106.6896903790092 },
      map,
      title: 'Tiệm Nhà Sâu',
    });
  };
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
          onGoogleApiLoaded={({ map, maps }) => renderMarkers(map, maps)}
        ></GoogleMapReact>
      </S.MapsCard>
    </>
  );
};

export default GoogleMaps;
