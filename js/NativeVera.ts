import { TurboModuleRegistry } from "react-native";
import type { TurboModule } from "react-native/Libraries/TurboModule/RCTExport";

export type App = {
    clientId: string,
    siteIds: string[],
    shouldShowCloseButton: boolean,
    hideHeader: boolean,
    implementsAuthentication: boolean
    deeplinkPrefix?: string
}

export enum VeraLanguage {
    En = 'en',
    Ru = 'ru',
    Zh = 'zh',
    De = 'de',
    Hi = 'hi',
    Th = 'th',
    Ja = 'ja',
    Vi = 'vi',
    Fr = 'fr',
    Es = 'es',
    Sv = 'sv',
    He = 'he'
}

export type VeraConfiguration = {
    domain: string,
    username?: string,
    app: App,
    language: VeraLanguage
}

export interface Spec extends TurboModule {
    useConfig(config: VeraConfiguration): void;
}

export default (TurboModuleRegistry.getEnforcing<Spec>('RTNVera'));
