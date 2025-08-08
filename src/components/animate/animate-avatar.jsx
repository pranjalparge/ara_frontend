import { m } from 'framer-motion';

import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';

import { varAlpha } from 'src/theme/styles';
import { useTheme } from '@mui/material/styles';
import { Iconify } from 'src/components/iconify';

// ----------------------------------------------------------------------

export function AnimateAvatar({
  sx,
  slotProps,
  children,
  width = 40,
  showQr,
  openQrCode,
  ...other
}) {
  const borderWidth = slotProps?.overlay?.border ?? 2;

  const spacing = slotProps?.overlay?.spacing ?? 2;
  const theme = useTheme();

  return (
    <Box
      sx={{
        width,
        height: width,
        flexShrink: 0,
        borderRadius: '50%',
        position: 'relative',
        alignItems: 'center',
        display: 'inline-flex',
        justifyContent: 'center',
        ...sx,
      }}
      {...other}
    >
      <Avatar
        alt={slotProps?.avatar?.alt ?? 'My avtar'}
        src={slotProps?.avatar?.src}
        sx={{
          zIndex: 1,
          width: `calc(100% - ${borderWidth * 2 + spacing * 2}px)`,
          height: `calc(100% - ${borderWidth * 2 + spacing * 2}px)`,
          ...slotProps?.avatar?.sx,
        }}
        {...slotProps?.avatar}
      >
        {children}
      </Avatar>
      {/* {showQr && (
        <Box
          component={'span'}
          sx={{
            bottom: 0,
            right: 0,
            width: 1,
            height: 1,
            position: 'absolute',
            borderRadius: 'inherit',
            display: 'flex',
            justifyContent: 'flex-end',
            alignItems: 'flex-end',
          }}
        >
      
          <Tooltip title="Two Factor">
            <IconButton
              sx={{
               
                border: `dashed 1px ${varAlpha(theme.vars.palette.grey['500Channel'], 0.32)}`,
                bgcolor: '#FFF',
                zIndex: 999,
              }}
              size="medium"
              onClick={openQrCode}
            >
              <Iconify icon="solar:qr-code-bold" />
            </IconButton>
          </Tooltip>
  
        </Box>
      )} */}

      <Box
        component={m.span}
        animate={{ rotate: 360 }}
        transition={{
          duration: 8,
          ease: 'linear',
          repeat: Infinity,
          ...slotProps?.animate?.transition,
        }}
        sx={{
          top: 0,
          left: 0,
          width: 1,
          height: 1,
          position: 'absolute',
          borderRadius: 'inherit',
          background: slotProps?.overlay?.color ?? 'conic-gradient(cyan, magenta, yellow, cyan)',
          mask: 'linear-gradient(#FFF 0 0) content-box, linear-gradient(#FFF 0 0)',
          WebkitMask: 'linear-gradient(#FFF 0 0) content-box, linear-gradient(#FFF 0 0)',
          maskComposite: 'exclude',
          WebkitMaskComposite: 'xor',
          p: `${borderWidth}px`,
        }}
      />
    </Box>
  );
}
