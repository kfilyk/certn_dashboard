// certn-theme.ts
import { DefaultTheme } from 'styled-components';
import {
    certnGray,
    certnRed,
    certnYellow,
    certnGreen,
    certnBlue,
    certnIndigo,
    certnPurple,
    certnPink,
} from './certn-colours';

// Certn specified theme
// https://www.figma.com/file/4T4EkyBdjYpHMK50QjVQtr/Certn-Design-System-UVIC?node-id=1019%3A28260

// TODO: Import the line spacing & type (if needed)

const certnTheme: DefaultTheme = {
    fontFamily: 'Open Sans',
    fontWeights: {
        light: 300,
        regular: 'normal',
        semiBold: 600,
        bold: 'bold',
        extraBold: 800,
    },
    color: {
        black: '#000',
        white: '#fff',
        gray: certnGray,
        red: certnRed,
        yellow: certnYellow,
        green: certnGreen,
        blue: certnBlue,
        indigo: certnIndigo,
        purple: certnPurple,
        pink: certnPink,
    },
    breakPoints: {
        xs: '376px',
        sm: '641px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
        xxl: '1536px',
    },
    device: {
        mobile: '(min-width: 376px)',
        mobileLarge: '(min-width: 641px)',
        tablet: '(min-width: 768px)',
        tabletLarge: '(min-width: 1024px)',
        desktop: '(min-width: 1280px)',
        desktopLarge: '(min-width: 1536px)',
    },
};

export { certnTheme };
