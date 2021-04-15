# Get Started

npm

# ![Logo](shared/public/logo/logo-text-shade.svg)

Sinbix is ​​a mono repository that aims to provide an advanced solution for collaborative development of many different projects.

This mono-repository is based on Nx (Angular Workspace), where its main difference is getting rid of highly specialized concepts: more opportunities for different types of projects and their location.

In Sinbix, any projects can be located in any directory, while Nx limits the developer to a maximum of two directories (usually apps, libs), which creates great inconvenience with a very large number of projects. And the core of the "Sinbix" mono-repository is not connected with the types of projects developed in it, programming languages ​​or any technologies in general, which in the future will allow using Sinbix for convenient development of projects in various directions.

In addition to everything, this mono-repository is used to develop oneself, which is not fully implemented not in Nx, not in Angular (mono-repository). And this, in turn, creates additional difficulties in their further modifications.

This Sinbix repository contains over 40 projects

## Demo

Directory "[demo](demo)" сontains an example of a large client-server project developed according to the Sinbix concept.

## E2E

Directory "[e2e](e2e)" contains user-level stand-alone testing projects.

## Packages

Directory "[packages](packages)" contains published packages

## Plugins

Directory "[plugins](plugins)" contains plugins that define specific functionality for a mono-repository (based on Angular Devkit - Builders, Schematics)

## Shared

Directory "[shared](shared)" contains shared elements

## Sinbix

Directory "[sinbix](sinbix)" contains elements of the repository itself
