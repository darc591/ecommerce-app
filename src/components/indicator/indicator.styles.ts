import styled from '@emotion/styled';
import { Alert } from '@mui/material';
import { toRem } from '../../utils/toRem';

export const StyledIndicator = styled(Alert)`
  font-size: ${toRem(12)};
  padding: ${toRem(8)};
  overflow: hidden;

  display: flex;
  align-items: center;
  gap: ${toRem(2)};

  > div {
    overflow: initial;
    padding: 0;
    margin: 0;
    height: 100%;
  }

  > div > svg {
    width: ${toRem(22)};
    height: ${toRem(16)};
    padding: 0;
    margin: 0;
  }
`;
