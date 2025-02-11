#ifdef RCT_NEW_ARCH_ENABLED
#import "NVBottomAppBarComponentView.h"

#import <react/renderer/components/navigation-react-native/ComponentDescriptors.h>
#import <react/renderer/components/navigation-react-native/EventEmitters.h>
#import <react/renderer/components/navigation-react-native/Props.h>
#import <react/renderer/components/navigation-react-native/RCTComponentViewHelpers.h>

#import "RCTFabricComponentsPlugins.h"

using namespace facebook::react;

@interface NVBottomAppBarComponentView () <RCTNVBottomAppBarViewProtocol>
@end

@implementation NVBottomAppBarComponentView

- (instancetype)initWithFrame:(CGRect)frame
{
    if (self = [super initWithFrame:frame]) {
    }
    return self;
}

#pragma mark - RCTComponentViewProtocol

+ (ComponentDescriptorProvider)componentDescriptorProvider
{
  return concreteComponentDescriptorProvider<NVBottomAppBarComponentDescriptor>();
}

@end

Class<RCTComponentViewProtocol> NVBottomAppBarCls(void)
{
  return NVBottomAppBarComponentView.class;
}

#endif
