﻿'use strict'
var cleanup = require('rollup-plugin-cleanup');
var { src, dest, series, parallel } = require('gulp');
var del = require('del');
var events = require('events');
var insert = require('gulp-insert');
var mocha = require('gulp-mocha');
var rename = require('gulp-rename');
var rollup = require('rollup');
var sucrase = require('@rollup/plugin-sucrase');
var terser = require('gulp-terser');
var typescript = require('@rollup/plugin-typescript');

events.EventEmitter.defaultMaxListeners = 0;

var items = [
    require('./build/npm/navigation/package.json'),
    Object.assign({ globals: { navigation: 'Navigation', react: 'React',
            'react-dom': 'ReactDOM' } }, 
        require('./build/npm/navigation-react/package.json')),
    Object.assign({ globals: { navigation: 'Navigation',
            'navigation-react': 'NavigationReact', react: 'React' } },
        require('./build/npm/navigation-react-mobile/package.json')),
    Object.assign({ globals: { navigation: 'Navigation', react: 'React',
            'navigation-react': 'NavigationReact', 'react-native': 'ReactNative' },
            format: 'es' },
        require('./build/npm/navigation-react-native/package.json')),
    Object.assign({ globals: { navigation: 'Navigation', react: 'React',
            'navigation-react': 'NavigationReact', 'react-native': 'ReactNative',
            'navigation-react-mobile': 'NavigationReactMobile' } },
        require('./build/npm/navigation-react-native-web/package.json')),
];
function rollupTask(name, input, file, globals, format) {
    var include = input.replace(name + '.ts', '**');
    var tsconfig = input.replace(name + '.ts', 'tsconfig.json');
    return rollup.rollup({
        input,
        external: Array.isArray(globals) ? globals : Object.keys(globals),
        plugins: input.indexOf('Test') === -1
            ? [ typescript({ include, tsconfig }), cleanup({ comments: 'none' }) ] 
            : [ sucrase({ include: input, transforms: ['typescript','jsx'] }) ]
    }).then((bundle) => bundle.write({ format, name, globals, file }));
}
function buildTask(name, input, file, globals, details) {
    var info = `/**
 * ${details.name} v${details.version}
 * (c) Graham Mendick - ${details.homepage}
 * License: ${details.license}
 */
`;
    return rollupTask(name, input, file, globals, 'iife')
        .then(() => (
            src(file)
                .pipe(insert.prepend(info))
                .pipe(dest('./build/dist'))
                .pipe(rename(file.replace(/js$/, 'min.js')))
                .pipe(terser())
                .pipe(insert.prepend(info))
                .pipe(dest('.'))
        ));
}
var cleanNative = () => {
    return del([
        './build/npm/navigation-react-native/android',
        './build/npm/navigation-react-native/ios',
        './build/npm/navigation-react-native/cpp',
        './build/npm/navigation-react-native/**/*NativeComponent.js'
    ]);
};
var packageNative = () => {
    return src([
        './NavigationReactNative/src/android/**/*',
        './NavigationReactNative/src/ios/**/*',
        './NavigationReactNative/src/cpp/**/*',
        './NavigationReactNative/src/**/*NativeComponent.js'
    ], {base: './NavigationReactNative/src'})
        .pipe(dest('./build/npm/navigation-react-native'));
};
var nameFunc = (func, name) => {
    func.displayName = name;
    return func;
};
var itemTasks = items.reduce((tasks, item) => {
    var packageName = item.name;
    var upperName = packageName.replace(/\b./g, (val) => val.toUpperCase());
    var name = upperName.replace(/-/g, '');
    var tsFrom = './' + name + '/src/' + name + '.ts';
    var jsTo = './build/dist/' + packageName.replace(/-/g, '.') + '.js';
    var jsPackageTo = './build/npm/' + packageName + '/' + packageName.replace(/-/g, '.') + '.js';
    item.name = upperName.replace(/-/g, ' ');
    var { globals = {}, format = 'cjs' } = item;
    tasks.buildTasks.push(
        nameFunc(() => buildTask(name, tsFrom, jsTo, globals, item), 'build' + name));
    tasks.packageTasks.push(
        nameFunc(() => rollupTask(name, tsFrom, jsPackageTo, globals, format), 'package' + name)
    );
    return tasks;
}, { buildTasks: [], packageTasks: [] });

var tests = [
    { name: 'NavigationRouting', to: 'navigationRouting.test.js' },
    { name: 'StateConfig', to: 'stateConfig.test.js' },
    { name: 'Navigation', to: 'navigation.test.js' },
    { name: 'NavigationData', to: 'navigationData.test.js' },
    { name: 'FluentNavigation', to: 'fluentNavigation.test.js' },
    { name: 'NavigationLink', to: 'navigationLink.test.js', folder: 'React', ext: 'tsx' },
    { name: 'NavigationBackLink', to: 'navigationBackLink.test.js', folder: 'React', ext: 'tsx' },
    { name: 'RefreshLink', to: 'refreshLink.test.js', folder: 'React', ext: 'tsx' },
    { name: 'FluentLink', to: 'fluentLink.test.js', folder: 'React', ext: 'tsx' },
    { name: 'SceneView', to: 'sceneView.test.js', folder: 'React', ext: 'tsx' },
    { name: 'NavigatingHook', to: 'navigatingHook.test.js', folder: 'ReactMobile', ext: 'tsx' },
    { name: 'NavigatedHook', to: 'navigatedHook.test.js', folder: 'ReactMobile', ext: 'tsx' },
    { name: 'UnloadingHook', to: 'unloadingHook.test.js', folder: 'ReactMobile', ext: 'tsx' },
    { name: 'UnloadedHook', to: 'unloadedHook.test.js', folder: 'ReactMobile', ext: 'tsx' },
    { name: 'NavigationMotion', to: 'navigationMotion.test.js', folder: 'ReactMobile', ext: 'tsx' }
];
function testTask(name, input, file) {
    var globals = [
        'mocha', 'assert', 'react', 'react-dom', 'react-dom/client', 'react-dom/server',
        'react-dom/test-utils', 'jsdom', 'tslib', 'navigation', 'navigation-react',
        'navigation-react-mobile'
    ];
    return rollupTask(name, input, file, globals, 'cjs')
        .then(() => 
            src(file)
                .pipe(mocha({ reporter: 'progress' }))
                .on('error', err => console.log(err.message))
        );
}
var testTasks = tests.reduce((tasks, test) => {
    var folder = './Navigation' + (test.folder || '') + '/test/';
    var file = folder + test.name + 'Test.' + (test.ext || 'ts');
    var to = './build/dist/' + test.to;
    tasks.push(nameFunc(() => testTask(test.name, file, to), 'test' + test.name));
    return tasks;
}, []);
var packageDeps = parallel(
    itemTasks.packageTasks.find(({displayName}) => displayName === 'packageNavigation'),
    itemTasks.packageTasks.find(({displayName}) => displayName === 'packageNavigationReact'),
    itemTasks.packageTasks.find(({displayName}) => displayName === 'packageNavigationReactMobile')
);
exports.build = parallel(...itemTasks.buildTasks);
exports.package = series(cleanNative, parallel(packageNative, ...itemTasks.packageTasks));
exports.test = series(packageDeps, parallel(...testTasks));
