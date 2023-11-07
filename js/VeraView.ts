import { NativeSyntheticEvent } from "react-native"
import { VeraMessage, VeraNativeProps } from "./RTNVeraNativeComponent"
import RTNVera from "./RTNVeraNativeComponent"
import React from 'react';

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