import { m } from 'framer-motion';

import Badge from '@mui/material/Badge';
import SvgIcon from '@mui/material/SvgIcon';
import IconButton from '@mui/material/IconButton';
import { BaseOption } from '../../components/settings/drawer/base-option';
import Tooltip from '@mui/material/Tooltip';
import { Iconify } from '../../components/iconify';
import { useSettingsContext } from 'src/components/settings/context';
import Switch from '@mui/material/Switch';
import { useTheme, useColorScheme } from '@mui/material/styles';

// ----------------------------------------------------------------------

export function DarkmodeSettings({ sx, ...other }) {
  const settings = useSettingsContext();
  const { mode, setMode } = useColorScheme();

  return (
    // <IconButton
    //   aria-label="settings"
    //   onClick={settings.onToggleDrawer}
    //   sx={{ p: 0, width: 40, height: 40, ...sx }}
    //   {...other}
    // >
    <Tooltip title={settings.colorScheme === 'dark' ? 'Light Mode' : 'Dark Mode'}>
      <Switch
        name={'Dark mode'}
        size="small"
        color="default"
        sx={{}}
        checked={settings.colorScheme === 'dark'}
        onClick={() => {
          settings.onUpdateField('colorScheme', mode === 'light' ? 'dark' : 'light');
          setMode(mode === 'light' ? 'dark' : 'light');
        }}
      />
    </Tooltip>
    // </IconButton>
  );
}
