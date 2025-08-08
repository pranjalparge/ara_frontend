import Box from '@mui/material/Box';
import { Card } from '@mui/material';

import Container from '@mui/material/Container';

import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';

import { Iconify } from 'src/components/iconify';

import { _userCards } from 'src/_mock';
import { useTabs } from 'src/hooks/use-tabs';

import { UserCard } from 'src/components/Cards/user-card';
import { ComponentBlock } from '../mui/component-block';
import { CONFIG } from 'src/config-global';
// ----------------------------------------------------------------------

const TABS = [
  // {
  //   value: 'breakfast',
  //   icon: <Iconify icon="emojione:bacon" width={24} color="#D32F2F" />, // Bacon icon for breakfast

  //   label: 'Break Fast',
  // },
  {
    value: 'lunch',
    icon: <Iconify icon="emojione:spaghetti" width={24} color="#FFA726" />, // Spaghetti icon for lunch
    label: 'Lunch',
  },
  // {
  //   value: 'snacks',
  //   icon: <Iconify icon="twemoji:cookie" width={24} color="#8D6E63" />,
  //   label: 'Snacks',
  // },
  {
    value: 'dinner',
    icon: <Iconify icon="twemoji:stew" width={24} color="#795548" />, // Stew icon for dinner
    // Meat on bone icon for dinner
    // Cookie icon for a snack
    // French fries icon for snacks
    label: 'Dinner',
  },
];
const names = [
  // Breakfast items
  // {
  //   coverUrl: 'tumcha/assets/images/mock/cover/coverfood-1.jpg',
  //   id: 'e99f09a7-dd88-49d5-b1c8-1daf80c2d7b1',
  //   name: 'Chicket',
  //   type: 'breakfast',
  // },
  // {
  //   coverUrl: 'tumcha/assets/images/mock/cover/coverfood-2.jpg',
  //   id: 'e99f09a7-dd88-49d5-b1c8-1daf80c2d7b2',
  //   name: 'Mutton',
  //   type: 'breakfast',
  // },
  // {
  //   coverUrl: 'tumcha/assets/images/mock/cover/coverfood-3.jpg',
  //   id: 'e99f09a7-dd88-49d5-b1c8-1daf80c2d7b3',
  //   name: 'Deja Brady',
  //   type: 'breakfast',
  // },
  // {
  //   coverUrl: 'tumcha/assets/images/mock/cover/coverfood-4.jpg',
  //   id: 'e99f09a7-dd88-49d5-b1c8-1daf80c2d7b4',
  //   name: 'Harrison Stein',
  //   type: 'breakfast',
  // },
  // {
  //   coverUrl: 'tumcha/assets/images/mock/cover/coverfood-5.jpg',
  //   id: 'e99f09a7-dd88-49d5-b1c8-1daf80c2d7b5',
  //   name: 'Reece Chung',
  //   type: 'breakfast',
  // },
  // {
  //   coverUrl: 'tumcha/assets/images/mock/cover/img1.webp',
  //   id: 'e99f09a7-dd88-49d5-b1c8-1daf80c2d7b6',
  //   name: 'Lainey Davidson',
  //   type: 'breakfast',
  // },
  // {
  //   coverUrl: 'tumcha/assets/images/mock/cover/coverfood-7.jpg',
  //   id: 'e99f09a7-dd88-49d5-b1c8-1daf80c2d7b7',
  //   name: 'Cristopher Cardenas',
  //   type: 'breakfast',
  // },
  // {
  //   coverUrl: 'tumcha/assets/images/mock/cover/coverfood-8.jpg',
  //   id: 'e99f09a7-dd88-49d5-b1c8-1daf80c2d7b8',
  //   name: 'Melanie Noble',
  //   type: 'breakfast',
  // },

  // Lunch items
  {
    coverUrl: `${CONFIG.assetsDir}/assets/images/mock/lunchdinner/dallrice1.jpeg`,
    id: 'e99f09a7-dd88-49d5-b1c8-1daf80c2d7b9',
    name: 'Dall Rice',
    type: 'lunch',
  },

  {
    coverUrl: `${CONFIG.assetsDir}/assets/images/mock/lunchdinner/polaw.jpeg`,
    id: 'e99f09a7-dd88-49d5-b1c8-1daf80c2d7b11',
    name: 'Polaw',
    type: 'lunch',
  },
  {
    coverUrl: `${CONFIG.assetsDir}/assets/images/mock/lunchdinner/rajmarice.jpeg`,
    id: 'e99f09a7-dd88-49d5-b1c8-1daf80c2d7b12',
    name: 'Rajma Rice',
    type: 'lunch',
  },
  {
    coverUrl: `${CONFIG.assetsDir}/assets/images/mock/lunchdinner/idlidhosa.jpeg`,
    id: 'e99f09a7-dd88-49d5-b1c8-1daf80c2d7b10',
    name: 'Idli Dosa',
    type: 'lunch',
  },
  // {
  //   coverUrl: 'tumcha/assets/images/mock/cover/coverfood-5.jpg',
  //   id: 'e99f09a7-dd88-49d5-b1c8-1daf80c2d7b13',
  //   name: 'Pasta Primavera',
  //   type: 'lunch',
  // },
  // {
  //   coverUrl: 'tumcha/assets/images/mock/cover/img1.webp',
  //   id: 'e99f09a7-dd88-49d5-b1c8-1daf80c2d7b14',
  //   name: 'Pasta Primavera',
  //   type: 'lunch',
  // },
  // {
  //   coverUrl: 'tumcha/assets/images/mock/cover/coverfood-7.jpg',
  //   id: 'e99f09a7-dd88-49d5-b1c8-1daf80c2d7b15',
  //   name: 'Pasta Primavera',
  //   type: 'lunch',
  // },
  // {
  //   coverUrl: 'tumcha/assets/images/mock/cover/coverfood-8.jpg',
  //   id: 'e99f09a7-dd88-49d5-b1c8-1daf80c2d7b16',
  //   name: 'Pasta Primavera',
  //   type: 'lunch',
  // },

  // Snacks items
  // {
  //   coverUrl: 'tumcha/assets/images/mock/cover/coverfood-1.jpg',
  //   id: 'e99f09a7-dd88-49d5-b1c8-1daf80c2d7b17',
  //   name: 'Nachos',
  //   type: 'snacks',
  // },
  // {
  //   coverUrl: 'tumcha/assets/images/mock/cover/coverfood-2.jpg',
  //   id: 'e99f09a7-dd88-49d5-b1c8-1daf80c2d7b18',
  //   name: 'Fruit Bowl',
  //   type: 'snacks',
  // },
  // {
  //   coverUrl: 'tumcha/assets/images/mock/cover/coverfood-3.jpg',
  //   id: 'e99f09a7-dd88-49d5-b1c8-1daf80c2d7b19',
  //   name: 'Veggie Sticks',
  //   type: 'snacks',
  // },
  // {
  //   coverUrl: 'tumcha/assets/images/mock/cover/coverfood-8.jpg',
  //   id: 'e99f09a7-dd88-49d5-b1c8-1daf80c2d7b20',
  //   name: 'Energy Bar',
  //   type: 'snacks',
  // },
  // {
  //   coverUrl: 'tumcha/assets/images/mock/cover/coverfood-7.jpg',
  //   id: 'e99f09a7-dd88-49d5-b1c8-1daf80c2d7b21',
  //   name: 'Energy Bar',
  //   type: 'snacks',
  // },
  // {
  //   coverUrl: 'tumcha/assets/images/mock/cover/img1.webp',
  //   id: 'e99f09a7-dd88-49d5-b1c8-1daf80c2d7b22',
  //   name: 'Energy Bar',
  //   type: 'snacks',
  // },
  // {
  //   coverUrl: 'tumcha/assets/images/mock/cover/coverfood-5.jpg',
  //   id: 'e99f09a7-dd88-49d5-b1c8-1daf80c2d7b23',
  //   name: 'Energy Bar',
  //   type: 'snacks',
  // },
  // {
  //   coverUrl: 'tumcha/assets/images/mock/cover/coverfood-4.jpg',
  //   id: 'e99f09a7-dd88-49d5-b1c8-1daf80c2d7b24',
  //   name: 'Energy Bar',
  //   type: 'snacks',
  // },

  // Dinner items
  {
    coverUrl: `${CONFIG.assetsDir}/assets/images/mock/lunchdinner/gobiwithroti.jpeg`,
    id: 'e99f09a7-dd88-49d5-b1c8-1daf80c2d7b25',
    name: 'Gobi with Roti',
    type: 'dinner',
  },
  {
    coverUrl: `${CONFIG.assetsDir}/assets/images/mock/lunchdinner/dallrice1.jpeg`,
    id: 'e99f09a7-dd88-49d5-b1c8-1daf80c2d7b26',
    name: 'Dall Rice',
    type: 'dinner',
  },
  // {
  //   coverUrl: 'tumcha/assets/images/mock/cover/img1.webp',
  //   id: 'e99f09a7-dd88-49d5-b1c8-1daf80c2d7b27',
  //   name: 'Grilled Vegetables',
  //   type: 'dinner',
  // },
  {
    coverUrl: `${CONFIG.assetsDir}/assets/images/mock/lunchdinner/chickenwithrice.jpeg`,
    id: 'e99f09a7-dd88-49d5-b1c8-1daf80c2d7b28',
    name: 'Chicken Rice',
    type: 'dinner',
  },
  // {
  //   coverUrl: 'tumcha/assets/images/mock/cover/coverfood-4.jpg',
  //   id: 'e99f09a7-dd88-49d5-b1c8-1daf80c2d7b29',
  //   name: 'Seafood Paella',
  //   type: 'dinner',
  // },
  {
    coverUrl: `${CONFIG.assetsDir}/assets/images/mock/lunchdinner/gobirice.jpeg`,
    id: 'e99f09a7-dd88-49d5-b1c8-1daf80c2d7b30',
    name: 'Gobi Rice',
    type: 'dinner',
  },
  // {
  //   coverUrl: 'tumcha/assets/images/mock/cover/coverfood-2.jpg',
  //   id: 'e99f09a7-dd88-49d5-b1c8-1daf80c2d7b31',
  //   name: 'Seafood Paella',
  //   type: 'dinner',
  // },
  // {
  //   coverUrl: 'tumcha/assets/images/mock/cover/coverfood-1.jpg',
  //   id: 'e99f09a7-dd88-49d5-b1c8-1daf80c2d7b31',
  //   name: 'Seafood Paella',
  //   type: 'dinner',
  // },
];

export function SampleFoods({ sx, ...other }) {
  const basicTabs = useTabs('lunch');

  const filteredArray = names.filter((item) => item.type == basicTabs.value);

  const TabsList = (
    <ComponentBlock>
      <Card sx={{ bgcolor: '#f2e6e1' }}>
        <Tabs value={basicTabs.value} onChange={basicTabs.onChange} sx={{ ml: 12, mr: 12, mt: 1 }}>
          {TABS.slice(0, 4).map((tab, index) => (
            <Tab
              iconPosition="top"
              key={tab.value}
              icon={
                <img
                  src={_userCards[index].coverUrl}
                  alt={tab.label}
                  width={50}
                  height={50}
                  style={{ borderRadius: '40%' }}
                />
              }
              label={tab.label}
              value={tab.value}
              disabled={tab.disabled}
              sx={{ mx: 2, cursor: 'pointer' }}
            />
          ))}
        </Tabs>
      </Card>
    </ComponentBlock>
  );

  const FoodCards = (
    <Container>
      <Box
        gap={3}
        display="grid"
        gridTemplateColumns={{
          xs: 'repeat(1, 1fr)',
          sm: 'repeat(2, 1fr)',
          md: 'repeat(4, 1fr)',
        }}
      >
        {filteredArray?.map((item) => (
          <Box
            sx={{
              transition: 'transform 0.1s ease-in-out',
              '&:hover': {
                // Example hover background color
                transform: 'scale(1.02)', // Example hover effect
              },
              cursor: 'pointer',
            }}
          >
            {item.type == basicTabs.value ? <UserCard key={item.id} user={item} /> : <></>}
          </Box>
        ))}
      </Box>
    </Container>
  );

  return (
    <Box component="section" sx={{ pt: 10, mb: 7, position: 'relative', ...sx }} {...other}>
      {TabsList}
      <Container>{FoodCards}</Container>
    </Box>
  );
}
