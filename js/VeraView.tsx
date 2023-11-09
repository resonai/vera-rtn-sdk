import { NativeMethods, NativeSyntheticEvent, ViewProps } from "react-native"
import { Commands, NativeCommands, VeraCommands, VeraConfiguration, VeraMessage, VeraNativeProps } from "vera-rtn-sdk/js/RTNVeraNativeComponent"
import RTNVera from "vera-rtn-sdk/js/RTNVeraNativeComponent"
import React from 'react';

export type VeraComponent = React.Component<VeraNativeProps> & NativeMethods & VeraCommands

export interface VeraProps extends ViewProps {
    config?: VeraConfiguration
    onLogin?: () => void
    onLogout?: () => void
    onRefreshToken?: () => void
    onHandleMessage?: (message: VeraMessage) => void
}

export class VeraView extends React.Component<VeraProps> {
    nativeVeraRef: React.RefObject<VeraComponent>

    constructor(props: VeraProps) {
        super(props)
        this.nativeVeraRef = React.createRef()
    }

    render(): React.ReactNode {
        return <RTNVera
            {...this.props}
            ref={this.nativeVeraRef}
            config={this.props.config}
            onHandleMessage={this._onHandleMessage}
            onLogin={this._onLogin}
            onLogout={this._onLogout}
            onRefreshToken={this._onRefreshToken}
            />
    }

    // MARK: - Commands

    _callMethodWithRef(method: (ref: VeraComponent) => void) {
        const ref = this.nativeVeraRef.current;
        if (ref) {
          method(ref);
        } else {
          console.warn(
            'Reference to native Vera component has not been updated yet'
          );
        }
      }
    
      pause() {
        this._callMethodWithRef(ref =>
          Commands.pause(ref)
        );
      }
    
      resume() {
        this._callMethodWithRef(ref =>
          Commands.resume(ref)
        );
      }
    
      sendDeeplink(link: string) {
        this._callMethodWithRef(ref =>
          Commands.sendDeeplink(ref, link)
        );
      }
    
      sendMessage(receiver: string, data: string) {
        this._callMethodWithRef(ref =>
          Commands.sendMessage(ref, receiver, data)
        );
      }

    // MARK: - Callbacks

    _onHandleMessage = (event: NativeSyntheticEvent<VeraMessage>) => {
        if (!this.props.onHandleMessage) {
            console.log('onHandleMessage is nil')
            return
        }
        this.props.onHandleMessage(event.nativeEvent)
    }

    _onLogin = _ => {
        if (!this.props.onLogin) {
            console.log('onLogin is nil')
            return
        }
        this.props.onLogin()
    }

    _onLogout = _ => {
        if (!this.props.onLogout) {
            console.log('onLogout is nil')
            return
        }
        this.props.onLogout()
    }

    _onRefreshToken = _ => {
        if (!this.props.onRefreshToken) {
            console.log('onRefreshToken is nil')
            return
        }
        this.props.onRefreshToken()
    }

    // static propTypes = {
    //     config: PropTypes.shape({
    //         domain: PropTypes.string,
    //         username: PropTypes.string,
    //         language: PropTypes.string,
    //         app: PropTypes.shape({
    //             clientId: PropTypes.string.isRequired,
    //             siteIds: PropTypes.arrayOf(PropTypes.string),
    //             shouldShowCloseButton: PropTypes.bool,
    //             hideHeader: PropTypes.bool,
    //             implementsAuthentication: PropTypes.bool,
    //             deeplinkPrefix: PropTypes.bool
    //         })
    //     }),
    //     onLogin: PropTypes.func,
    //     onLogout: PropTypes.func,
    //     onRefreshToken: PropTypes.func,
    //     onHandleMessage: PropTypes.func
    // }
}