package com.rtnvera

import android.graphics.Color
import android.os.Bundle
import android.view.Choreographer
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.FrameLayout
import android.widget.LinearLayout
import androidx.fragment.app.Fragment
import androidx.fragment.app.FragmentActivity
import androidx.fragment.app.FragmentManager
import com.facebook.react.bridge.Arguments
import com.facebook.react.bridge.JSApplicationIllegalArgumentException
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReadableArray
import com.facebook.react.bridge.ReadableMap
import com.facebook.react.common.MapBuilder
import com.facebook.react.module.annotations.ReactModule
import com.facebook.react.uimanager.ThemedReactContext
import com.facebook.react.uimanager.ViewGroupManager
import com.facebook.react.uimanager.ViewManagerDelegate
import com.facebook.react.uimanager.annotations.ReactProp
import com.facebook.react.uimanager.annotations.ReactPropGroup
import com.facebook.react.viewmanagers.RTNVeraManagerDelegate
import com.facebook.react.viewmanagers.RTNVeraManagerInterface
import com.resonai.common.helpers.Languages
import com.resonai.di.VeraIsolatedKoinContext
import com.resonai.irocket.VeraConfiguration
import com.resonai.irocket.VeraFragment

@ReactModule(name = RTNVeraManager.NAME)
class RTNVeraManager(val context: ReactApplicationContext) : ViewGroupManager<RTNVera>(),
    RTNVeraManagerInterface<RTNVera> {
    private val delegate = RTNVeraManagerDelegate(this)
    private var vera: VeraConfiguration.Builder? = null

    override fun getDelegate(): ViewManagerDelegate<RTNVera> = delegate

    override fun getName(): String = NAME

    override fun createViewInstance(context: ThemedReactContext) = RTNVera(context)

    @ReactProp(name = "config")
    override fun setConfig(view: RTNVera?, value: ReadableMap?) {
        val fragmentManager = (context.currentActivity as FragmentActivity).supportFragmentManager

        vera = VeraConfiguration.Builder(
            fragmentManager, view!!, context
        )
        value?.let {
            vera?.apply {
                it.getMap("app")?.let { app ->
                    if (app.hasKey("siteIds")) app.getArray("siteIds")?.let { ids -> setSiteIDs(Arguments.toList(ids)?.toList()?.map { it.toString() }) }
                    if (app.hasKey("clientId")) app.getString("clientId")?.let { setClientAppID(it) }
                    if (app.hasKey("shouldShowCloseButton")) app.getBoolean("shouldShowCloseButton")?.let { setShowCloseButton(it) }
                    if (app.hasKey("hideHeader")) app.getBoolean("hideHeader")?.let { setHideHeader(it) }
                    if (app.hasKey("deeplinkPrefix")) app.getString("deeplinkPrefix")?.let { setDeeplinkPrefix(it) }
                }
                if (it.hasKey("domain")) it.getString("domain")?.let { setVeraDomain(it) }
                if (it.hasKey("language")) it.getString("language")?.let { setLanguage(Languages.valueOf(it.uppercase())) }
            }
        }

        vera?.startWithoutLogin()

        fragmentManager.registerFragmentLifecycleCallbacks(object : FragmentManager.FragmentLifecycleCallbacks() {
            override fun onFragmentViewCreated(fm: FragmentManager, f: Fragment, v: View, savedInstanceState: Bundle?) {
                super.onFragmentViewCreated(fm, f, v, savedInstanceState)

                manuallyLayoutChildren(view!!)
            }
        }, false)
    }

    private fun manuallyLayoutChildren(view: View) = view.apply {
        measure(
            View.MeasureSpec.makeMeasureSpec(width, View.MeasureSpec.EXACTLY),
            View.MeasureSpec.makeMeasureSpec(height, View.MeasureSpec.EXACTLY)
        )

        layout(left, top, right, bottom)
    }

    companion object {
        const val NAME = "RTNVera"
    }

    override fun receiveCommand(root: RTNVera, commandId: String?, args: ReadableArray?) {
        super.receiveCommand(root, commandId, args)

        when (commandId) {
            "sendDeeplink" -> sendDeeplink(root, args?.getString(0))
        }
    }

    override fun pause(view: RTNVera?) {
        TODO("Not yet implemented")
    }

    override fun resume(view: RTNVera?) {
        TODO("Not yet implemented")
    }

    override fun sendDeeplink(view: RTNVera?, link: String?) {
        link?.let { vera?.setDeeplinkComponent(it) }
    }

    override fun sendMessage(view: RTNVera?, receiver: String?, data: String?) {
        TODO("Not yet implemented")
    }
}