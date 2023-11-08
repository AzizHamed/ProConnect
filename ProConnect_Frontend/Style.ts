import { Context } from 'react';
import {Typography, Colors, Spacings, Constants, ThemeManager} from 'react-native-ui-lib';
import { Props } from 'react-native-ui-lib/src/components/button/ButtonTypes';


export function initTheme()
{
    Colors.loadColors({
        pink: '#FF69B4',
        gold: '#FFD700',
        hadi: '#3cff00',
        primary: '#ce6a6a',
        
    });

    Typography.loadTypographies({
        h1: { fontSize: 42, fontWeight: 'heavy', lineHeight: 64 },
        h2: { fontSize: 42, fontWeight: '300', lineHeight: 64 },
        h3: { fontSize: 30, fontWeight: '200', lineHeight: 40 },
        body: { fontSize: 16, fontWeight: '400', lineHeight: 18 },
    });

    Spacings.loadSpacings({
        page: Constants.isSmallScreen ? 16 : 30,
        headers: Constants.isSmallScreen ? 10 : 16,
        p: 80
    });

    ThemeManager.setComponentTheme('Text', (props : Props, context : any) =>{
        return {
            h1: props.h1,
            hadi: props.hadi,
            p: true
        }
    })
}
