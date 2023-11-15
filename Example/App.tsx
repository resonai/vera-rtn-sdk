import React, { useEffect, useRef } from "react";
import { Button, SafeAreaView, StatusBar, View, findNodeHandle } from "react-native";
import {VeraView} from 'vera-rtn-sdk';
import {type VeraConfiguration, type VeraMessage} from 'vera-rtn-sdk'

const App: () => JSX.Element = () => {
  const config: VeraConfiguration = {
    app: {
      siteIds: ['sdk-sample-site'],
      clientId: 'vera-example-rtn-app'
    },
    domain: 'https://vera.resonai.com'
  }
  const deeplink = 'https://vera.resonai.com/#/play/sdk-sample-site/com.resonai.navigation/%7B%22key%22%3A%228207e1fe-3c5a-11ee-9750-12f3c6ba63d8%22%7D'
  const veraRef = useRef<VeraView>(null)

  return (
    <SafeAreaView>
    <StatusBar barStyle={'dark-content'} />
    <Button onPress={() => {console.log(veraRef); veraRef.current?.sendDeeplink(deeplink)}} title='Deeplink'/>
    <VeraView 
      ref={veraRef}
      style={{width: '100%', height: '100%'}} 
      config={config}
      onHandleMessage={(message: VeraMessage) => console.log(message)}
      />
    </SafeAreaView>
  )
}

export default App;
