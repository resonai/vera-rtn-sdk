package com.rtnvera;

import android.content.Context
import android.graphics.Color
import android.os.Bundle
import android.util.AttributeSet
import android.view.Choreographer
import android.view.Gravity
import android.view.View
import android.view.ViewGroup
import android.widget.FrameLayout
import androidx.appcompat.widget.AppCompatTextView
import androidx.fragment.app.Fragment
import androidx.fragment.app.FragmentActivity
import androidx.fragment.app.FragmentManager
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.uimanager.ThemedReactContext
import com.resonai.irocket.VeraConfiguration
import com.resonai.irocket.VeraFragment

class RTNVera: FrameLayout {
    constructor(context: Context) : super(context) {
        configureComponent()
    }

    constructor(context: Context, attrs: AttributeSet?) : super(context, attrs) {
        configureComponent()
    }

    constructor(context: Context, attrs: AttributeSet?, defStyleAttr: Int) : super(context, attrs, defStyleAttr) {
        configureComponent()
    }

    override fun onAttachedToWindow() {
        super.onAttachedToWindow()

//        addFragment()
    }

    private fun manuallyLayoutChildren() {
        measure(
            MeasureSpec.makeMeasureSpec(width, MeasureSpec.EXACTLY),
            MeasureSpec.makeMeasureSpec(height, MeasureSpec.EXACTLY)
        )

        layout(left, top, right, bottom)
    }

    private fun addFragment() {
        val fragmentManager = ((context as ThemedReactContext).currentActivity as FragmentActivity).supportFragmentManager

        var fragment = VeraFragment()
//        val veraBuilder = VeraConfiguration.Builder(
//            fragmentManager, this
//        ).setSiteIDs(listOf("sdk-sample-site"))
//            .setClientAppID("test")
//
//        veraBuilder.startWithoutLogin()



        fragmentManager.registerFragmentLifecycleCallbacks(object : FragmentManager.FragmentLifecycleCallbacks() {
            override fun onFragmentViewCreated(fm: FragmentManager, f: Fragment, v: View, savedInstanceState: Bundle?) {
                super.onFragmentViewCreated(fm, f, v, savedInstanceState)

                manuallyLayoutChildren()
            }
        }, false)
    }

    private fun configureComponent() {

    }
}