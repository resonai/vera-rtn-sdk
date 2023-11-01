import type {ViewProps} from 'react-native/Libraries/Components/View/ViewPropTypes';
import type {HostComponent, NativeSyntheticEvent} from 'react-native';
import codegenNativeComponent from 'react-native/Libraries/Utilities/codegenNativeComponent';
import { DirectEventHandler } from 'react-native/Libraries/Types/CodegenTypes';
import React from 'react';
import RTNVera from 'vera-rtn-sdk/js';
import PropTypes from 'prop-types';

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

export type VeraMessage = {
    sender: string
    data: string
}

export interface VeraNativeProps extends ViewProps {
    config?: VeraConfiguration
    onLogin?: DirectEventHandler<{}>
    onLogout?: DirectEventHandler<{}>
    onRefreshToken?: DirectEventHandler<{}>
    onHandleMessage?: DirectEventHandler<VeraMessage>
}

export class VeraView extends React.PureComponent<VeraNativeProps> {
    _onHandleMessage = (event: NativeSyntheticEvent<VeraMessage>) => {
        if (!this.props.onHandleMessage) {
            console.log('onHandleMessage is nil')
            return
        }
        this.props.onHandleMessage(event)
    }

    render(): React.ReactNode {
        return <RTNVera {...this.props} onHandleMessage={this._onHandleMessage}/>
    }

    static propTypes = {
        config: PropTypes.shape({
            domain: PropTypes.string,
            username: PropTypes.string,
            language: PropTypes.string,
            app: PropTypes.shape({
                clientId: PropTypes.string.isRequired,
                siteIds: PropTypes.arrayOf(PropTypes.string),
                shouldShowCloseButton: PropTypes.bool,
                hideHeader: PropTypes.bool,
                implementsAuthentication: PropTypes.bool,
                deeplinkPrefix: PropTypes.bool
            })
        }),
        onLogin: PropTypes.func,
        onLogout: PropTypes.func,
        onRefreshToken: PropTypes.func,
        onHandleMessage: PropTypes.func
    }
}

export default codegenNativeComponent<VeraNativeProps>(
  'RTNVera',
) as HostComponent<VeraNativeProps>;
