import React from 'react';
import { BasicTable } from '../BasicTable/BasicTable';
import { useTranslation } from 'react-i18next';
import * as S from './Tables.styles';

export const UserManagement: React.FC = () => {
  const { t } = useTranslation();
  return (
    <>
      <S.TablesWrapper>
        <S.Card id="basic-table" title={"User Management"} padding="1.25rem 1.25rem 0">
          <BasicTable />
        </S.Card>
      </S.TablesWrapper>
    </>
  );
};
