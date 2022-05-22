package com.navigation.reactnative;

import android.view.MenuItem;
import android.view.ViewGroup;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.appcompat.widget.ActionMenuView;

import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.common.MapBuilder;
import com.facebook.react.module.annotations.ReactModule;
import com.facebook.react.uimanager.PixelUtil;
import com.facebook.react.uimanager.ThemedReactContext;
import com.facebook.react.uimanager.ViewGroupManager;
import com.facebook.react.uimanager.ViewManagerDelegate;
import com.facebook.react.uimanager.annotations.ReactProp;
import com.facebook.react.viewmanagers.NVBarButtonManagerDelegate;
import com.facebook.react.viewmanagers.NVBarButtonManagerInterface;

import java.util.Map;

@ReactModule(name = "NVBarButton")
public class BarButtonViewManager extends ViewGroupManager<BarButtonView> implements NVBarButtonManagerInterface<BarButtonView> {
    private final ViewManagerDelegate<BarButtonView> delegate;

    public BarButtonViewManager() {
        delegate = new NVBarButtonManagerDelegate<>(this);
    }

    @Nullable
    @Override
    protected ViewManagerDelegate<BarButtonView> getDelegate() {
        return delegate;
    }

    @NonNull
    @Override
    public String getName() {
        return "NVBarButton";
    }

    @NonNull
    @Override
    protected BarButtonView createViewInstance(@NonNull ThemedReactContext reactContext) {
        return new BarButtonView(reactContext);
    }

    @ReactProp(name = "title")
    public void setTitle(BarButtonView view, String title) {
        view.setTitle(title);
    }

    @ReactProp(name = "fontFamily")
    public void setFontFamily(BarButtonView view, String fontFamily) {
        view.setFontFamily(fontFamily);
    }

    @ReactProp(name = "fontWeight")
    public void setFontWeight(BarButtonView view, String fontWeight) {
        view.setFontWeight(fontWeight);
    }

    @ReactProp(name = "fontStyle")
    public void setFontStyle(BarButtonView view, String fontStyle) {
        view.setFontStyle(fontStyle);
    }

    @Override
    @ReactProp(name = "fontSize")
    public void setFontSize(BarButtonView view, float fontSize) {
        view.setFontSize(Math.round(fontSize));
    }

    @ReactProp(name = "image")
    public void setImage(BarButtonView view, ReadableMap icon) {
        view.setIconSource(icon);
    }

    @Override
    public void setSystemItem(BarButtonView view, @Nullable String value) {
    }

    @ReactProp(name = "showAsAction")
    public void setShowAsAction(BarButtonView view, Integer showAsAction) {
        view.setShowAsAction(showAsAction != null ? showAsAction : MenuItem.SHOW_AS_ACTION_NEVER);
    }

    @ReactProp(name = "actionBar")
    public void setActionBar(BarButtonView view, Boolean actionBar) {
        view.setActionBar(actionBar != null ? actionBar : false);
    }

    @ReactProp(name = "search")
    public void setSearch(BarButtonView view, Boolean search) {
        view.setSearch(search != null ? search : false);
    }

    @ReactProp(name = "width")
    public void setWidth(BarButtonView view, double width) {
        view.setLayoutParams(new ActionMenuView.LayoutParams(
            width > 0 ? (int) PixelUtil.toPixelFromDIP(width) : ViewGroup.LayoutParams.WRAP_CONTENT, ViewGroup.LayoutParams.WRAP_CONTENT)
        );
    }

    @ReactProp(name = "showActionView")
    public void setShowActionView(BarButtonView view, boolean showActionView) {
        view.setShowActionView(showActionView);
    }

    @ReactProp(name = "testID")
    public void setTestID(BarButtonView view, String testID) {
        view.testID = testID;
    }

    @Override
    protected void onAfterUpdateTransaction(@NonNull BarButtonView view) {
        super.onAfterUpdateTransaction(view);
        view.styleTitle();
    }

    @Override
    public Map<String, Object> getExportedCustomDirectEventTypeConstants() {
        return MapBuilder.<String, Object>builder()
            .put("onPress", MapBuilder.of("registrationName", "onPress"))
            .build();
    }
}
