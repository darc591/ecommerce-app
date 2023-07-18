import { Box, Grid, useMediaQuery } from '@mui/material';
import { useTheme } from '@emotion/react';
import React from 'react';

type FormLayoutProps = {
  leftBackgroundImage: string;
  leftImage: string;
  formComponent: React.ReactNode;
};

const FormLayout = ({ leftBackgroundImage, leftImage, formComponent }: FormLayoutProps) => {
  const { breakpoints } = useTheme();
  const mobile = useMediaQuery(breakpoints.down('md'));
  return (
    <Box height='100vh'>
      <Grid container height='100%'>
        {!mobile && (
          <Grid
            item
            md={5}
            display='flex'
            justifyContent='center'
            alignItems='center'
            style={{ backgroundImage: `url(${leftBackgroundImage})` }}
          >
            <img src={leftImage} width={500} />
          </Grid>
        )}
        <Grid
          item
          md={7}
          xs={12}
          style={{ backgroundColor: 'white' }}
          display='flex'
          justifyContent='center'
          alignItems='center'
        >
          {formComponent}
        </Grid>
      </Grid>
    </Box>
  );
};

export default FormLayout;
