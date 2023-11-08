package com.rtnvera

import android.view.Choreographer
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.FrameLayout
import android.widget.LinearLayout
import androidx.fragment.app.FragmentActivity
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
import com.resonai.di.VeraIsolatedKoinContext
import com.resonai.irocket.VeraConfiguration

@ReactModule(name = RTNVeraManager.NAME)
class RTNVeraManager(val context: ReactApplicationContext) : ViewGroupManager<LinearLayout>(),
    RTNVeraManagerInterface<LinearLayout> {
    private val delegate = RTNVeraManagerDelegate(this)

    val COMMAND_CREATE = 1

    private var propWidth: Int? = null
    private var propHeight: Int? = null

    override fun getDelegate(): ViewManagerDelegate<LinearLayout> = delegate

    override fun getName(): String = NAME

    override fun createViewInstance(context: ThemedReactContext): LinearLayout {
//        val layout = LinearLayout(context)
//        layout.id = View.generateViewId()
//        val params = FrameLayout.LayoutParams(
//            ViewGroup.LayoutParams.MATCH_PARENT,
//            ViewGroup.LayoutParams.MATCH_PARENT
//        )
//        layout.layoutParams = params

//        val layout = LayoutInflater.from(context).inflate(R.layout.container, null) as LinearLayout

        VeraIsolatedKoinContext.setContext(context)

//        layout.handler?.post {
//            // Make sure we're still attached and in a good state
//            if (layout.isAttachedToWindow) {
//                val fragmentManager = (context.currentActivity as FragmentActivity).supportFragmentManager
//                val veraBuilder = VeraConfiguration.Builder(
//                    fragmentManager, layout.findViewById(R.id.container)
//                )
//
//                veraBuilder.startWithoutLogin()
//            }
//        }

        return LinearLayout(context)
    }

    @ReactProp(name = "config")
    override fun setConfig(view: LinearLayout?, value: ReadableMap?) {
//        val fragmentManager = (context.currentActivity as FragmentActivity).supportFragmentManager
//        val veraBuilder = VeraConfiguration.Builder(
//            fragmentManager, view!!
//        )
//
//        veraBuilder.startWithoutLogin()
    }

    @ReactPropGroup(names = ["width", "height"], customType = "Style")
    fun setStyle(view: LinearLayout, index: Int, value: Int) {
        if (index == 0) propWidth = value
        if (index == 1) propHeight = value
    }

    companion object {
        const val NAME = "RTNVera"
    }

    override fun receiveCommand(root: LinearLayout, commandId: String?, args: ReadableArray?) {
//        super.receiveCommand(root, commandId, args)

        when (commandId) {
            "create" -> create(root, args!!.getInt(0))
//            "blur" -> root.handleBlurJsRequest()
//            "clearText" -> root.handleClearTextJsRequest()
//            "toggleCancelButton" -> root.handleToggleCancelButtonJsRequest(false) // just a dummy argument
//            "setText" -> root.handleSetTextJsRequest(args?.getString(0))
            else -> throw JSApplicationIllegalArgumentException("Unsupported native command received: $commandId")
        }
    }

    override fun getCommandsMap(): MutableMap<String, Int>? {
        return MapBuilder.of("create", 1)
    }

    override fun create(view: LinearLayout?, viewId: Int) {
        val parentView = view!!.findViewById<ViewGroup>(viewId)
        setupLayout(parentView)

        val fragmentManager = (context.currentActivity as FragmentActivity).supportFragmentManager
        val veraBuilder = VeraConfiguration.Builder(
            fragmentManager, view!!
        ).setSiteIDs(listOf("sdk-sample-site"))
            .setClientAppID("test")

        veraBuilder.startWithoutLogin()
    }

    fun setupLayout(view: View) {
        Choreographer.getInstance().postFrameCallback(object: Choreographer.FrameCallback {
            override fun doFrame(frameTimeNanos: Long) {
                manuallyLayoutChildren(view)
                view.viewTreeObserver.dispatchOnGlobalLayout()
                Choreographer.getInstance().postFrameCallback(this)
            }
        })
    }

    private fun manuallyLayoutChildren(view: View) {
        // propWidth and propHeight coming from react-native props
//        val width = requireNotNull(propWidth)
//        val height = requireNotNull(propHeight)

        view.measure(
            View.MeasureSpec.makeMeasureSpec(2500, View.MeasureSpec.EXACTLY),
            View.MeasureSpec.makeMeasureSpec(2500, View.MeasureSpec.EXACTLY))

        view.layout(0, 0, 2500, 2500)
    }

    override fun pause(view: LinearLayout?) {
        TODO("Not yet implemented")
    }

    override fun resume(view: LinearLayout?) {
        TODO("Not yet implemented")
    }

    override fun sendDeeplink(view: LinearLayout?, link: String?) {
        TODO("Not yet implemented")
    }

    override fun sendMessage(view: LinearLayout?, receiver: String?, data: String?) {
        TODO("Not yet implemented")
    }
}