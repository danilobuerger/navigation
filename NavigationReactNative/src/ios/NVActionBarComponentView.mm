#ifdef RCT_NEW_ARCH_ENABLED
#import "NVActionBarComponentView.h"

#import <react/renderer/components/navigation-react-native/ComponentDescriptors.h>
#import <react/renderer/components/navigation-react-native/EventEmitters.h>
#import <react/renderer/components/navigation-react-native/Props.h>
#import <react/renderer/components/navigation-react-native/RCTComponentViewHelpers.h>

#import "RCTFabricComponentsPlugins.h"

using namespace facebook::react;

@interface NVActionBarComponentView () <RCTNVActionBarViewProtocol>
@end

@implementation NVActionBarComponentView

- (instancetype)initWithFrame:(CGRect)frame
{
    if (self = [super initWithFrame:frame]) {
    }
    return self;
}

#pragma mark - RCTComponentViewProtocol

+ (ComponentDescriptorProvider)componentDescriptorProvider
{
  return concreteComponentDescriptorProvider<NVActionBarComponentDescriptor>();
}

@end

Class<RCTComponentViewProtocol> NVActionBarCls(void)
{
  return NVActionBarComponentView.class;
}

#endif
