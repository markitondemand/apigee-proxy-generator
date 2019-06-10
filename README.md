# Apigee Proxy Generator

A Yeoman generator to generate Apigee proxies for Apigee Edge.

## Installation

If you do not already have it on your system, install Yeoman globally.

`npm install -g yo`

Install the generator

`npm install -g apigee-proxy-generator`

### Add/Edit Proxy Files

* Add the Apigee files to the "generators > app > templates > apiproxy" directory. The files can be exported from [Apigee Edge](https://docs.apigee.com/api-platform/fundamentals/download-api-proxies) if the desired proxy was created via Apigee Edge UI.
* Add any other applicable files needed in the generator.
* Modify "generators > app > templates > apiproxy > proxy-name.xml" to include the applicable nodes, ie <Policies>. This file name 
will be updated to the "name" property passed in during generator execution.

## Generator Execution
1. Create a directory for your project, ie "example-api"
2. Run the generator in your project's root directory
3. `yo apigee-proxy`
