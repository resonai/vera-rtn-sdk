import type {ViewProps} from 'react-native/Libraries/Components/View/ViewPropTypes';
import type {HostComponent} from 'react-native';
import codegenNativeComponent from 'react-native/Libraries/Utilities/codegenNativeComponent';

export type App = {
    clientId: string,
    siteIds?: string[],
    shouldShowCloseButton?: boolean,
    hideHeader?: boolean,
    implementsAuthentication?: boolean
    deeplinkPrefix?: string
}

// export enum VeraLanguage {
//     En = 'en',
//     Ru = 'ru',
//     Zh = 'zh',
//     De = 'de',
//     Hi = 'hi',
//     Th = 'th',
//     Ja = 'ja',
//     Vi = 'vi',
//     Fr = 'fr',
//     Es = 'es',
//     Sv = 'sv',
//     He = 'he'
// }

const VeraLanguage = {
    En: 'en',
    Ru: 'ru'
}

export type VeraConfiguration = {
    domain?: string,
    username?: string,
    app: App,
    language?: string
}

export interface VeraNativeProps extends ViewProps {
    config?: VeraConfiguration
}

export default codegenNativeComponent<VeraNativeProps>(
  'RTNVera',
) as HostComponent<VeraNativeProps>;
