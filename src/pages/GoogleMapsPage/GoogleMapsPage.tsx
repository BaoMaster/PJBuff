import React from 'react';

import GoogleMapReact from 'google-map-react';

import { PageTitle } from '@app/components/common/PageTitle/PageTitle';
import * as S from './maps.styles';

const GoogleMaps: React.FC = () => {
  const infowindow = new google.maps.InfoWindow({
    content:
      '<div id="content">' +
      '<div id="siteNotice">' +
      '</div>' +
      '<h1 id="firstHeading" class="firstHeading" style="color: black;">IUH</h1>' +
      '</div>',
  });
  const infowindow2 = new google.maps.InfoWindow({
    content:
      '<div id="content">' +
      '<div id="siteNotice">' +
      '</div>' +
      '<h1 id="firstHeading" class="firstHeading" style="color: black;">Cửa hàng thức ăn thú cưng Pet Likes</h1>' +
      '</div>',
  });
  const infowindow3 = new google.maps.InfoWindow({
    content:
      '<div id="content">' +
      '<div id="siteNotice">' +
      '</div>' +
      '<h1 id="firstHeading" class="firstHeading" style="color: black;">Bác Sĩ Thú Y</h1>' +
      '</div>',
  });
  const infowindow4 = new google.maps.InfoWindow({
    content:
      '<div id="content">' +
      '<div id="siteNotice">' +
      '</div>' +
      '<h1 id="firstHeading" class="firstHeading" style="color: black;">Tiệm Nhà Sâu</h1>' +
      '</div>',
  });
  const infowindow5 = new google.maps.InfoWindow({
    content:
      '<div id="content">' +
      '<div id="siteNotice">' +
      '</div>' +
      '<h1 id="firstHeading" class="firstHeading" style="color: black;">Tiệm Thú Cưng - Pet VN</h1>' +
      '</div>',
  });
  const infowindow6 = new google.maps.InfoWindow({
    content:
      '<div id="content">' +
      '<div id="siteNotice">' +
      '</div>' +
      '<h1 id="firstHeading" class="firstHeading" style="color: black;">Kiki Puppey Dịch Vụ, Thức ăn, Chăm Sóc Thú Cưng</h1>' +
      '</div>',
  });
  const infowindow7 = new google.maps.InfoWindow({
    content:
      '<div id="content">' +
      '<div id="siteNotice">' +
      '</div>' +
      '<h1 id="firstHeading" class="firstHeading" style="color: black;">Choowie Pet Shop</h1>' +
      '</div>',
  });
  const infowindow8 = new google.maps.InfoWindow({
    content:
      '<div id="content">' +
      '<div id="siteNotice">' +
      '</div>' +
      '<h1 id="firstHeading" class="firstHeading" style="color: black;">Pet House - Spa Chăm Sóc Làm Đẹp Chó Mèo Giá Rẻ Tại Bình Thạnh</h1>' +
      '</div>',
  });
  const renderMarkers = (map: any, maps: any) => {
    const marker = new maps.Marker({
      position: { lat: 10.822177061143336, lng: 106.68683554031087 },
      map,
      title: 'IUH',
    });

    const marker2 = new maps.Marker({
      position: { lat: 10.819549976998982, lng: 106.68300492634789 },
      map,
      title: 'Cửa hàng thức ăn thú cưng Pet Likes',
    });

    const marker3 = new maps.Marker({
      position: { lat: 10.82281746092701, lng: 106.68575211854676 },
      map,
      title: 'Bác Sĩ Thú Y',
    });

    const marker4 = new maps.Marker({
      position: { lat: 10.819968208084344, lng: 106.6896903790092 },
      map,
      title: 'Tiệm Nhà Sâu',
    });

    const marker5 = new maps.Marker({
      position: { lat: 10.820975045636674, lng: 106.69377684783682 },
      map,
      title: 'Tiệm Thú Cưng - Pet VN',
    });

    const marker6 = new maps.Marker({
      position: { lat: 10.82354833575151, lng: 106.69024769363888 },
      map,
      title: 'Kiki Puppey Dịch Vụ, Thức ăn, Chăm Sóc Thú Cưng',
    });

    const marker7 = new maps.Marker({
      position: { lat: 10.816749594737194, lng: 106.68822303405939 },
      map,
      title: 'Choowie Pet Shop',
    });

    const marker8 = new maps.Marker({
      position: { lat: 10.812796422391976, lng: 106.68686047190828 },
      map,
      title: 'Pet House - Spa Chăm Sóc Làm Đẹp Chó Mèo Giá Rẻ Tại Bình Thạnh',
    });
  };

  return (
    <>
      <PageTitle>Pet Shop and Veterinary Station</PageTitle>
      <S.MapsCard>
        <GoogleMapReact
          defaultCenter={{
            lat: 10.822177061143336,
            lng: 106.68683554031087,
          }}
          bootstrapURLKeys={{ key: 'lmao' }}
          defaultZoom={17}
          onGoogleApiLoaded={({ map, maps }) => renderMarkers(map, maps)}
        ></GoogleMapReact>
      </S.MapsCard>
    </>
  );
};

export default GoogleMaps;
