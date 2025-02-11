#ifdef RCT_NEW_ARCH_ENABLED
#import <UIKit/UIKit.h>
#import <React/RCTViewComponentView.h>
#import "NVSceneController.h"

NS_ASSUME_NONNULL_BEGIN

@interface NVSearchBarComponentView : RCTViewComponentView <UISearchResultsUpdating, UISearchBarDelegate, NVSearchBar>

@property UISearchController *searchController;
@property (nonatomic, assign) BOOL hideWhenScrolling;
@property (nonatomic, assign) NSInteger mostRecentEventCount;
@property (nonatomic, assign) NSInteger mostRecentButtonEventCount;

@end

NS_ASSUME_NONNULL_END
#endif
