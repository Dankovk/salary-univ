# Map of Ukraine with D3.js (TopoJSON -> GeoJSON)

https://observablehq.com/@ignore_you/map-of-ukraine-with-d3-js-topojson-geojson@275

View this notebook in your browser by running a web server in this folder. For
example:

~~~sh
python -m SimpleHTTPServer
~~~

Or, use the [Observable Runtime](https://github.com/observablehq/runtime) to
import this module directly into your application. To npm install:

~~~sh
npm install @observablehq/runtime@4
npm install https://api.observablehq.com/@ignore_you/map-of-ukraine-with-d3-js-topojson-geojson.tgz?v=3
~~~

Then, import your notebook and the runtime as:

~~~js
import {Runtime, Inspector} from "@observablehq/runtime";
import define from "@ignore_you/map-of-ukraine-with-d3-js-topojson-geojson";
~~~

To log the value of the cell named “foo”:

~~~js
const runtime = new Runtime();
const main = runtime.module(define);
main.value("foo").then(value => console.log(value));
~~~
