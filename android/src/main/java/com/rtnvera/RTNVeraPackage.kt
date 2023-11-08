package com.rtnvera

import com.facebook.react.ReactPackage
import com.facebook.react.bridge.NativeModule
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.uimanager.ViewManager

class VeraPackage : ReactPackage {
    override fun createViewManagers(reactContext: ReactApplicationContext): List<ViewManager<*, *>> =
        listOf(RTNVeraManager(reactContext))

    override fun createNativeModules(reactContext: ReactApplicationContext): List<NativeModule> =
        emptyList()
}
