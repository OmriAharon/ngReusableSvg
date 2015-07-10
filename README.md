## ngReusableSvg - Reuse SVG Files with CSS Modifications
Creates a reusable SVG component out of an external SVG file. This lets you control your SVGs using CSS.

## Dependencies

* AngularJS v1.3

## How to get it?

### Manual Download

Download from [here](http://omriaharon.github.io/ngReusableSvg/)

### Bower

    bower install ngReusableSvg

### Usage

1. Add `ngReusableSvg.js` to your main file (index.html). 

2. Set `ngReusableSvg` as a dependency in your module

        var myApp = angular.module('myApp', ['ngReusableSvg'])

3. Add `oa-reusable-svg` onto an `<object>` tag:

        <object oa-reusable-svg
                id="my-svg"
                data="my_icon.svg"
                type="image/svg+xml"
                class="svg-class"
                height="30"
                width="30">
        </object>

### ngReusableSvg Attributes

* **svgClick** - an action to be performed when the SVG image is clicked.

* **notifyReady** - a boolean (needs to be initialized as false) that will be set to true when the switch has been performed. Useful if you need to know when the image is ready, for instance, when cloning the element.
