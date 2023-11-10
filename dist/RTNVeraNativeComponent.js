import codegenNativeComponent from 'react-native/Libraries/Utilities/codegenNativeComponent';
import codegenNativeCommands from 'react-native/Libraries/Utilities/codegenNativeCommands';
export const Commands = codegenNativeCommands({
    supportedCommands: [
        'pause',
        'resume',
        'sendDeeplink',
        'sendMessage'
    ]
});
export default codegenNativeComponent('RTNVera');
