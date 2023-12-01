import { Crud } from './types';
import { ModalPortal } from './ModalPortal';
import Close from '../helper/images/close.png';

interface DetailedInformationModalProps {
  selectedTabInfo: Crud | null;
  closeClickOnCard: () => void;

  isOpen: boolean
}

export const DetailedInformationModal: React.FC<DetailedInformationModalProps> = ({
  selectedTabInfo,
  isOpen,

  closeClickOnCard
}) => {

  return (
    <ModalPortal onClose={closeClickOnCard} isOpen={isOpen && !!selectedTabInfo}>

      <div className="modal-content">

        <div className="modal-content__header">
          <h4>ID: {selectedTabInfo?.id}</h4>
          <img
            src={Close}
            className="closeEl"
            onClick={closeClickOnCard}
            data-dismiss="modal"
            alt=''
          />
        </div>

        <h1 modal-content__title>
          {selectedTabInfo?.title}
        </h1>

        <div className="containerTextImage">
          <img
            className="containerTextImage__image"
            src={selectedTabInfo?.image}
            alt=""
          />
          <p className="containerTextImage__text">
            {selectedTabInfo?.text}
          </p>
        </div>
      </div>
    </ModalPortal>
  );
}
