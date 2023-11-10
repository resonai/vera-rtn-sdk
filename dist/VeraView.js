import { Commands } from ".";
import RTNVera from ".";
import React from 'react';
export class VeraView extends React.Component {
    constructor(props) {
        super(props);
        // MARK: - Callbacks
        this._onHandleMessage = (event) => {
            if (!this.props.onHandleMessage) {
                console.log('onHandleMessage is nil');
                return;
            }
            this.props.onHandleMessage(event.nativeEvent);
        };
        this._onLogin = () => {
            if (!this.props.onLogin) {
                console.log('onLogin is nil');
                return;
            }
            this.props.onLogin();
        };
        this._onLogout = () => {
            if (!this.props.onLogout) {
                console.log('onLogout is nil');
                return;
            }
            this.props.onLogout();
        };
        this._onRefreshToken = () => {
            if (!this.props.onRefreshToken) {
                console.log('onRefreshToken is nil');
                return;
            }
            this.props.onRefreshToken();
        };
        this.nativeVeraRef = React.createRef();
    }
    render() {
        return <RTNVera {...this.props} ref={this.nativeVeraRef} config={this.props.config} onHandleMessage={this._onHandleMessage} onLogin={this._onLogin} onLogout={this._onLogout} onRefreshToken={this._onRefreshToken}/>;
    }
    // MARK: - Commands
    _callMethodWithRef(method) {
        const ref = this.nativeVeraRef.current;
        if (ref) {
            method(ref);
        }
        else {
            console.warn('Reference to native Vera component has not been updated yet');
        }
    }
    pause() {
        this._callMethodWithRef(ref => Commands.pause(ref));
    }
    resume() {
        this._callMethodWithRef(ref => Commands.resume(ref));
    }
    sendDeeplink(link) {
        this._callMethodWithRef(ref => Commands.sendDeeplink(ref, link));
    }
    sendMessage(receiver, data) {
        this._callMethodWithRef(ref => Commands.sendMessage(ref, receiver, data));
    }
}
