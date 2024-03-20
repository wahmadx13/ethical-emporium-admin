import React, { useCallback, useEffect, useState } from 'react';
import { Flex, useColorModeValue, Text } from '@chakra-ui/react';
import { toast } from 'react-toastify';
import Select from '../../../../components/Select';
import UpdateDocumentButtons from '../../../../components/UpdateDocumentButtons';
import Information from '../../profile/components/Information';
import { useAppDispatch, useAppSelector } from '../../../../redux/hooks';
import { capitalizeFirstLetter } from '../../../../utils/helper';
import { ISelectProps } from '../../../../types/addProduct';
import { IProjectBrandProps } from '../../types/admin';
import { getAllBrands } from '../../../../redux/features/brandSlice';

export default function ProjectBrand(props: IProjectBrandProps) {
  const {
    projectThunkHandler,
    targetId,
    jwtToken,
    formLabel,
    placeholder,
    buttonName,
    isLoading,
    projectBrand,
  } = props;

  const { allBrands } = useAppSelector((state) => state.brandReducer);

  const [editBrand, setEditBrand] = useState<boolean>(false);
  const [brand, setBrand] = useState<string>(projectBrand);
  const [validateError, setValidateError] = useState<boolean>(false);

  const dispatch = useAppDispatch();

  const cardShadow = useColorModeValue(
    '0px 18px 40px rgba(112, 144, 176, 0.12)',
    'unset',
  );

  const handleSelectBrand = useCallback((value: ISelectProps) => {
    const brandValue = value.value;
    setBrand(brandValue);
  }, []);

  const brandOptions = allBrands?.map((option) => ({
    value: option.title.toLowerCase().replace(/[\s_-]/g, ''),
    label: capitalizeFirstLetter(option.title),
  }));

  const getBrands = useCallback(() => {
    if (!allBrands.length) {
      dispatch(getAllBrands());
    }
  }, [allBrands.length, dispatch]);

  useEffect(() => {
    getBrands();
  }, [getBrands]);

  const handleUpdateBrand = async () => {
    try {
      const response = await dispatch(
        projectThunkHandler({
          projectData: { id: targetId, brand },
          jwtToken,
        }),
      );
      if (response.payload.statusCode === 200) {
        setEditBrand(false);
        toast.success("Product's brand updated successfully");
      }
    } catch (err) {
      toast.error("Something went wrong while updating product's brand");
    }
  };

  useEffect(() => {
    if (brand === projectBrand || !brand?.trim().length) {
      setValidateError(true);
    } else {
      setValidateError(false);
    }
  }, [brand, projectBrand]);

  return (
    <>
      {editBrand ? (
        <Flex direction="column">
          <Select
            formLabel={formLabel}
            multipleOpt={false}
            name="brand"
            placeholder={placeholder}
            options={brandOptions}
            value={brand}
            onChange={(value: ISelectProps) => handleSelectBrand(value)}
          />
          {validateError && (
            <Text mb="10px" color="red.500" fontSize="1rem">
              Updated Brand is required
            </Text>
          )}
          <UpdateDocumentButtons
            isDisabled={validateError}
            name={buttonName}
            onClickCancel={() => setEditBrand(false)}
            isLoading={isLoading}
            onClickUpdate={handleUpdateBrand}
          />
        </Flex>
      ) : (
        <Information
          boxShadow={cardShadow}
          title="Brand"
          value={capitalizeFirstLetter(projectBrand)}
          edit={() => setEditBrand(true)}
        />
      )}
    </>
  );
}
