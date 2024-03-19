'use client';
// Chakra imports
import { Box, Grid, GridItem } from '@chakra-ui/react';

// Custom components
import Banner from '../../../views/admin/profile/components/Banner';
import General from '../../../views/admin/profile/components/General';
import Projects from '../../../views/admin/profile/components/Projects';
import Storage from '../../../views/admin/profile/components/Storage';

// Assets
import banner from '../../../img/auth/banner.png';
import avatar from '../../../img/avatars/avatar4.png';

export default function ProfileOverview() {
  return (
    <Box pt={{ base: '130px', md: '80px', xl: '80px' }}>
      {/* Main Fields */}
      <Grid templateColumns="repeat(2, 1fr)" gap={{ base: '20px', xl: '20px' }}>
        <GridItem width="100%" rowSpan={5}>
          <Banner
            banner={banner}
            avatar={avatar}
            name="Adela Parkson"
            job="Product Designer"
            posts="17"
            followers="9.7k"
            following="274"
          />
        </GridItem>
        <GridItem width="100%" rowSpan={5}>
          <Storage used={25.6} total={50} />
        </GridItem>
      </Grid>
      <Grid
        mb="20px"
        templateColumns={{
          base: '1fr',
          lg: 'repeat(2, 1fr)',
          '2xl': '1.34fr 1.62fr 1fr',
        }}
        templateRows={{
          base: '1fr',
          lg: 'repeat(2, 1fr)',
          '2xl': '1fr',
        }}
        gap={{ base: '20px', xl: '20px' }}
      >
        <Projects
          banner={banner}
          avatar={avatar}
          name="Adela Parkson"
          job="Product Designer"
          posts="17"
          followers="9.7k"
          following="274"
        />
        <General
          gridArea={{ base: '2 / 1 / 3 / 2', lg: '1 / 2 / 2 / 3' }}
          minH="365px"
          pe="20px"
        />
        <Projects
          banner={banner}
          avatar={avatar}
          name="Adela Parkson"
          job="Product Designer"
          posts="17"
          followers="9.7k"
          following="274"
        />
      </Grid>
    </Box>
  );
}
