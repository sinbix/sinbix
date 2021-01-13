# Sinbix architecture for Angular apps

## Apps architecture pattern

### Simple App

```
.
├── apps
│   ├── nest-app
│   ├── ng-app
│   └── ...
├── e2e
│   ├── nest-app
│   ├── ng-app
│   └── ...
└── libs
    ├── nest-app
    ├── ng-app
    ├── ...
    └── shared
        ├── domain
        ├── nest
        └── ng
```

### Subtypes App

```
.
├── apps
│   ├── nest-app
│   ├── nest-ms-nats
│   ├── nest-ms-rabbit
│   ├── ...
│   ├── ng-web-app
│   ├── ng-ios-app
│   ├── ng-android-app
│   ├── ng-desktop-app
│   └── ...
├── e2e
│   ├── nest-app
│   ├── nest-ms-nats
│   ├── nest-ms-rabbit
│   ├── ...
│   ├── ng-web-app
│   ├── ng-ios-app
│   ├── ng-android-app
│   ├── ng-desktop-app
│   └── ...
└── libs
    ├── nest-app
    ├── nest-ms-nats
    ├── nest-ms-rabbit
    ├── ...
    ├── ng-web-app
    ├── ng-ios-app
    ├── ng-android-app
    ├── ng-desktop-app
    ├── ...
    └── shared
        ├── domain
        ├── nest
        └── ng
```
