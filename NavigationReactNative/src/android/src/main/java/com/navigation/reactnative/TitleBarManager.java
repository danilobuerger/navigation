package com.navigation.reactnative;

import com.facebook.react.common.MapBuilder;
import com.facebook.react.uimanager.ThemedReactContext;
import com.facebook.react.uimanager.ViewGroupManager;

import java.util.Map;

import javax.annotation.Nonnull;

public class TitleBarManager extends ViewGroupManager<TitleBarView> {
    @Nonnull
    @Override
    public String getName() {
        return "NVTitleBar";
    }

    @Nonnull
    @Override
    protected TitleBarView createViewInstance(@Nonnull ThemedReactContext reactContext) {
        return new TitleBarView(reactContext);
    }

    @Override
    public Map<String, Object> getExportedCustomDirectEventTypeConstants() {
        return MapBuilder.<String, Object>builder()
            .put("topOnChangeBounds", MapBuilder.of("registrationName", "onChangeBounds"))
            .build();
    }
}
