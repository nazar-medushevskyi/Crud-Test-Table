import { useCallback, useEffect, useMemo, useState } from "react";
import { Header } from './components/Header';
import { CrudTable } from './components/CrudTable';
import { Crud } from './components/types';
import { CrudModalAddEdit } from './components/CrudModal';
import { DetailedInformationModal } from './components/DetailedInformationModal';
import { createItem, deleteItem, editItem, fetchData } from './api';
import { emptyObject } from './helper/constants/ConstsHelp';
import { getErrorText } from './helper/utils/index';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

enum ModalState {
  add = 'add',
  edit = 'edit',
  preview = 'preview',
  disabled = 'disabled',
}

export const App: React.FC = () => {
  const [modalState, setModalState] = useState(ModalState.disabled)

  const [items, setItems] = useState<Crud[]>([]);

  const [title, setTitle] = useState('');
  const [text, setText] = useState('');

  const [selectedItemId, setSelectedItemId] = useState<number | null>(null);

  const [error, setError] = useState('');

  const clearForm = useCallback(() => {
    setText('');
    setTitle('');
    setError('');
  }, [])

  const closeModal = useCallback(() => {
    clearForm();

    setSelectedItemId(null);
    setModalState(ModalState.disabled)
  }, [])

  const clickOnCard = (tab: Crud) => {
    setSelectedItemId(tab.id);

    setModalState(ModalState.preview)
  };

  useEffect(() => {
    const fetchItems = async () => {
      const data = await fetchData();
      if (data) {
        setItems(data);
      }
    };

    fetchItems();
  }, []);

  const handleSubmit = async () => {
    const error = getErrorText(text);

    if (error) {
      setError(error)

      return;
    }

    const newItem = {
      title,
      text,
      ...emptyObject
    }

    const post = await createItem(newItem)

    if (!post) return

    setItems(prev => [post, ...prev])

    closeModal()
  };


  const handleSubmitEdit = async () => {
    const error = getErrorText(text);

    if (error) {
      setError(error)

      return
    }

    if (!selectedItemId) return

    const response = await editItem(
      {
        id: selectedItemId,
        title,
        text
      });

    setItems(prev => prev.map(el => el.id === response.id ? response : el))

    closeModal()
  };

  const handleDelete = async (id: number) => {
    const deletedId = await deleteItem(id)

    if (!deletedId) return

    setItems((prevTabs) => prevTabs.filter((tab) => tab.id !== deletedId));
  };

  const openModalAdd = () => {
    setModalState(ModalState.add)
  }

  const openModalEdit = (id: number) => {
    setSelectedItemId(id);

    const selectedItem = items.find((tab) => tab.id === id);

    if (!selectedItem) return;

    setTitle(selectedItem.title);
    setText(selectedItem.text);

    setModalState(ModalState.edit)
  };

  const commonModalProps = useMemo(() => ({
    addNewTitle: title,
    addNewText: text,
    error,
    setAddNewText: setText,
    setAddNewTitle: setTitle,
  }), [title, text, error]);

  return (
    <>
      <Header openModalAdd={openModalAdd} />

      <CrudTable
        tabs={items}
        clickOnCard={clickOnCard}
        handleDelete={handleDelete}
        openModalEdit={openModalEdit}
      />

      <CrudModalAddEdit
        title='Create'
        action='Create'
        isOpen={modalState === ModalState.add}
        onSubmit={handleSubmit}
        onClose={closeModal}
        {...commonModalProps}
      />

      <CrudModalAddEdit
        title='Edit'
        action='Save'
        isOpen={modalState === ModalState.edit}
        onSubmit={handleSubmitEdit}
        onClose={closeModal}

        {...commonModalProps}
      />

      <DetailedInformationModal
        isOpen={modalState === ModalState.preview}
        selectedTabInfo={items.find(el => el.id === selectedItemId) ?? null}
        closeClickOnCard={closeModal}
      />

    </>
  );
}
