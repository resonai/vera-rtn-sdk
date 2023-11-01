#import <React/RCTViewComponentView.h>
#import <UIKit/UIKit.h>
#import <React/RCTComponent.h>

NS_ASSUME_NONNULL_BEGIN

@interface RTNVera : RCTViewComponentView

@property (nonatomic, copy) RCTDirectEventBlock onLogin;
@property (nonatomic, copy) RCTDirectEventBlock onLogout;
@property (nonatomic, copy) RCTDirectEventBlock onRefreshToken;
@property (nonatomic, copy) RCTDirectEventBlock onHandleMessage;

@end

NS_ASSUME_NONNULL_END
