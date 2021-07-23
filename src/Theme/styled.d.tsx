import 'styled-components';

declare module 'styled-components' {
    export interface DefaultTheme {
        breakPoints: {
            xs: string;
            sm: string;
            md: string;
            lg: string;
            xl: string;
            xxl: string;
        };
        device: {
            mobile: string;
            mobileLarge: string;
            tablet: string;
            tabletLarge: string;
            desktop: string;
            desktopLarge: string;
        };
        fontFamily: string;
        fontWeights: {
            light: number;
            regular: string;
            semiBold: number;
            bold: string;
            extraBold: number;
        };
        fontSize: {
            xs: {
                size: string;
                lineHeight: string;
            };
            sm: {
                size: string;
                lineHeight: string;
            };
            base: {
                size: string;
                lineHeight: string;
            };
            lg: {
                size: string;
                lineHeight: string;
            };
            xl: {
                size: string;
                lineHeight: string;
            };
            xl2: {
                size: string;
                lineHeight: string;
            };
            xl3: {
                size: string;
                lineHeight: string;
            };
            xl4: {
                size: string;
                lineHeight: string;
            };
            xl5: {
                size: string;
                lineHeight: string;
            };
            xl6: {
                size: string;
                lineHeight: string;
            };
            xl7: {
                size: string;
                lineHeight: string;
            };
            xl8: {
                size: string;
                lineHeight: string;
            };
            xl9: {
                size: string;
                lineHeight: string;
            };
        };
        color: {
            black: string;
            white: string;
            gray: {
                50: string;
                100: string;
                200: string;
                300: string;
                400: string;
                default: string;
                600: string;
                700: string;
                800: string;
                900: string;
            };
            red: {
                50: string;
                100: string;
                200: string;
                300: string;
                400: string;
                default: string;
                600: string;
                700: string;
                800: string;
                900: string;
            };
            yellow: {
                50: string;
                100: string;
                200: string;
                300: string;
                400: string;
                default: string;
                600: string;
                700: string;
                800: string;
                900: string;
            };
            green: {
                50: string;
                100: string;
                200: string;
                300: string;
                400: string;
                default: string;
                600: string;
                700: string;
                800: string;
                900: string;
            };
            blue: {
                50: string;
                100: string;
                200: string;
                300: string;
                400: string;
                default: string;
                600: string;
                700: string;
                800: string;
                900: string;
            };
            indigo: {
                50: string;
                100: string;
                200: string;
                300: string;
                400: string;
                default: string;
                600: string;
                700: string;
                800: string;
                900: string;
            };
            purple: {
                50: string;
                100: string;
                200: string;
                300: string;
                400: string;
                default: string;
                600: string;
                700: string;
                800: string;
                900: string;
            };
            pink: {
                50: string;
                100: string;
                200: string;
                300: string;
                400: string;
                default: string;
                600: string;
                700: string;
                800: string;
                900: string;
            };
        };
    }
}
