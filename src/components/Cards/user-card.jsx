import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import ListItemText from '@mui/material/ListItemText';

import { fShortenNumber } from 'src/utils/format-number';

import { _socials } from 'src/_mock';
import { varAlpha } from 'src/theme/styles';
import { AvatarShape } from 'src/assets/illustrations';
import { TwitterIcon, FacebookIcon, LinkedinIcon, InstagramIcon } from 'src/assets/icons';

import { Image } from 'src/components/image';

// ----------------------------------------------------------------------

export function UserCard({ user, sx, name, ...other }) {
  return (
    <Card
      sx={{
        textAlign: 'center',
       
        ...sx,
      }}
      {...other}
      elevation={20}
    >
      <Box sx={{ position: 'relative' }}>
        <Image
          src={user.coverUrl}
          alt={user.coverUrl}
          // ratio="16/9"
          slotProps={{
            overlay: {
              bgcolor: (theme) => varAlpha(theme.vars.palette.common.blackChannel, 0.48),
            },
          }}
        />
      </Box>

      <ListItemText
        sx={{ mt: 2, mb: 1 }}
        primary={user.name}
        secondary={user.role}
        primaryTypographyProps={{ typography: 'subtitle1' }}
        secondaryTypographyProps={{ component: 'span', mt: 0.5 }}
      />

      <Divider sx={{ borderStyle: 'dashed' }} />
    </Card>
  );
}
