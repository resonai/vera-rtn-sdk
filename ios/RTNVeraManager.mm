#import <React/RCTLog.h>
#import <React/RCTUIManager.h>
#import <React/RCTViewManager.h>

@interface RTNVeraManager : RCTViewManager
@end

@implementation RTNVeraManager

RCT_EXPORT_MODULE(RTNVera)

RCT_EXPORT_VIEW_PROPERTY(config, NSDictionary)

@end
