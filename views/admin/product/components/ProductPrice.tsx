import { useEffect, useState } from 'react';
import { Flex, useColorModeValue, Text } from '@chakra-ui/react';
import { toast } from 'react-toastify';
import FormControl from '../../../../components/FormControl';
import UpdateDocumentButtons from '../../../../components/UpdateDocumentButtons';
import Information from '../../profile/components/Information';
import { useAppDispatch } from '../../../../redux/hooks';
import { IProductPriceProps } from '../../types/admin';

export default function ProductPrice(props: IProductPriceProps) {
  const {
    projectThunkHandler,
    targetId,
    jwtToken,
    formLabel,
    placeholder,
    buttonName,
    isLoading,
    productPrice,
  } = props;
  const [editPrice, setEditPrice] = useState<boolean>(false);
  const [price, setPrice] = useState<number>(productPrice);
  const [validateError, setValidateError] = useState<boolean>(false);

  const dispatch = useAppDispatch();

  const cardShadow = useColorModeValue(
    '0px 18px 40px rgba(112, 144, 176, 0.12)',
    'unset',
  );

  const handleUpdatePrice = async () => {
    try {
      const response = await dispatch(
        projectThunkHandler({
          projectData: { id: targetId, price },
          jwtToken,
        }),
      );
      if (response.payload.statusCode === 200) {
        setEditPrice(false);
        toast.success("Product's price updated successfully");
      }
    } catch (err) {
      toast.error("Something went wrong while updating product's price");
    }
  };

  useEffect(() => {
    if (price === productPrice || !price) {
      setValidateError(true);
    } else {
      setValidateError(false);
    }
  }, [price, productPrice]);

  return (
    <>
      {editPrice ? (
        <Flex direction="column">
          <FormControl
            formLabel={formLabel}
            name="price"
            type="number"
            placeholder={placeholder}
            onChange={(e: any) => setPrice(e.target.value)}
            value={price}
            defaultValue={productPrice}
          />
          {validateError && (
            <Text mb="10px" color="red.500" fontSize="1rem">
              Updated price is required
            </Text>
          )}
          <UpdateDocumentButtons
            isDisabled={validateError}
            name={buttonName}
            onClickCancel={() => setEditPrice(false)}
            isLoading={isLoading}
            onClickUpdate={handleUpdatePrice}
          />
        </Flex>
      ) : (
        <Information
          boxShadow={cardShadow}
          title="Price"
          value={productPrice}
          edit={() => setEditPrice(true)}
        />
      )}
    </>
  );
}
