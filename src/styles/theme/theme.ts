import { DefaultTheme } from 'styled-components';

export const breakpoints = {
  sm: '480px',
  md: '768px',
  lg: '976px',
  xl: '1440px',
};

export const baseTheme = {
  colors: {
    secondary: {
      one: '#FFFFFF',
      two: '#ECECEC',
      three: '#F9F9F9',
    },

    grey: {
      one: '#696969',
      two: '#B0B0B0',
      three: '#D0D0D0',
    },

    white: '#FFFFFF',
    red: '#ff4c30',
    orange: '#e67e22',
    yellow: '#f5e51b',
    blue: '#284387',
    purple: '#a537fd',
  },

  sizes: {
    icon: '2rem',
  },

  boxShadow: 'rgba(50, 50, 93, 0.25) 0px 13px 27px -5px, rgba(0, 0, 0, 0.3) 0px 8px 16px -8px;',
};

export const light: DefaultTheme = {
  mode: 'light',

  colors: {
    ...baseTheme.colors,

    primary: {
      one: '#3D5593',
    },

    font: '#030303',
  },

  sizes: {
    ...baseTheme.sizes,
  },

  boxShadow: baseTheme.boxShadow,
};

export const dark: DefaultTheme = {
  mode: 'dark',

  colors: {
    ...baseTheme.colors,

    primary: {
      one: '#121212',
      two: '#181818',
      three: '#282828',
      four: '#404040',
    },
    font: '#FFFFFF',
  },

  sizes: {
    ...baseTheme.sizes,
  },

  boxShadow: baseTheme.boxShadow,
};
