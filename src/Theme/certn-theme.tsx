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
        xs: 0,
        sm: '376px',
        md: '640px',
        lg: '768px',
        xl: '1024px',
        xxl: '1280px',
    },
};

export { certnTheme };
