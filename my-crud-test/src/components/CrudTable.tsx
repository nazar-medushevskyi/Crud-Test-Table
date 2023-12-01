// CrudTable.tsx
import React from 'react';
import { Crud } from './types';
import { CrudTableRow } from './CrudTableRow';
import { TABLE_HEADERS_CONFIG } from '../helper/constants/ConstsHelp';

interface CrudTableProps {
  tabs: Crud[];
  clickOnCard: (tab: Crud) => void;
  handleDelete: (id: number) => void;
  openModalEdit: (id: number) => void;
}

export const CrudTable: React.FC<CrudTableProps> = ({ tabs, clickOnCard, handleDelete, openModalEdit }) => {
  return (
    <div className="table-container">
      <table className="table">
        <thead className="header">
          <tr>
            {TABLE_HEADERS_CONFIG.map((el) => (
              <th key={el.id} scope="col">{el.text}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {tabs.map((el) => (
            <CrudTableRow key={el.id} tab={el} clickOnCard={clickOnCard} handleDelete={handleDelete} openModalEdit={openModalEdit} />
          ))}
        </tbody>
      </table>
    </div>
  );
};
