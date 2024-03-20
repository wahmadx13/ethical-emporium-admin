import { Button, Box, useColorMode } from '@chakra-ui/react';
import { IUpdateDocumentButtonsProps } from '../../types/updateDocumentButtons';

function UpdateDocumentButtons(props: IUpdateDocumentButtonsProps) {
  const { isLoading, name, onClickCancel, onClickUpdate, isDisabled } = props;
  const { colorMode } = useColorMode();
  return (
    <Box
      display="flex"
      alignContent="center"
      width="fit-content"
      marginBottom="2rem"
    >
      <Button
        display="flex"
        alignItems="center"
        border="1px"
        borderRadius="1rem"
        padding="0.5rem"
        width="fit-content"
        borderColor={colorMode === 'dark' ? '#e5e7eb' : '#9ca3af'}
        onClick={onClickCancel}
      >
        Cancel
      </Button>
      <Button
        isDisabled={isDisabled}
        isLoading={isLoading}
        variant="brand"
        fontWeight="500"
        type="submit"
        marginLeft="0.5rem"
        onClick={onClickUpdate}
      >
        {`Update ${name}`}
      </Button>
    </Box>
  );
}

export default UpdateDocumentButtons;
