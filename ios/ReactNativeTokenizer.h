
#ifdef RCT_NEW_ARCH_ENABLED
#import "RNReactNativeTokenizerSpec.h"

@interface ReactNativeTokenizer : NSObject <NativeReactNativeTokenizerSpec>
#else
#import <React/RCTBridgeModule.h>

@interface ReactNativeTokenizer : NSObject <RCTBridgeModule>
#endif

@end
