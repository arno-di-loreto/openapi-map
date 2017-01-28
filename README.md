# OpenAPI Specification Visual Documentation
This is a prototype of a D3 rendering of the [OpenAPI specification](https://openapis.org/specification) (fka Swagger Specification) to provide an easy to read visual documentation.
It is developed by [Arnaud Lauret, the API Handyman](https://github.com/arno-di-loreto).

This is NOT a rendering of an API OpenAPI specification.

## How to use it?
You can see a live demo on [apihandyman.io](http://openapi-specification-visual-documentation.apihandyman.io/)

- Zoom in: Mouse scroll up
- Zoom out: Mouse scroll down
- Move: Mouse drag
- Clicking on a node expand or collapse it
- Moving mouse over a node shows its documentation


## How does it work?

*data* contains a set of YAML files describing each object provided by the OpenAPI specification.
The content of these files is based on the OpenAPI specification itself, some precisions have been added when needed.

```yaml
Info Object:
  description: Provides metadata about the API. The metadata can be used by the clients if needed.
  allowExtension: true
  openapiType: true
  fields:
    - name: title
      type: string
      required: true
      description: The title of the application.
    - name: description
      type: string
      gfm: true
      description: A short description of the application.
    - name: termsOfService
      type: string
      description: The Terms of Service for the API.
    - name: contact
      type: Contact Object
      description: The contact information for the exposed API.
    - name: licence
      type: Licence Object
      description: The license information for the exposed API.
    - name: version
      type: string
      required: true
      description: Provides the version of the application API (not to be confused with the specification version).

```

All these files are concatened and converted in json in the data.json.

A tree is generated from the json file on runtime. All descriptions are converted from markdown to html.

## Tools used

This project use:
- [Bootstrap](http://getbootstrap.com/) framework
- [Handlebars](http://handlebarsjs.com/) templates
- [Font Awesome](https://fortawesome.github.io/Font-Awesome/) icons
- [Marked](https://github.com/chjj/marked) markdown parser and compiler
- [YAML](http://www.yaml.org/) a human friendly data serialization
  standard for all programming languages.
- [d3js](http://d3js.org/) tree
  - The d3 tree is based on [D3.js Drag and Drop, Zoomable, Panning, Collapsible Tree with auto-sizing.](http://bl.ocks.org/robschmuecker/7880033) by [Rob Schmuecker](https://github.com/robschmuecker).
  - The tooltip has been inspired by [Adding tooltips to a d3.js graph](http://www.d3noob.org/2013/01/adding-tooltips-to-d3js-graph.html) by [3D Noob](http://www.d3noob.org/).

## How to build and modify

You need to install gulp in order to build the project:
```
npm install -g gulp
```

Command lines to download project's dependancies:
```
npm install
```

Command line to build the project (generated files will be available in dist folder):
```
gulp
```

Command line to launch a local instance with automatic live reload if some files are modified:
```
gulp serve
```

## Licence
Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at [apache.org/licenses/LICENSE-2.0](http://www.apache.org/licenses/LICENSE-2.0)

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
