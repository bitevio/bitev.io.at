const { Collection } = require("bitev.io/types")

module.exports = Collection({
       "activeTask": false,
       "singleType": true,
       "hidden": false,
       "mode": "model",
       "slug": "Settings",
       "timestamps": true,
       "auth": {
           "enabled": false,
           "by": "email"
       },
       "admin": {
           "timestampsFormat": "YYYY-MM-DD HH:mm:ss"
       },
       "fields": [{
           "admin": {
               "label": "Poject Name",
               "sortable": false,
               "readonly": false,
               "hidden": false,
               "required": false
           },
           "name": "project_name",
           "type": "string",
           "unique": false,
           "hasMany": false,
           "linked": true,
           "required": false,
           "relationType": "one-to-many",
           "private": false
       }, {
           "admin": {
               "label": "Project title",
               "sortable": false,
               "readonly": false,
               "hidden": false,
               "required": false
           },
           "name": "project_title",
           "type": "string",
           "unique": false,
           "hasMany": false,
           "linked": true,
           "required": false,
           "relationType": "one-to-many",
           "private": false,
           "onSideRelation": false
       }, {
           "admin": {
               "label": "Project Description",
               "sortable": false,
               "readonly": false,
               "hidden": false,
               "required": false
           },
           "name": "project_description",
           "type": "textarea",
           "unique": false,
           "hasMany": false,
           "linked": true,
           "required": false,
           "relationType": "one-to-many",
           "private": false
       }, {
           "admin": {
               "label": "Project Logo",
               "sortable": false,
               "readonly": false,
               "hidden": false,
               "required": false
           },
           "name": "project_logo",
           "type": "media",
           "unique": false,
           "hasMany": false,
           "linked": true,
           "required": false,
           "relationType": "one-to-many",
           "private": false
       }, {
           "admin": {
               "label": "Public Background",
               "sortable": false,
               "readonly": false,
               "hidden": false,
               "required": false
           },
           "name": "public_background",
           "type": "media",
           "unique": false,
           "hasMany": false,
           "linked": true,
           "required": false,
           "relationType": "one-to-many",
           "private": false
       }, {
           "admin": {
               "label": "Public note",
               "sortable": false,
               "readonly": false,
               "hidden": false,
               "required": false
           },
           "name": "public_note",
           "type": "string",
           "unique": false,
           "hasMany": false,
           "linked": true,
           "required": false,
           "relationType": "one-to-many",
           "private": false
       }, {
           "admin": {
               "label": "Save all activity",
               "sortable": false,
               "readonly": false,
               "hidden": false,
               "required": false
           },
           "name": "activity",
           "type": "boolean",
           "unique": false,
           "hasMany": false,
           "linked": true,
           "defaultValue": false,
           "required": false,
           "relationType": "one-to-many",
           "private": false
       }, {
           "name": "mapbox_token",
           "type": "textarea",
           "options": [],
           "relationTo": "",
           "linked": true,
           "unique": false,
           "required": false,
           "defaultValue": null,
           "hasMany": false,
           "relationType": "one-to-many",
           "onSideRelation": false,
           "private": false,
           "relationSideName": "",
           "admin": {
               "label": "Mapbox token"
           }
       }]
   })