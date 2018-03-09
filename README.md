# OpenAPI Map ![](https://travis-ci.org/arno-di-loreto/openapi-map.svg?branch=master)

The OpenAPI Map (fka. OpenAPI Specification Visual Document) aims to help you find your way in the [OpenAPI Specification](https://github.com/OAI/OpenAPI-Specification) (fka. Swagger Specification) documentation. Note that it is not made to render an OpenAPI document.

It has been created by [Arnaud Lauret, the API Handyman](https://apihandyman.io).

## How to use it?
You can see it on [openapi-map.apihandyman.io](http://openapi-map.apihandyman.io/)

- Zoom in: Mouse scroll up
- Zoom out: Mouse scroll down
- Move: Mouse drag
- Clicking on a node expand or collapse it
- Moving mouse over a node shows its documentation

## How does it work?

### Configuration

The `data/spec-versions.json` file, loaded when `index.html` is load by browser, lists OpenAPI versions which are visible in top right navigation bar:

```json
[
  {
    "name": "Version 3.0",
    "id": "3.0",
    "url": "3.0.1.json",
    "root": "OpenAPI Object",
    "specificationurl": "https://github.com/OAI/OpenAPI-Specification/blob/master/versions/3.0.1.md"
  },
  {
    "name": "Version 2.0",
    "id": "2.0",
    "url": "2.0.json",
    "root": "Swagger Object",
    "specificationurl": "https://github.com/OAI/OpenAPI-Specification/blob/master/versions/2.0.md"
  }
]
```

| Property         | Description 
|------------------|-----------------
| name             | The name that will appear in tabs
| id               | The json file id to use for direct access `http://openapi-map.apihandyman.io?version=<id>`. Example: http://openapi-map.apihandyman.io?version=3.0 
| url              | The json file's url containing the data
| root             | The root object of this version
| specificationurl | The md file URL for this specification

The data of each version comes from a `<version>.json` file defined in `url`. This file has been generated on build based on data yaml files from folder `data/<version>`.
The data contains informations coming from the specification available at `specificationUrl`.

### Data files
The *data* folder contains sets of YAML files (one per version of the OpenAPI Specification) describing each object provided by the OpenAPI Specification.

```
data
├── 2.0
│   ├── Contact_Object.yaml
│   ├── Definitions_Object.yaml
    ...
│   ├── Swagger_Object.yaml
│   └── Tag_Object.yaml
└── 3.0.1
    ├── Callback_Object.yaml
    ├── Components_Object.yaml
    ...
    ├── OpenAPI_Object.yaml
    ...
    └── XML_Object.yaml
```

The content of these files is based on the OpenAPI Specification itself, some precisions have been added when needed.

```yaml
Some Object:
  description: |
    This is `Some Object`' description,
  allowExtension: true
  changelog:
    isNew: true
    details: Contains former root `responses`, `parameters` (split into `parameters` and `requestBodies`) and `definitions` (as `schemas`).
  fields:
    - 
      name: schemas
      type: "{Schema Object}"
      changelog:
        isInfo: true
        details: Replace root `definitions`
      description: An object to hold reusable [Schema Objects](#schemaObject).
```

### Data file structure

| Property         | Required | Description 
|------------------|----------|--------------
| name             |    no    | Optional name used for node's label, if not provided the label is the Object type.
| description      |    yes   | Object's description.
| allowExtension   |    no    | Tells this object is extensible with `x-` properties, false by default. If true a `x-` node it automatically added to the object's properties.
| changelog        |    no    | Describes the modifications from previous version
| changelog.isNew  |    no    | True is this is a new object
| changelog.isModified |no    | True is this is a modfied object
| changelog.description |no   | Changelog description, markdown can be used
| changelog.deletedProperties[]|no| List of deleted properties
| changelog.deletedProperties[].name |yes| Deleted property's name
| changelog.deletedProperties[].replacedBy |no| New property replacing it
| changelog.deletedProperties[].see |yes| Object's holding the new property
| fields[]        |   yes     | Object's properties list
| fields[].name   |   yes     | Property's name
| fields[].type   |   yes     | Property's type. Use `"[Some Object]"` or `"[string]"` for arrays. Use `"{Some Object}"`, `"{string}"` or `"{Custom Key, Some Object}"` for maps (a property representing the map key is automatically added to object's properties)
| fields[].required|   no     | Property is required if true, false by default
| fields[].description|   no  | Property's description.
| fields[].changelog | no     | Describes the modifications from previous version
| fields[].changelog.isNew  |    no    | True is this is a new object
| fields[].changelog.isModified |no    | True is this is a modfied object
| fields[].changelog.description |no   | Changelog description.

### About descriptions

All `description` properties can contain [markdown](https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet).
If a description contains some links, they are modified that way:

- A `target=_blank` is added to all links
- Anchor links coming from the specification, like this `[Schema Objects](#schemaObject)` are modified to target the `specificationurl` provided in version's configuration
- Links to `../examples` are update to target the OpenAPI github repository according to the `specificationurl` provided in version's configuration

## Build and modify

### Prerequisites

You need to install gulp and mocha and download dependencies in order to build the project:

```
npm install -g gulp-cli
npm install -g mocha
npm install
```

### Commands

| Command         | Decription
|-----------------|-----------
| `npm run server`| Launch a local instance with automatic live reload (test then build)
| `npm run build` | Tests then builds the OpenAPI Map in `dist`

### Code notes

| File | Description
|------|-------------
| `gulpfiles.js/build-data-files task` | Concatenates the data files and converts the result in json in a `dist/<version>.json` file for each data set.
| `web/static/js/buildTree.js` | Contains all functions used to build data tree from a `dist/<version>.json` file.
| `web/static/js/drawTree.js` | Contains all function to draw the D3JS tree in left panel using the data tree generated by `buildTree.js` functions.
| `web/static/templates.tooltip.hbs` | Handlebar template which is used to show documentation of each node. This template is compiled in the `dist/js/template.js` file by build task.
| `web/static/js/main.js` | Triggers data loading and tree generation when `web/static/index.html` is loaded by browser.

### Tools used

This project uses:

- [Gulp](https://gulpjs.com/) to automate development tasks
- [Mocha](https://mochajs.org/) to test the JS code
- [Bootstrap](http://getbootstrap.com/) framework to lessen the pain of doing HTML and CSS
- [Handlebars](http://handlebarsjs.com/) templates for the left panel showing the documentation
- [Font Awesome](https://fontawesome.com/) icons
- [Marked](https://github.com/chjj/marked) to convert markdown descriptions in HTML
- [YAML](http://www.yaml.org/) a human friendly data serialization
  standard for all programming languages to store the OpenAPI Map data
- [d3js](http://d3js.org/) to draw the map
  - The d3 tree is based on [D3.js Drag and Drop, Zoomable, Panning, Collapsible Tree with auto-sizing.](http://bl.ocks.org/robschmuecker/7880033) by [Rob Schmuecker](https://github.com/robschmuecker).
  - The tooltip has been inspired by [Adding tooltips to a d3.js graph](http://www.d3noob.org/2013/01/adding-tooltips-to-d3js-graph.html) by [3D Noob](http://www.d3noob.org/).

## CI and Hosting

This project is build by [Travis CI](travis-ci.org) and deployed on [Github pages](https://pages.github.com/) using the following files:

- .travis.yml: Travis CI Configuration file
- scripts/deploy.sh: Deploy script (which basically commits the result of the build on the gh-pages branch of this repository)

**WARNING**: Do not forget to update the `web/CNAME` file when changing Github Page domain using the Github admin.

## Licence
Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at [apache.org/licenses/LICENSE-2.0](http://www.apache.org/licenses/LICENSE-2.0)

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
