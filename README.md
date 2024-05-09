# Gestion Stock

## Challenges

### Migrate to the last angular version

- use pnpm
- use at least Angular 17
- principle of mimimum modification for src directory only
- do not use `ng update` but stay informed of what to do using the website https://update.angular.io/
- make sure there is no vulnerabilities anymore `npm audit` (or you need a very good reason)
- use a proxy for http request

### Update the code to use only standalone artefacts

- update all components, directives, pipes
- no more modules

### Update the code to have no more CommonModule

- use @if, @for instead of *ngIf, *ngFor
- use directly pipe if needed

### Use Lazyloading everywhere except home page

- use dynamic import
- use default export to short code.

### Use typings in form

- no more "as" in the code (dangerous)
- using nonnullable
- using formbuilder

### Validators

- custom validator with service
- error management in a field

- async validator with http service
- add debounce to async validator
- add disabled on submit button when form is pending

### Signal and computed

- define a signal from an existing observable
- define a signal from a value
- define a computed from one or many signals and show the performance gain.

### Passing the project with OnPush Strategy

- putting OnPush on AppComponent.

### Adding title on each page

- using a strategy title service

### StyleCSS

- no more array anymore in decorator metadata

### Router guards

- added guards on add page that redirect on legal page if more than 5 articles

### Clock component

- create a component with no input but an internal state : a clock.
- use it in the legal mention
- version with async pipe (good)
- version with cdref, takeuntildestroy and subscribe in the component constructor

### Refactor async function with observable

- of(undefined).pipe(tap, map, switchMap, catchError, finalize)
- test with 400 responses (modify the back end for it can return 400 errors)
- Recheck changeDetectorRef with error scenario

### Create Component with @Input and @Output

- create a async button component and use it in list component
- use it also in the form
- use @Input alias and transform
- use @Attribute or HostAttributeToken

### Component lifecycle

- use ngDoCheck to make an observable (subject) on change detection, this can be used for detecting the control untouched to control touched

### @defer

- refactor ListComponent to show the loading with @defer

### Adding the SSR version of the app

- use npx ng add @angular/ssr
- using temporary npm (it seems pnpm cannot work with ng add @angular/ssr)
- fix the issues :
  - inject token Document instead of using document
  - create injectable token for the origin of the REST API server ('http://localhost:3000', or '') and prefix all urls used with HttpClient.
  - fix the interval observable by using outside the angular zone

### Linter

- add the linter to angular
- make sure there is no console.log in the code.

### Create a common library

- creating a library widgets
- developing the library and using it in a same workspace
- migrating the widgets components (clock, async-btn)

### Using a internal registry

- Install and run Verdaccio
- publishing the library in verdaccio
- using the library in a nearby project

### Unit testing

- testing with Karma
- all tests must succeed
- all tests must covered the code
- all tests must be meaningful

### End to End testing

- Installing cypress
- using cypress by writing a script

### add 2 interceptors

- request interceptor: add a given token in the header request
- response interceptor: filter some articles when returned.

## Author

Jean-Louis GUENEGO <jlguenego@gmail.com>
