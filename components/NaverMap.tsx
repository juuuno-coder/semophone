'use client';

import { useEffect, useRef, useState } from 'react';
import { Store } from '@/data/stores';

interface NaverMapProps {
  stores: Store[];
  userLocation: { lat: number; lng: number } | null;
  onStoreClick?: (store: Store) => void;
  focusRegion?: boolean; // 세분화 지역 선택 시 해당 지역만 집중
}

export default function NaverMap({ stores, userLocation, onStoreClick, focusRegion = false }: NaverMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<any>(null);
  const [markers, setMarkers] = useState<any[]>([]);
  const [isMapLoaded, setIsMapLoaded] = useState(false);
  const infoWindowsRef = useRef<any[]>([]);

  // 네이버 Maps API 스크립트 로드
  useEffect(() => {
    const clientId = process.env.NEXT_PUBLIC_NAVER_MAP_CLIENT_ID;

    if (!clientId) {
      console.error('네이버 Maps API Client ID가 설정되지 않았습니다.');
      return;
    }

    if (window.naver && window.naver.maps) {
      setIsMapLoaded(true);
      return;
    }

    const script = document.createElement('script');
    script.src = `https://oapi.map.naver.com/openapi/v3/maps.js?ncpKeyId=${clientId}`;
    script.async = true;
    script.onload = () => setIsMapLoaded(true);
    document.head.appendChild(script);

    return () => {
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
    };
  }, []);

  // 지도 초기화
  useEffect(() => {
    if (!isMapLoaded || !mapRef.current || map) return;

    const naver = window.naver;
    const center = userLocation
      ? new naver.maps.LatLng(userLocation.lat, userLocation.lng)
      : new naver.maps.LatLng(37.5665, 126.9780); // 서울 시청 기본 좌표

    const mapOptions = {
      center: center,
      zoom: userLocation ? 13 : 11,
      zoomControl: true,
      zoomControlOptions: {
        position: naver.maps.Position.TOP_RIGHT,
      },
      mapTypeControl: true,
    };

    const newMap = new naver.maps.Map(mapRef.current, mapOptions);
    setMap(newMap);
  }, [isMapLoaded, userLocation, map]);

  // 매장 상세 모달 열기 전역 함수 등록
  useEffect(() => {
    if (!onStoreClick) return;

    // 전역 함수로 등록하여 infoWindow HTML에서 호출 가능하게
    (window as any).openStoreDetailById = (storeId: number) => {
      const store = stores.find(s => s.id === storeId);
      if (store && onStoreClick) {
        onStoreClick(store);
      }
    };

    return () => {
      delete (window as any).openStoreDetailById;
    };
  }, [stores, onStoreClick]);

  // 매장 마커 표시
  useEffect(() => {
    if (!map || !window.naver) return;

    const naver = window.naver;

    // 기존 마커 제거
    markers.forEach((marker) => marker.setMap(null));

    const newMarkers: any[] = [];

    // 매장 마커 생성
    stores.forEach((store) => {
      const marker = new naver.maps.Marker({
        position: new naver.maps.LatLng(store.lat, store.lng),
        map: map,
        title: store.name,
        icon: {
          content: `
            <div style="
              display: flex;
              align-items: center;
              gap: 6px;
              background: #FEE500;
              color: black;
              padding: 8px 12px;
              border-radius: 20px;
              font-size: 13px;
              font-weight: bold;
              box-shadow: 0 4px 12px rgba(242, 200, 17, 0.4);
              white-space: nowrap;
              cursor: pointer;
              border: 2px solid white;
            ">
              <img
                src="/icons/세모폰 기본.png"
                alt="세모폰"
                style="width: 24px; height: 24px; object-fit: contain;"
                onerror="this.style.display='none'"
              />
              <span style="text-shadow: 0 1px 2px rgba(255,255,255,0.3);">${store.name}</span>
            </div>
          `,
          anchor: new naver.maps.Point(60, 30),
        },
      });

      // 정보창 생성
      const kakaoLink = store.kakaoLink || 'https://pf.kakao.com/_MvxaTn';

      const infoWindow = new naver.maps.InfoWindow({
        content: `
          <div style="padding: 15px; min-width: 240px;">
            <h3 style="font-size: 16px; font-weight: bold; margin-bottom: 8px; color: #000000;">
              ${store.name}
            </h3>
            <p style="font-size: 13px; color: #666; margin-bottom: 6px;">
              📍 ${store.address}
            </p>
            <p style="font-size: 13px; color: #666; margin-bottom: 10px;">
              📞 ${store.phone}
            </p>
            <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 6px;">
              <div onclick="window.openStoreDetailById(${store.id})"
                   style="background: #FEE500; color: black; padding: 8px;
                          border-radius: 8px; text-align: center;
                          font-size: 11px; font-weight: bold; cursor: pointer;
                          transition: all 0.2s ease;">
                매장안내
              </div>
              <a href="https://map.naver.com/v5/directions/-/-/${store.lng},${store.lat},${encodeURIComponent(store.name)}"
                 target="_blank" rel="noopener noreferrer"
                 style="background: #03C75A; color: white; padding: 8px;
                        border-radius: 8px; text-align: center; text-decoration: none;
                        font-size: 11px; font-weight: bold;
                        transition: all 0.2s ease;">
                길찾기
              </a>
              <a href="${kakaoLink}"
                 target="_blank" rel="noopener noreferrer"
                 style="background: #FEE500; color: black; padding: 8px;
                        border-radius: 8px; text-align: center; text-decoration: none;
                        font-size: 11px; font-weight: bold;
                        display: flex; align-items: center; justify-content: center;
                        transition: all 0.2s ease;">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C6.5 2 2 6.1 2 11c0 3.2 2.1 6 5.2 7.5-.2.8-.7 2.7-.8 3 0 .3.1.5.3.6.2.1.4 0 .6-.1.3-.1 3.5-2.3 4.1-2.8.8.1 1.5.2 2.3.2 5.5 0 10-4.1 10-9S17.5 2 12 2z"/>
                </svg>
              </a>
            </div>
          </div>
        `,
        borderWidth: 0,
        disableAnchor: true,
        backgroundColor: 'white',
        borderColor: '#e0e0e0',
        borderRadius: '8px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
      });

      // InfoWindow 참조 저장
      infoWindowsRef.current.push(infoWindow);

      // 마커 클릭 이벤트
      naver.maps.Event.addListener(marker, 'click', (e: any) => {
        // 이벤트 전파 방지
        if (e.domEvent) {
          e.domEvent.stopPropagation();
        }

        // 다른 모든 InfoWindow 닫기
        infoWindowsRef.current.forEach(iw => {
          if (iw && iw !== infoWindow) {
            iw.close();
          }
        });

        // 현재 InfoWindow 토글
        if (infoWindow.getMap()) {
          infoWindow.close();
        } else {
          infoWindow.open(map, marker);
        }
      });

      newMarkers.push(marker);
    });

    // 사용자 위치 마커
    if (userLocation) {
      const userMarker = new naver.maps.Marker({
        position: new naver.maps.LatLng(userLocation.lat, userLocation.lng),
        map: map,
        icon: {
          content: `
            <div style="
              width: 20px;
              height: 20px;
              background: #4285F4;
              border: 3px solid white;
              border-radius: 50%;
              box-shadow: 0 2px 6px rgba(0,0,0,0.3);
            "></div>
          `,
          anchor: new naver.maps.Point(10, 10),
        },
      });
      newMarkers.push(userMarker);
    }

    setMarkers(newMarkers);
  }, [map, stores, userLocation, onStoreClick]);

  // 지도 범위 조정
  useEffect(() => {
    if (!map || !window.naver || stores.length === 0) return;

    const naver = window.naver;
    const bounds = new naver.maps.LatLngBounds();

    stores.forEach((store) => {
      bounds.extend(new naver.maps.LatLng(store.lat, store.lng));
    });

    // focusRegion이 false일 때만 사용자 위치를 bounds에 포함
    if (userLocation && !focusRegion) {
      bounds.extend(new naver.maps.LatLng(userLocation.lat, userLocation.lng));
    }

    // focusRegion이 true일 때는 padding을 늘려서 더 확대
    const padding = focusRegion
      ? { top: 60, right: 60, bottom: 60, left: 60 }
      : { top: 80, right: 80, bottom: 80, left: 80 };

    map.fitBounds(bounds, padding);
  }, [map, stores, userLocation, focusRegion]);

  // 지도 클릭 시 모든 InfoWindow 닫기
  useEffect(() => {
    if (!map || !window.naver) return;

    const naver = window.naver;

    // 지도 클릭 이벤트 리스너 등록
    const mapClickListener = naver.maps.Event.addListener(
      map,
      'click',
      () => {
        // 모든 InfoWindow 닫기
        infoWindowsRef.current.forEach(infoWindow => {
          if (infoWindow) {
            infoWindow.close();
          }
        });
      }
    );

    // 클린업: 컴포넌트 언마운트 시 이벤트 리스너 제거
    return () => {
      naver.maps.Event.removeListener(mapClickListener);
    };
  }, [map]);

  if (!isMapLoaded) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-brand/5 to-primary-hover/5 rounded-xl">
        <div className="text-center">
          <div className="relative w-24 h-24 mx-auto mb-6">
            <img
              src="/images/logo/기본로고.png"
              alt="세모폰 로고"
              className="w-full h-full object-contain animate-pulse"
            />
          </div>
          <div className="flex items-center justify-center gap-2 mb-3">
            <div className="w-3 h-3 bg-brand rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
            <div className="w-3 h-3 bg-brand rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
            <div className="w-3 h-3 bg-brand rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
          </div>
          <p className="text-gray-700 font-medium">지도를 불러오는 중...</p>
        </div>
      </div>
    );
  }

  return (
    <div
      ref={mapRef}
      className="w-full h-full rounded-xl overflow-hidden shadow-lg"
      style={{ minHeight: '400px' }}
    />
  );
}
