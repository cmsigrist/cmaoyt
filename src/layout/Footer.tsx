// React
import { FC } from 'react';
// MUI
import { Box, Link, Typography, useTheme } from '@mui/material';

const Footer: FC = () => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        width: '100%',
        paddingY: 3,
        backgroundColor: theme.palette.primary.main,
        mt: 'auto',
      }}
    >
      <Link>
        <Typography
          variant="body1"
          color={theme.palette.secondary.main}
          textAlign={'center'}
        >
          © CMAOYT
        </Typography>
      </Link>
    </Box>
  );
};

export default Footer;
