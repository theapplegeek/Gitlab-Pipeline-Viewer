import {definePreset} from '@primeng/themes';
import Aura from '@primeng/themes/aura';

const DefaultPreset: any = definePreset(Aura, {
    semantic: {
        primary: {
            50: '{purple.50}',
            100: '{purple.100}',
            200: '{purple.200}',
            300: '{purple.300}',
            400: '{purple.400}',
            500: '{purple.500}',
            600: '{purple.600}',
            700: '{purple.700}',
            800: '{purple.800}',
            900: '{purple.900}',
            950: '{purple.950}'
        },
        colorScheme: {
            light: {
                primary: {
                    color: '{purple.500}',
                    inverseColor: '#ffffff',
                    hoverColor: '{purple.600}',
                    activeColor: '{purple.700}'
                },
                highlight: {
                    background: '{purple.50}',
                    focusBackground: '{purple.100}',
                    color: '{purple.700}',
                    focusColor: '{purple.800}'
                }
            },
            dark: {
                primary: {
                    color: '{purple.400}',
                    inverseColor: '#ffffff',
                    hoverColor: '{purple.300}',
                    activeColor: '{purple.200}'
                },
                highlight: {
                    background: 'rgba(250, 250, 250, .16)',
                    focusBackground: 'rgba(250, 250, 250, .24)',
                    color: 'rgba(255,255,255,.87)',
                    focusColor: 'rgba(255,255,255,.87)'
                }
            }
        }
    }
});

export default DefaultPreset;
