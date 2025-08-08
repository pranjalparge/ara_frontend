import { useState, useCallback } from 'react';

import Box from '@mui/material/Box';
import Pagination from '@mui/material/Pagination';
import { Container } from '@mui/material';

import { UserCard } from './user-card';
import { _userCards } from 'src/_mock';
// ----------------------------------------------------------------------

export function UserCardList({}) {
  const [page, setPage] = useState(1);

  const rowsPerPage = 4;

  const handleChangePage = useCallback((event, newPage) => {
    setPage(newPage);
  }, []);

  return (
    <Container>
      <Box
        gap={3}
        display="grid"
        gridTemplateColumns={{ xs: 'repeat(1, 1fr)', sm: 'repeat(2, 1fr)', md: 'repeat(4, 1fr)' }}
      >
        {_userCards
          .slice((page - 1) * rowsPerPage, (page - 1) * rowsPerPage + rowsPerPage)
          .map((user) => (
            <Box
              sx={{
                transition: 'transform 0.1s ease-in-out',
                '&:hover': {
                  // Example hover background color
                  transform: 'scale(1.04)', // Example hover effect
                },
                cursor:"pointer"
              }}
            >
              <UserCard key={user.id} user={user} />
            </Box>
          ))}
      </Box>
    </Container>
  );
}
