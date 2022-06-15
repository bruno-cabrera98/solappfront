import styled, { css } from 'styled-components';

const defaultText = css<{ dark?: boolean }>`
  color: ${(props) => props.dark ? props.theme.fontBlack : props.theme.fontWhite};
  font-family: Raleway, sans-serif;
`;

export const H1 = styled.h1`
  ${defaultText}
`;

export const H2 = styled.h2`
  ${defaultText}
`;

export const H3 = styled.h3`
  ${defaultText}
`;

export const H4 = styled.h4`
  ${defaultText}
`;

export const H5 = styled.h5`
  ${defaultText}
`;

export const H6 = styled.h6`
  ${defaultText}
`;

export const P = styled.p`
  ${defaultText}
`
