import React, { useEffect, useRef, useState } from 'react';
import { FilterIcon } from 'components/common/icons/FilterIcon';
import { SearchOverlay } from './searchOverlay/SearchOverlay/SearchOverlay';
import { HeaderActionWrapper } from '@app/components/header/Header.styles';
import { CategoryComponents } from '@app/components/header/components/HeaderSearch/HeaderSearch';
import { Btn, InputSearch } from '../HeaderSearch/HeaderSearch.styles';
import { useTranslation } from 'react-i18next';
import { Dropdown } from '@app/components/common/Dropdown/Dropdown';

interface SearchOverlayProps {
  query: string;
  setQuery: (query: string) => void;
  data: CategoryComponents[] | null;
  isOverlayVisible: boolean;
  setOverlayVisible: (state: boolean) => void;
}

export const SearchDropdown: React.FC<SearchOverlayProps> = ({
  query,
  setQuery,
  data,
  isOverlayVisible,
  setOverlayVisible,
}) => {
  const [isFilterVisible, setFilterActive] = useState(false);

  const { t } = useTranslation();

  useEffect(() => {
    setOverlayVisible(!!query || isFilterVisible);
  }, [query, isFilterVisible, setOverlayVisible]);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const ref = useRef<any>(null);

  return (
    <>
      <Dropdown
        {...((!!data || isFilterVisible) && { trigger: ['click'], onVisibleChange: setOverlayVisible })}
        overlayClassName="search-dropdown"
        overlay={<SearchOverlay data={data} isFilterVisible={isFilterVisible} />}
        visible={isOverlayVisible}
        getPopupContainer={() => ref.current}
      >
        <HeaderActionWrapper>
          <div ref={ref} />
        </HeaderActionWrapper>
      </Dropdown>
    </>
  );
};
