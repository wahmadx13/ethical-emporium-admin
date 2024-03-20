import { useEffect, useState } from 'react';
import { Flex, useColorModeValue, Text } from '@chakra-ui/react';
import { toast } from 'react-toastify';
import FormControl from '../../../../components/FormControl';
import UpdateDocumentButtons from '../../../../components/UpdateDocumentButtons';
import Information from '../../profile/components/Information';
import { useAppDispatch } from '../../../../redux/hooks';
import { IProductQuantityProps } from '../../types/admin';

export default function ProductQuantity(props: IProductQuantityProps) {
  const {
    projectThunkHandler,
    targetId,
    jwtToken,
    formLabel,
    placeholder,
    buttonName,
    isLoading,
    productQuantity,
  } = props;
  const [editQuantity, setEditQuantity] = useState<boolean>(false);
  const [quantity, setQuantity] = useState<number>(productQuantity);
  const [validateError, setValidateError] = useState<boolean>(false);

  const dispatch = useAppDispatch();

  const cardShadow = useColorModeValue(
    '0px 18px 40px rgba(112, 144, 176, 0.12)',
    'unset',
  );

  const handleUpdateQuantity = async () => {
    try {
      const response = await dispatch(
        projectThunkHandler({
          projectData: { id: targetId, quantity },
          jwtToken,
        }),
      );
      if (response.payload.statusCode === 200) {
        setEditQuantity(false);
        toast.success("Product's Quantity updated successfully");
      }
    } catch (err) {
      toast.error("Something went wrong while updating product's quantity");
    }
  };

  useEffect(() => {
    if (quantity === productQuantity || !quantity) {
      setValidateError(true);
    } else {
      setValidateError(false);
    }
  }, [quantity, productQuantity]);

  return (
    <>
      {editQuantity ? (
        <Flex direction="column">
          <FormControl
            formLabel={formLabel}
            name="quantity"
            type="number"
            placeholder={placeholder}
            onChange={(e: any) => setQuantity(e.target.value)}
            value={quantity}
            defaultValue={productQuantity}
          />
          {validateError && (
            <Text mb="10px" color="red.500" fontSize="1rem">
              Updated quantity is required
            </Text>
          )}
          <UpdateDocumentButtons
            isDisabled={validateError}
            name={buttonName}
            onClickCancel={() => setEditQuantity(false)}
            isLoading={isLoading}
            onClickUpdate={handleUpdateQuantity}
          />
        </Flex>
      ) : (
        <Information
          boxShadow={cardShadow}
          title="Quantity"
          value={productQuantity}
          edit={() => setEditQuantity(true)}
        />
      )}
    </>
  );
}
