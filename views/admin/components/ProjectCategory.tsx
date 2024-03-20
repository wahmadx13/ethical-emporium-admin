import React, { useCallback, useEffect, useState } from 'react';
import { Flex, useColorModeValue, Text } from '@chakra-ui/react';
import Select from '../../../components/Select';
import { toast } from 'react-toastify';
import UpdateDocumentButtons from '../../../components/UpdateDocumentButtons';
import Information from '../profile/components/Information';
import { capitalizeFirstLetter } from '../../../utils/helper';
import { useAppDispatch } from '../../../redux/hooks';
import { ISelectProps } from '../../../types/addProduct';
import { IProjectCategoryProps } from '../types/admin';

export default function ProjectCategory(props: IProjectCategoryProps) {
  const {
    projectThunkHandler,
    targetId,
    jwtToken,
    formLabel,
    placeholder,
    buttonName,
    isLoading,
    categoryOptions,
    projectCategoryTitle,
  } = props;
  const [editCategory, setEditCategory] = useState<boolean>(false);
  const [category, setCategory] = useState<string>(projectCategoryTitle);
  const [validateError, setValidateError] = useState<boolean>(false);

  const dispatch = useAppDispatch();

  const cardShadow = useColorModeValue(
    '0px 18px 40px rgba(112, 144, 176, 0.12)',
    'unset',
  );

  const handleCategorySelect = useCallback((value: ISelectProps) => {
    const categoryValue = value.value;
    setCategory(categoryValue);
  }, []);

  const handleUpdateCategory = async () => {
    try {
      const response = await dispatch(
        projectThunkHandler({
          projectData: { id: targetId, category },
          jwtToken,
        }),
      );
      if (response.payload.statusCode === 200) {
        setEditCategory(false);
        toast.success('Category updated successfully');
      }
    } catch (err) {
      toast.error('Something went wrong while updating category');
    }
  };

  useEffect(() => {
    if (category === projectCategoryTitle || !category?.trim().length) {
      setValidateError(true);
    } else {
      setValidateError(false);
    }
  }, [category, projectCategoryTitle]);

  return (
    <>
      {editCategory ? (
        <Flex direction="column">
          <Select
            formLabel={formLabel}
            multipleOpt={false}
            name="category"
            placeholder={placeholder}
            options={categoryOptions}
            value={category}
            onChange={(value: ISelectProps) => handleCategorySelect(value)}
          />
          {validateError && (
            <Text mb="10px" color="red.500" fontSize="1rem">
              Updated Category is required
            </Text>
          )}
          <UpdateDocumentButtons
            isDisabled={validateError}
            name={buttonName}
            onClickCancel={() => setEditCategory(false)}
            isLoading={isLoading}
            onClickUpdate={handleUpdateCategory}
          />
        </Flex>
      ) : (
        <Information
          boxShadow={cardShadow}
          title="Category"
          value={capitalizeFirstLetter(projectCategoryTitle)}
          edit={() => setEditCategory(true)}
        />
      )}
    </>
  );
}
