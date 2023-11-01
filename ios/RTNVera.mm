#ifdef RCT_NEW_ARCH_ENABLED
#import "RTNVera.h"

#import <react/renderer/components/RTNVeraSpec/ComponentDescriptors.h>
#import <react/renderer/components/RTNVeraSpec/EventEmitters.h>
#import <react/renderer/components/RTNVeraSpec/Props.h>
#import <react/renderer/components/RTNVeraSpec/RCTComponentViewHelpers.h>
#import <react/RCTConversions.h>
#import <React/RCTViewManager.h>
#import <VeraSDK/VeraSDK-Swift.h>

#import "RCTFabricComponentsPlugins.h"

using namespace facebook::react;

@interface RTNVera () <RCTRTNVeraViewProtocol>
@end

@implementation RTNVera {
    UIView *_view;
}

+ (ComponentDescriptorProvider)componentDescriptorProvider {
    return concreteComponentDescriptorProvider<RTNVeraComponentDescriptor>();
}

- (instancetype)initWithFrame:(CGRect)frame {
    if (self = [super initWithFrame:frame]) {
        static const auto defaultProps = std::make_shared<const RTNVeraProps>();
        _props = defaultProps;

        _view = [VeraObjC view];
        self.contentView = _view;
    }

    return self;
}

- (void)updateProps:(Props::Shared const &)props oldProps:(Props::Shared const &)oldProps {
    const auto &oldViewProps = *std::static_pointer_cast<RTNVeraProps const>(_props);
    const auto &newViewProps = *std::static_pointer_cast<RTNVeraProps const>(props);

    if (oldViewProps.config.app.clientId != newViewProps.config.app.clientId) {
        auto config = newViewProps.config;

        NSURL *domain = [[NSURL alloc] initWithString:RCTNSStringFromString(config.domain)];

        NSMutableArray *siteIds = [NSMutableArray new];
        std::for_each(config.app.siteIds.begin(), config.app.siteIds.end(), ^(std::string str) {
            NSString *siteId = [NSString stringWithUTF8String:str.c_str()];
            [siteIds addObject:siteId];
        });

        VeraAppObjC *objcApp = [[VeraAppObjC alloc] initWithClientId:RCTNSStringFromString(config.app.clientId)
                                                             siteIds:siteIds
                                               shouldShowCloseButton:config.app.shouldShowCloseButton
                                                          hideHeader:config.app.hideHeader
                                            implementsAuthentication:config.app.implementsAuthentication
                                                      deepLinkPrefix:RCTNSStringFromString(config.app.deeplinkPrefix)];

        VeraConfigurationObjC *configuration = [[VeraConfigurationObjC alloc] initWithDomain:domain
                                                                                    username:config.username.length() == 0 ? nil : RCTNSStringFromString(config.username)
                                                                                         app:objcApp
                                                                                    language:RCTNSStringFromString(config.language)];

        [VeraObjC useConfiguration:configuration];
    }

    [super updateProps:props oldProps:oldProps];
}

@end

Class<RCTComponentViewProtocol> RTNVeraCls(void) {
    return RTNVera.class;
}
#endif