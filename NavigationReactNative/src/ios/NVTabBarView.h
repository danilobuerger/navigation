#import <UIKit/UIKit.h>
#import <React/RCTComponent.h>

@interface NVTabBarView : UIView <UITabBarControllerDelegate>

@property (nonatomic, assign) NSInteger tabCount;
@property (nonatomic, copy) UIColor *barTintColor;
@property (nonatomic, copy) UIColor *badgeColor;
@property (nonatomic, assign) BOOL scrollsToTop;
@property (nonatomic, copy) NSString *fontFamily;
@property (nonatomic, copy) NSString *fontWeight;
@property (nonatomic, copy) NSString *fontStyle;
@property (nonatomic, copy) NSNumber *fontSize;
@property (nonatomic, assign) NSInteger mostRecentEventCount;
@property (nonatomic, copy) RCTDirectEventBlock onTabSelected;

@end
