# Sinbix architecture for Angular apps

## Apps architecture pattern

### Simple App

```
.
├── apps
│   ├── nest-app
│   └── ...
├── e2e
│   ├── nest-app
│   └── ...
└── libs
    ├── nest-app
    ├── ...
    └── shared
        └── nest
```

### Subtypes App

```
.
├── apps
│   ├── nest-app
│   ├── nest-ms-app
│   └── ...
└── libs
    ├── nest-app
    ├── nest-ms-app
    ├── ...
    └── shared
        └── nest
```

## Libs Architecture pattern

```
.
├── apps
├── e2e
└── libs
    └── nest-app
        ├── data
        │   ├── assets
        │   ├── common
        │   └── ...
        ├── services       
        │   ├── ...
        │   └── .gitkeep
        ├── shell
        ├── ui
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
        └── nest
            ├── data
            │   ├── ...
            │   └── .gitkeep
            ├── db
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
