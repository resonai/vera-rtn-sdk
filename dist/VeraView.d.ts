import { NativeMethods, NativeSyntheticEvent, ViewProps } from "react-native";
import { VeraCommands, VeraConfiguration, VeraMessage, VeraNativeProps } from ".";
import React from 'react';
export type VeraComponent = React.Component<VeraNativeProps> & NativeMethods & VeraCommands;
export interface VeraProps extends ViewProps {
    config?: VeraConfiguration;
    onLogin?: () => void;
    onLogout?: () => void;
    onRefreshToken?: () => void;
    onHandleMessage?: (message: VeraMessage) => void;
}
export declare class VeraView extends React.Component<VeraProps> {
    nativeVeraRef: React.RefObject<VeraComponent>;
    constructor(props: VeraProps);
    render(): React.ReactNode;
    _callMethodWithRef(method: (ref: VeraComponent) => void): void;
    pause(): void;
    resume(): void;
    sendDeeplink(link: string): void;
    sendMessage(receiver: string, data: string): void;
    _onHandleMessage: (event: NativeSyntheticEvent<VeraMessage>) => void;
    _onLogin: () => void;
    _onLogout: () => void;
    _onRefreshToken: () => void;
}
