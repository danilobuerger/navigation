#pragma once

#include "NVBarButtonState.h"
#include <react/renderer/components/view/ConcreteViewShadowNode.h>
#include <react/renderer/components/navigation-react-native/EventEmitters.h>
#include <react/renderer/components/navigation-react-native/Props.h>
#include <react/renderer/imagemanager/ImageManager.h>

namespace facebook {
namespace react {

extern const char NVBarButtonComponentName[];

class NVBarButtonShadowNode final: public ConcreteViewShadowNode<
  NVBarButtonComponentName,
  NVBarButtonProps,
  NVBarButtonEventEmitter,
  NVBarButtonState
> {

public:
  using ConcreteViewShadowNode::ConcreteViewShadowNode;

  void setImageManager(const SharedImageManager &imageManager);

  static NVBarButtonState initialStateData(
                                           ShadowNodeFragment const &fragment,
                                           ShadowNodeFamilyFragment const &familyFragment,
                                           ComponentDescriptor const &componentDescriptor) {
    auto imageSource = ImageSource{ImageSource::Type::Invalid};
    return {
      imageSource,
      {imageSource, nullptr}};
  }

#pragma mark - LayoutableShadowNode

  Size measureContent(
                      LayoutContext const &layoutContext,
                      LayoutConstraints const &layoutConstraints) const override;
  void layout(LayoutContext layoutContext) override;

private:
  void updateStateIfNeeded();

  ImageSource getImageSource() const;

  SharedImageManager imageManager_;
};

} // namespace react
} // namespace facebook