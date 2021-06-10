import 'styled-components';

declare module 'styled-components' {
    export interface DefaultTheme {
        font: string;
        colors: {
            mainGreen: string;
            textGreen: string;
            lightGreen: string;
        };
    }
}
