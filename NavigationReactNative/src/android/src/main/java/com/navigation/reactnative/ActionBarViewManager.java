package com.navigation.reactnative;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;

import com.facebook.react.common.MapBuilder;
import com.facebook.react.uimanager.ThemedReactContext;
import com.facebook.react.uimanager.ViewGroupManager;
import com.facebook.react.uimanager.ViewManagerDelegate;
import com.facebook.react.viewmanagers.NVActionBarManagerDelegate;
import com.facebook.react.viewmanagers.NVActionBarManagerInterface;

import java.util.Map;

public class ActionBarViewManager extends ViewGroupManager<ActionBarView> implements NVActionBarManagerInterface<ActionBarView> {
    private final ViewManagerDelegate<ActionBarView> delegate;

    public ActionBarViewManager() {
        delegate = new NVActionBarManagerDelegate<>(this);
    }

    @Nullable
    @Override
    protected ViewManagerDelegate<ActionBarView> getDelegate() {
        return delegate;
    }

    @NonNull
    @Override
    public String getName() {
        return "NVActionBar";
    }

    @NonNull
    @Override
    protected ActionBarView createViewInstance(@NonNull ThemedReactContext reactContext) {
        return new ActionBarView(reactContext);
    }

    @Override
    public Map<String, Object> getExportedCustomDirectEventTypeConstants() {
        return MapBuilder.<String, Object>builder()
            .put("topOnExpanded", MapBuilder.of("registrationName", "onExpanded"))
            .put("topOnCollapsed", MapBuilder.of("registrationName", "onCollapsed"))
            .put("topOnChangeBounds", MapBuilder.of("registrationName", "onChangeBounds"))
            .build();
    }
}
