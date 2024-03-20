import React, { useCallback, useEffect, useState } from 'react';
import { Flex, useColorModeValue, Text } from '@chakra-ui/react';
import { toast } from 'react-toastify';
import Select from '../../../../components/Select';
import UpdateDocumentButtons from '../../../../components/UpdateDocumentButtons';
import Information from '../../profile/components/Information';
import { capitalizeFirstLetter } from '../../../../utils/helper';
import { useAppDispatch, useAppSelector } from '../../../../redux/hooks';
import { getAllColors } from '../../../../redux/features/colorSlice';
import { ISelectColorProps, ISelectProps } from '../../../../types/addProduct';
import { IProjectColorsProps } from '../../types/admin';

export default function ProductColors(props: IProjectColorsProps) {
  const {
    projectThunkHandler,
    targetId,
    jwtToken,
    formLabel,
    placeholder,
    buttonName,
    isLoading,
    productColors,
  } = props;
  const { allColors } = useAppSelector((state) => state.colorReducer);

  const [editColors, setEditColors] = useState<boolean>(false);
  const [colors, setColors] = useState<string[]>(productColors);
  const [validateError, setValidateError] = useState<boolean>(false);

  const dispatch = useAppDispatch();

  const cardShadow = useColorModeValue(
    '0px 18px 40px rgba(112, 144, 176, 0.12)',
    'unset',
  );

  const handleColorSelect = useCallback((values: ISelectProps[]) => {
    const colorValues = values?.map((color) => color.value);
    setColors(colorValues);
  }, []);

  //Option for color select
  const colorOptions = allColors?.map((option) => ({
    value: option.title.toLowerCase(),
    label: capitalizeFirstLetter(option.title),
  }));

  const mappedColorOptions = colorOptions?.map((option) => ({
    ...option,
    colorScheme: option.value,
  }));

  const getColors = useCallback(() => {
    if (!allColors.length) {
      dispatch(getAllColors());
    }
  }, [allColors.length, dispatch]);

  useEffect(() => {
    getColors();
  }, [getColors]);

  const handleUpdateTags = async () => {
    try {
      const response = await dispatch(
        projectThunkHandler({
          projectData: { id: targetId, color: colors },
          jwtToken,
        }),
      );
      if (response.payload.statusCode === 200) {
        setEditColors(false);
        toast.success("Product's colors updated successfully");
      }
    } catch (err) {
      toast.error("Something went wrong while updating product's colors");
    }
  };

  useEffect(() => {
    if (colors.length !== productColors.length) {
      setValidateError(false);
    } else {
      const prevTags = productColors.slice().sort();
      const updatedTags = colors.slice().sort();
      for (let i = 0; i < prevTags.length; i++) {
        if (prevTags[i] === updatedTags[i]) {
          setValidateError(true);
          return;
        }
        break;
      }
    }
    if (colors === productColors || !colors?.length) {
      setValidateError(true);
    } else {
      setValidateError(false);
    }
  }, [colors, productColors]);

  return (
    <>
      {editColors ? (
        <Flex direction="column">
          <Select
            formLabel={formLabel}
            multipleOpt={true}
            name="colors"
            placeholder={placeholder}
            options={mappedColorOptions}
            value={colors}
            onChange={(values: ISelectColorProps[]) =>
              handleColorSelect(values)
            }
          />
          {validateError && (
            <Text mb="10px" color="red.500" fontSize="1rem">
              Updated colors are required
            </Text>
          )}
          <UpdateDocumentButtons
            isDisabled={validateError}
            name={buttonName}
            onClickCancel={() => setEditColors(false)}
            isLoading={isLoading}
            onClickUpdate={handleUpdateTags}
          />
        </Flex>
      ) : (
        <Information
          boxShadow={cardShadow}
          title="Colors"
          value={productColors.map(
            (col, index) =>
              capitalizeFirstLetter(col) +
              (index < productColors.length - 1 ? ', ' : ''),
          )}
          edit={() => setEditColors(true)}
        />
      )}
    </>
  );
}
