---
page_type: sample
products:
- office-sp
languages:
- javascript
- typescript
extensions:
  contentType: samples
  technologies:
  - SharePoint Framework
  createdDate: 9/27/2020 12:00:00 AM
---

# Employee Tracking

## employee-tracking

This webpart track the Employee Work time and display employee own timesheet on web part to see the detail for current day.

### Setup the solution and WebPart

-   Clone the Solution repo
-   Run the below commands
    -   npm install
    -   gulp build
    -   gulp serve
-   Open the SharePoint Online site workbatch (i.e., <SharePoint Site URL>/_layouts/workbench.aspx)
-   App below Employee Time Tracking webpart
    -   WebPart Name: Employee Time Tracking

This package produces the following:

* lib/* - intermediate-stage commonjs build artifacts
* dist/* - the bundled script, along with other resources

### Build Package

-   gulp clean
-   gulp build
-   gulp bundle --ship
-   gulp package-solution --ship

### Features

-   Show Employee Current daye TimeSheet
-   Employee can add more Time logs

### Supports

-   IE11+, Chrome

### Solution

Solution|Author(s)
--------|---------
employee-tracking | Navneet Bhimani

### Version history

Version|Date|Comments
-------|----|--------
1.0.0.0|Sep 27, 2020|Initial release