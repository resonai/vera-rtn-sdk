<p align="center">
    <img alt="Vera: A computer vision enterprise platform that transforms buildings into intelligent environments" src="https://github.com/resonai/vera-android-sdk/blob/375265d056e7b70f7a89771ced507f5421645af9/Vera.png">
</p>
<p align="center">
A computer vision enterprise platform that transforms buildings into intelligent environments.
</p>

## Installation

> [!IMPORTANT]
> The following instructions assume you are using The New Architecture, and have been tested on applications created with React Native v0.68.0 and above.

Start by adding `vera-rtn-sdk` to your project:
```bash
yarn add https://github.com/resonai/vera-rtn-sdk
```

### Android Setup

1. **Gradle Version**: Update the `distributionUrl` in `gradle-wrapper.properties` to use Gradle 7.6:
```gradle
distributionUrl=https\://services.gradle.org/distributions/gradle-7.6-all.zip
```

2. **Minimum SDK Version**: Set the minimum SDK version in `build.gradle`:
```gradle
minSdkVersion = 28
```

### iOS Setup

1. **iOS Platform Version**: In your `Podfile`, specify the iOS platform version:
```ruby
platform :ios, '13.5' # minimum version for Vera Native SDK to work
```

2. **Static Framework Linkage**: There's a [big known issue](https://github.com/reactwg/react-native-new-architecture/discussions/115) with using frameworks with The New Architecture. Since Vera Native SDK is a framework, you need to modify your `Podfile` to use static linkage:
```ruby
use_frameworks! :linkage => :static
ENV['NO_FLIPPER'] = "1" # Flipper doesn't support static frameworks yet
```

3. **Install CocoaPods Pod Linkage Plugin**: In order to fix a CocoaPod limitation where you can't specify linking per dependency, you need to install the following plugin:
```bash
bundle add cocoapods-pod-linkage
```

4. **Configure Pod Linkage**: VeraSDK uses `libwebp`, which is expected by Vera to be linked to as a dynamic library, so we need to enable the plugin and set `libwebp` to dynamic linkage in the Podfile:
```ruby
plugin 'cocoapods-pod-linkage'
pod 'libwebp', :linkage => :dynamic
```

5. (Optional) **Node Binary Export**: Add a `.xcode.env` file with the path to `node` binary if missing:
```bash
echo export NODE_BINARY=$(command -v node) > .xcode.env
```

## Integration

> [!NOTE]
> The React Native SDK follows same principles and architecture as the Native SDKs. The native documentation of the [iOS SDK](https://github.com/resonai/vera-ios-sdk) & [Android SDK](https://github.com/resonai/vera-android-sdk) can be of help when you get stuck.

1. Create a configuration object, and initialize `VeraView`:
```typescript
import { VeraConfiguration, VeraView } from 'vera-rtn-sdk';

const Vera: () => JSX.Element = () => {
  const config: VeraConfiguration = {
    app: {
      clientId: '<your_client_id>', // i.e. vera-example-app
      siteIds: ['sdk-sample-site'] // your application's site or null for all available sites
    }
  }

  return (
    <VeraView 
      config={config} 
      style={{width: '100%', height: '100%'}}
      />
  )
}
```

2. __(Optional)__ Handle messages and events from Vera:
```typescript
return (
    <VeraView 
      config={config} 
      onHandleMessage={(message: VeraMessage) => console.log(message)}
      style={{width: '100%', height: '100%'}}
      />
  )
```

3. __(Optional)__ Call functions and pass commands to Vera:
```typescript
const Vera: () => JSX.Element = () => {
  const deeplink = 'https://vera.resonai.com/#/play/sdk-sample-site/com.resonai.navigation/%7B%22key%22%3A%228207e1fe-3c5a-11ee-9750-12f3c6ba63d8%22%7D'
  const veraRef = useRef<VeraView>(null)

  return (
    <View>
      <Button 
        onPress={() => {veraRef.current?.sendDeeplink(deeplink)}} // tell Vera to open deeplink
        title='Deeplink'/>
      <VeraView
        ref={veraRef}
        style={{width: '100%', height: '100%'}}/>
    </View>
  )
}
```

### Testing

Check the Native SDK docs for [testing the integration](https://github.com/resonai/vera-android-sdk/blob/master/docs/testing.md).


