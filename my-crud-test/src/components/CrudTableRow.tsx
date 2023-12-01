import React from 'react';
import { Crud } from './types';
import Bin from '../helper/images/bin.png';
import Pencil from '../helper/images/pencil-svgrepo-com.png';

interface CrudTableRowProps {
  tab: Crud;
  clickOnCard: (tab: Crud) => void;
  handleDelete: (id: number) => void;
  openModalEdit: (id: number) => void;
}

export const CrudTableRow: React.FC<CrudTableRowProps> = (
  {
    tab,

    clickOnCard,
    handleDelete,
    openModalEdit
  }) => {

  return (
    <tr
      key={tab.id}
      data-toggle="modal"
      data-target=".bd-example-modal-lg"
      onClick={() => clickOnCard(tab)}
    >
      <th className="indentation" scope="row">
        {tab.id}
      </th>

      <td>
        <img className="tab__image" src={tab.image} alt="" />
      </td>

      <td className="indentation">{tab.title}</td>
      <td className="indentation">{tab.text}</td>
      
      <td className="indentation" onClick={(e) => e.stopPropagation()}>
        <div className="container-images">
          <button className='btn' onClick={() => openModalEdit(tab.id)}>
            <img className='image-pencil' src={Pencil} alt="Pencil" />
          </button>
          <button className="btn" onClick={() => handleDelete(tab.id)}>
            <img className='image-bin' src={Bin} alt="Basket" />
          </button>
        </div>
      </td>
    </tr>
  );
};
