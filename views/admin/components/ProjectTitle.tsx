'use client';
import { useState, useEffect } from 'react';
import { Flex, Text, Icon, useColorModeValue } from '@chakra-ui/react';
import { FiEdit } from 'react-icons/fi';
import { toast } from 'react-toastify';
import slugify from 'slugify';
import FormControl from '../../../components/FormControl';
import UpdateDocumentButtons from '../../../components/UpdateDocumentButtons';
import { useAppDispatch } from '../../../redux/hooks';
import {
  IBlogEditState,
  IEditState,
  IUpdateBlogState,
  IUpdateProductState,
} from '../../../types/updateStates';
import { IProjectTitleProps } from '../types/admin';

export default function ProjectTitle(props: IProjectTitleProps) {
  const {
    projectThunkHandler,
    targetId,
    jwtToken,
    formLabel,
    placeholder,
    buttonName,
    isLoading,
    projectTitle,
  } = props;

  const [editTitle, setEditTitle] = useState<boolean>(false);
  const [title, setTitle] = useState<string>(projectTitle);
  const [validateError, setValidateError] = useState<boolean>(false);

  const textColorPrimary = useColorModeValue('secondaryGray.900', 'white');

  const dispatch = useAppDispatch();

  //Handler for Updating Blog or Product Title
  const handleUpdateTitle = async () => {
    const slug = slugify(title, { lower: true });
    try {
      const response = await dispatch(
        projectThunkHandler({
          projectData: { id: targetId, title, slug },
          jwtToken,
        }),
      );
      if (response.payload.statusCode === 200) {
        setEditTitle(false);
        toast.success('Title updated successfully');
      }
    } catch (err) {
      toast.error('Something went wrong while updating title');
    }
  };

  useEffect(() => {
    if (title === projectTitle || !title.trim().length) {
      setValidateError(true);
    } else {
      setValidateError(false);
    }
  }, [projectTitle, title]);

  return (
    <>
      {editTitle ? (
        <Flex direction="column">
          <FormControl
            formLabel={formLabel}
            name="title"
            type="text"
            placeholder={placeholder}
            onChange={(e: any) => setTitle(e.target.value)}
            value={title}
          />
          {validateError && (
            <Text mb="10px" color="red.500" fontSize="1rem">
              Updated title is required
            </Text>
          )}
          <UpdateDocumentButtons
            isDisabled={validateError}
            name={buttonName}
            onClickCancel={() => setEditTitle(false)}
            isLoading={isLoading}
            onClickUpdate={handleUpdateTitle}
          />
        </Flex>
      ) : (
        <Flex direction="row" justify="space-between" alignItems="center">
          <Text
            color={textColorPrimary}
            fontWeight="bold"
            fontSize="2xl"
            mt="10px"
            mb="4px"
          >
            {projectTitle}
          </Text>
          <Icon
            as={FiEdit}
            width="20px"
            height="20px"
            color="inherit"
            cursor="pointer"
            onClick={() => setEditTitle(true)}
          />
        </Flex>
      )}
    </>
  );
}
