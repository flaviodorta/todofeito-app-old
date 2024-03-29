import styled from 'styled-components';

export const Container = styled.div<{
  children: React.ReactNode;
}>`
  width: 100%;
  padding: 0.6rem 0.22rem;
  display: flex;
  align-items: center;
  font-size: 1.38rem;
  font-weight: 200;

  &:hover {
    background: ${(props) => props.theme.colors.white.three};
  }

  svg {
    margin-right: 1rem;
    height: 1.1rem;
    width: 1.1rem;
  }
`;
