// Chakra imports
import { Flex, useColorModeValue, Heading } from '@chakra-ui/react';

// Custom components
import { HSeparator } from 'components/separator/Separator';

export function SidebarBrand() {
	//   Chakra color mode
	let logoColor = useColorModeValue('navy.700', 'white');

	return (
		<Flex alignItems='center' flexDirection='column'>
			<Heading as='h2' size='lg' mb='8'>Ethical Emporium</Heading>
			<HSeparator mb='20px' />
		</Flex>
	);
}

export default SidebarBrand;
