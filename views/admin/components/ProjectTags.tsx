import React, { useCallback, useEffect, useState } from 'react';
import { Flex, useColorModeValue, Text } from '@chakra-ui/react';
import { toast } from 'react-toastify';
import Select from '../../../components/Select';
import UpdateDocumentButtons from '../../../components/UpdateDocumentButtons';
import Information from '../profile/components/Information';
import { capitalizeFirstLetter } from '../../../utils/helper';
import { useAppDispatch } from '../../../redux/hooks';
import { ISelectColorProps, ISelectProps } from '../../../types/addProduct';
import { IProjectTagsProps } from '../types/admin';

export default function ProjectTags(props: IProjectTagsProps) {
  const {
    projectThunkHandler,
    targetId,
    jwtToken,
    formLabel,
    placeholder,
    buttonName,
    isLoading,
    tagsSelect,
    projectTags,
  } = props;
  const [editTags, setEditTags] = useState<boolean>(false);
  const [tags, setTags] = useState<string[]>(projectTags);
  const [validateError, setValidateError] = useState<boolean>(false);

  const dispatch = useAppDispatch();

  const cardShadow = useColorModeValue(
    '0px 18px 40px rgba(112, 144, 176, 0.12)',
    'unset',
  );

  const handleTagsSelect = useCallback((values: ISelectProps[]) => {
    const tagValues = values.map((tag) => tag.value);
    setTags(tagValues);
  }, []);

  const handleUpdateTags = async () => {
    try {
      const response = await dispatch(
        projectThunkHandler({
          projectData: { id: targetId, tags },
          jwtToken,
        }),
      );
      if (response.payload.statusCode === 200) {
        setEditTags(false);
        toast.success('Tags updated successfully');
      }
    } catch (err) {
      toast.error('Something went wrong while updating tags');
    }
  };

  useEffect(() => {
    if (tags.length !== projectTags.length) {
      setValidateError(false);
    } else {
      const prevTags = projectTags.slice().sort();
      const updatedTags = tags.slice().sort();
      for (let i = 0; i < prevTags.length; i++) {
        if (prevTags[i] === updatedTags[i]) {
          setValidateError(true);
          return;
        }
        break;
      }
    }
    if (tags === projectTags || !tags?.length) {
      setValidateError(true);
    } else {
      setValidateError(false);
    }
  }, [tags, projectTags]);

  return (
    <>
      {editTags ? (
        <Flex direction="column">
          <Select
            formLabel={formLabel}
            multipleOpt={true}
            name="tags"
            placeholder={placeholder}
            options={tagsSelect}
            value={tags}
            onChange={(values: ISelectColorProps[]) => handleTagsSelect(values)}
          />
          {validateError && (
            <Text mb="10px" color="red.500" fontSize="1rem">
              Updated tags are required
            </Text>
          )}
          <UpdateDocumentButtons
            isDisabled={validateError}
            name={buttonName}
            onClickCancel={() => setEditTags(false)}
            isLoading={isLoading}
            onClickUpdate={handleUpdateTags}
          />
        </Flex>
      ) : (
        <Information
          boxShadow={cardShadow}
          title="Tags"
          value={projectTags.map(
            (col, index) =>
              capitalizeFirstLetter(col) +
              (index < projectTags.length - 1 ? ', ' : ''),
          )}
          edit={() => setEditTags(true)}
        />
      )}
    </>
  );
}
