import * as styled from './appLoader.styles';
import { useAppStore } from 'store/app/app';
import { CircularProgress } from '@mui/material';

const AppLoader = () => {
  const { loading } = useAppStore();

  if (!loading) return null;

  return (
    <styled.Wrapper>
      <styled.PaperLoading>
        <CircularProgress size={100} />
      </styled.PaperLoading>
    </styled.Wrapper>
  );
};

export default AppLoader;
