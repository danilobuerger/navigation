// @flow strict-local

import type {ViewProps} from 'react-native/Libraries/Components/View/ViewPropTypes';
import type {HostComponent} from 'react-native';
import codegenNativeComponent from 'react-native/Libraries/Utilities/codegenNativeComponent';

type NativeProps = $ReadOnly<{|
  ...ViewProps,
  title: string,
  fontFamily: string,
  fontWeight: string,
  fontStyle: string,
  fontSize?: WithDefault<Float, -1>,
  testID: string,
  badge: string,
  badgeColor: ColorValue,
  image: ImageSource,
  systemItem: string,
  onPress: DirectEventHandler<null>
|}>;

export default (codegenNativeComponent<NativeProps>(
   'NVTabBarItem',
   {interfaceOnly: true}
): HostComponent<NativeProps>);
