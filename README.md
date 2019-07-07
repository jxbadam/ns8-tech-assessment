# NS8 Technical Challenge (or how I learned to hate javascript less and make it OO)

This submission is provided to prove that I might be worthy of either an interview,
a job offer, or a substantial lesson in the correct way to architect javascript
software. While I personally am hoping for one of the first two options the third
option always looms large.

### Instructions
#### Prerequisites
While this is a technical challenge and one would assume that the reviewer is able
to get things up and running by following "standard" NodeJS practices, this is not
always the case, thus the following items are given as required to run this software.

* NodeJS version 8 (or greater)
* The ability to read and follow simple directions and to have a great sense of humor

#### Installation and Available Commands
The following will install the library software upon which this program depends.
* npm install

The following commands are available via `package.json`.
<dl>
  <dt>npm start</dt>
  <dd>Perform all build operations and start the server</dd>

  <dt>npm run debug</dt>
  <dd>Perform all build operations and start the server in DEBUG mode (extra output to console)</dd>

  <dt>npm run lint</dt>
  <dd>Perform linting on the project. This will also be done as part of the build process.</dd>

  <dt>npm run build</dt>
  <dd>Perform all build operations but do not start the server</dd>

  <dt>npm run document</dt>
  <dd>Generate the project documentation (available in the [docs/](./docs/index.html) directory)</dd>

  <dt>npm run test</dt>
  <dd>Run all of the unit and integration tests. This will generate a coverage report available in [coverage/](./coverage/index.html)</dd>

  <dt>npm run debug-test</dt>
  <dd>Similar to the `debug` command above, but for the tests. Extra output will be included during the test run.</dd>

  <dt>npm run tsc</dt>
  <dd>Run the typescript compiler. No linting is performed. This does NOT send a runner to Tropical Smothie Cafe for a mocha madness smoothie. You will be disappoint.</dd>
</dl>

### Application Programming Interface (API)
This is the meat of the application and shows all of the endpoints and how they
are hooked together

### Errata (Gotchas and General Discussion)

#### Sources
Below is a list of URLs that I referenced while implementing this project.
##### Developing in TypeScript
https://www.typescriptlang.org/docs/home.html

##### Testing with Mocha / Chai and NYC (formerly Istanbul)
https://journal.artfuldev.com/unit-testing-node-applications-with-typescript-using-mocha-and-chai-384ef05f32b2
https://istanbul.js.org/docs/tutorials/typescript/
https://azimi.me/2016/09/30/nyc-mocha-typescript.1.html
https://medium.com/@RupaniChirag/writing-unit-tests-in-typescript-d4719b8a0a40
