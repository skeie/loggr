import React from 'react-native';

if (__DEV__) {
    global.Perf = React.addons.Perf;
    var Immutable = require('immutable');
    var installDevTools = require('immutable-devtools');
    installDevTools(Immutable);
}
