import styled from '@emotion/styled';

export const Wrapper = styled.div`
  position: fixed;
  z-index: 100000;
  top: 0px;
  right: 0;
  left: 0;
  bottom: 0;
  background-color: rgba(255, 255, 255, 0.4);
`;

export const PaperLoading = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 25px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  min-width: 300px;
  min-height: 200px;
`;
