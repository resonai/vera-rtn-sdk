#import <React/RCTLog.h>
#import <React/RCTUIManager.h>
#import <React/RCTViewManager.h>
#import <VeraSDK/VeraSDK-Swift.h>

@interface RTNVeraManager : RCTViewManager
@end

@implementation RTNVeraManager

RCT_EXPORT_MODULE(RTNVera)

RCT_EXPORT_VIEW_PROPERTY(config, NSDictionary)
RCT_EXPORT_VIEW_PROPERTY(onLogin, RCTDirectEventBlock)
RCT_EXPORT_VIEW_PROPERTY(onLogout, RCTDirectEventBlock)
RCT_EXPORT_VIEW_PROPERTY(onRefreshToken, RCTDirectEventBlock)
RCT_EXPORT_VIEW_PROPERTY(onHandleMessage, RCTDirectEventBlock)

@end
