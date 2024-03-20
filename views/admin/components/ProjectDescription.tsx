import { useState, useEffect } from 'react';
import { Flex, Icon, Text, useColorModeValue } from '@chakra-ui/react';
import { FiEdit } from 'react-icons/fi';
import { toast } from 'react-toastify';
import RichTextEditor from '../../../components/RichTextEditor';
import Card from '../../../components/card/Card';
import UpdateDocumentButtons from '../../../components/UpdateDocumentButtons';
import { useAppDispatch } from '../../../redux/hooks';
import { IProjectDescriptionProps } from '../types/admin';

export default function ProjectDescription(props: IProjectDescriptionProps) {
  const {
    projectThunkHandler,
    targetId,
    jwtToken,
    formLabel,
    placeholder,
    buttonName,
    isLoading,
    projectDescription,
  } = props;

  const dispatch = useAppDispatch();

  //React States
  const [editDescription, setEditDescription] = useState<boolean>(false);
  const [description, setDescription] = useState<string>(projectDescription);
  const [validateError, setValidateError] = useState<boolean>(false);

  const bg = useColorModeValue('white', 'navy.700');
  const textColorSecondary = 'gray.400';

  //Handler for updating description in db
  const handleUpdateDescription = async () => {
    try {
      const response = await dispatch(
        projectThunkHandler({
          projectData: { id: targetId, description },
          jwtToken,
        }),
      );
      if (response.payload.statusCode === 200) {
        setEditDescription(false);
        toast.success('Description updated successfully');
      }
    } catch (err) {
      toast.error('Something went wrong while updating description');
    }
  };

  //Checking for validation errors
  useEffect(() => {
    if (
      description?.replace(/\s+/g, '')?.replace(/\\+/g, '') ===
        projectDescription.replace(/\s+/g, '')?.replace(/\\+/g, '') ||
      !description?.trim().length
    ) {
      setValidateError(true);
    } else {
      setValidateError(false);
    }
  }, [description, projectDescription, validateError]);

  return (
    <>
      {editDescription ? (
        <Flex direction="column">
          <RichTextEditor
            formLabel={formLabel}
            placeholder={placeholder}
            setDescription={setDescription}
            value={description}
          />
          {validateError && (
            <Text mb="10px" mt="0px" color="red.500" fontSize="1rem">
              Updated description is required
            </Text>
          )}
          <UpdateDocumentButtons
            isDisabled={validateError}
            name={buttonName}
            onClickCancel={() => setEditDescription(false)}
            isLoading={isLoading}
            onClickUpdate={handleUpdateDescription}
          />
        </Flex>
      ) : (
        <Card bg={bg} marginBottom="1.5rem">
          <Flex direction="row" justify="space-between" alignItems="center">
            <Text
              color={textColorSecondary}
              fontSize="md"
              me="26px"
              mb="40px"
              width="100%"
              dangerouslySetInnerHTML={{ __html: projectDescription }}
            />
            <Icon
              as={FiEdit}
              width="20px"
              height="20px"
              color="inherit"
              cursor="pointer"
              onClick={() => setEditDescription(true)}
            />
          </Flex>
        </Card>
      )}
    </>
  );
}
