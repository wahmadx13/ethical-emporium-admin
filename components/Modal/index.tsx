import {
  Modal as ChakraModal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  useColorMode,
} from '@chakra-ui/react';
import { IModalProps } from '../../types/modal';

export default function Modal(props: IModalProps) {
  const { modalTitle, modalBody, isOpen, onClose, onDelete, isLoading } = props;
  const { colorMode } = useColorMode();
  return (
    <>
      <ChakraModal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{modalTitle}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>{modalBody}</ModalBody>
          <ModalFooter>
            <Button
              bg={colorMode === 'dark' ? '#f43f5e' : '#be185d'}
              textColor={colorMode === 'light' && '#e5e7eb'}
              mr={3}
              onClick={onDelete}
              isLoading={isLoading}
              isDisabled={isLoading}
            >
              Delete
            </Button>
            <Button variant="ghost" onClick={onClose}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </ChakraModal>
    </>
  );
}
