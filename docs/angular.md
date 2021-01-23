# Sinbix architecture for Angular apps

## Apps architecture pattern

### Simple App

```
.
├── apps
│   ├── ng-app
│   └── ...
├── e2e
│   ├── ng-app
│   └── ...
└── libs
    ├── ng-app
    ├── ...
    └── shared
        ├── domain
        └── ng
```

### Subtypes App

```
.
├── apps
│   ├── ng-web-app
│   ├── ng-ios-app
│   ├── ng-android-app
│   ├── ng-desktop-app
│   └── ...
├── e2e
│   ├── ng-web-app
│   ├── ng-ios-app
│   ├── ng-android-app
│   ├── ng-desktop-app
│   └── ...
└── libs
    ├── ng-web-app
    ├── ng-ios-app
    ├── ng-android-app
    ├── ng-desktop-app
    ├── ...
    └── shared
        ├── domain
        └── ng
```

## Libs Architecture pattern

```
.
├── apps
├── e2e
└── libs
    └── ng-app
        ├── data
        │   ├── assets
        │   ├── common
        │   ├── styles
        │   └── ...
        ├── features
        │   ├── main                
        │   └── ...
        ├── services       
        │   ├── ...
        │   └── .gitkeep
        ├── shell
        ├── ui
        │   ├── common
        │   ├── ...
        │   └── .gitkeep
        └── utils
            ├── ...
            └── .gitkeep            
```

### Shared Libs

```
.
├── apps
├── e2e
└── libs
    ├── ...
    └── shared
        ├── ...
        └── ng
            ├── data
            │   ├── ...
            │   └── .gitkeep
            ├── features
            │   ├── ...
            │   └── .gitkeep
            ├── services
            │   ├── ...
            │   └── .gitkeep
            ├── ui
            │   ├── ...
            │   └── .gitkeep
            └── utils
                ├── ...
                └── .gitkeep                 
```
