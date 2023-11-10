import type { ViewProps } from 'react-native/Libraries/Components/View/ViewPropTypes';
import type { HostComponent } from 'react-native';
import { DirectEventHandler, WithDefault } from 'react-native/Libraries/Types/CodegenTypes';
import React from 'react';
export type App = {
    clientId: string;
    siteIds?: string[];
    shouldShowCloseButton?: boolean;
    hideHeader?: boolean;
    implementsAuthentication?: boolean;
    deeplinkPrefix?: string;
};
export type VeraLanguage = 'en' | 'ru' | 'zh' | 'de' | 'hi' | 'th' | 'ja' | 'vi' | 'fr' | 'es' | 'sv' | 'he';
export type VeraConfiguration = {
    domain?: string;
    username?: string;
    app: App;
    language?: WithDefault<VeraLanguage, 'en'>;
};
export type VeraMessage = {
    sender: string;
    data: string;
};
export interface VeraNativeProps extends ViewProps {
    config?: VeraConfiguration;
    onLogin?: DirectEventHandler<{}>;
    onLogout?: DirectEventHandler<{}>;
    onRefreshToken?: DirectEventHandler<{}>;
    onHandleMessage?: DirectEventHandler<VeraMessage>;
}
type ComponentType = HostComponent<VeraNativeProps>;
export interface NativeCommands {
    pause: (viewRef: React.ElementRef<ComponentType>) => void;
    resume: (viewRef: React.ElementRef<ComponentType>) => void;
    sendDeeplink: (viewRef: React.ElementRef<ComponentType>, link: string) => void;
    sendMessage: (viewRef: React.ElementRef<ComponentType>, receiver: string, data: string) => void;
}
export declare const Commands: NativeCommands;
export type VeraCommands = {
    pause: () => void;
    resume: () => void;
    sendDeeplink: (link: string) => void;
    sendMessage: (receiver: string, data: string) => void;
};
declare const _default: HostComponent<VeraNativeProps>;
export default _default;
