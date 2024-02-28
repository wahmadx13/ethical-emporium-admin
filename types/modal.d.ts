export interface IModalProps {
    modalTitle: string;
    modalBody: string;
    isOpen: boolean;
    onClose: () => void;
    onDelete: () => void;
    isLoading: boolean;
}