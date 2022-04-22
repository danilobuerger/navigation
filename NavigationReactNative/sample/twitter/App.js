import React from 'react';
import {StateNavigator} from 'navigation';
import {NavigationHandler} from 'navigation-react';
import Home from './Home';
import Notifications from './Notifications';
import Tabs from './Tabs';
import Tweet from './Tweet';
import Timeline from './Timeline';
import Stack from './Stack';

const stateNavigator = new StateNavigator([
  {key: 'tabs'},
  {key: 'home'},
  {key: 'notifications'},
  {key: 'tweet', trackCrumbTrail: true},
  {key: 'timeline', trackCrumbTrail: true}
]);
stateNavigator.navigate('tabs');

const App = () => (
  <NavigationHandler stateNavigator={stateNavigator}>
    <Stack
      crumbStyle={from => from ? 'scale_in' : 'scale_out'}
      unmountStyle={from => from ? 'slide_in' : 'slide_out'}
    >
      <Stack.Scene name="tabs" view={<Tabs />} />
      <Stack.Scene name="home" view={<Home />} />
      <Stack.Scene name="notifications" view={<Notifications />} />
      <Stack.Scene name="tweet" view={<Tweet  />} />
      <Stack.Scene name="timeline" view={<Timeline  />} />
    </Stack>
  </NavigationHandler>
);

export default App;
