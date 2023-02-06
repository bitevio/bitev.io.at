const {
    Collection
} = require("bitev.io/types");

module.exports = Collection({
    "icon": null,
    "singleType": false,
    "hidden": false,
    "slug": "planning",
    "mode": "model",
    "timestamps": true,
    "behavior": "basic",
    "auth": {
        "enabled": false,
        "by": "email"
    },
    "calendar": {
        "startField": "",
        "endField": ""
    },
    "admin": {
        "label": "Planning",
        "timestampsFormat": "YY-MM-DD ,HH:mm:ss a"
    },
    "fields": [{
        "name": "name",
        "type": "string",
        "options": [],
        "relationTo": "",
        "eventsRef": "",
        "eventStartField": "",
        "eventEndField": "",
        "linked": true,
        "unique": false,
        "required": false,
        "defaultValue": null,
        "hasMany": false,
        "relationType": "one-to-many",
        "onSideRelation": false,
        "private": false,
        "relationSideName": "",
        "computedFx": {
            "active": true,
            "fx": null,
            "needs": []
        },
        "admin": {
            "displayTemplate": "${item.id}",
            "mapLabel": "",
            "label": "Name",
            "readonly": false,
            "hidden": false,
            "suffix": null,
            "prefix": null
        }
    }, {
        "name": "code",
        "type": "string",
        "options": [],
        "relationTo": "",
        "eventsRef": "",
        "eventStartField": "",
        "eventEndField": "",
        "linked": true,
        "unique": true,
        "required": false,
        "defaultValue": null,
        "hasMany": false,
        "relationType": "one-to-many",
        "onSideRelation": false,
        "private": false,
        "relationSideName": "",
        "computedFx": {
            "active": true,
            "fx": null,
            "needs": []
        },
        "admin": {
            "displayTemplate": "${item.id}",
            "mapLabel": "",
            "label": "Code",
            "readonly": false,
            "hidden": false,
            "suffix": null,
            "prefix": null
        }
    }, {
        "name": "start_date",
        "type": "date",
        "options": [],
        "relationTo": "",
        "eventsRef": "",
        "eventStartField": "",
        "eventEndField": "",
        "linked": true,
        "unique": false,
        "required": false,
        "defaultValue": null,
        "hasMany": false,
        "relationType": "one-to-many",
        "onSideRelation": false,
        "private": false,
        "relationSideName": "",
        "computedFx": {
            "active": true,
            "fx": null,
            "needs": []
        },
        "admin": {
            "displayTemplate": "${item.id}",
            "mapLabel": "",
            "label": "Start date",
            "readonly": false,
            "hidden": false,
            "suffix": null,
            "prefix": null
        }
    }, {
        "name": "end_date",
        "type": "date",
        "options": [],
        "relationTo": "",
        "eventsRef": "",
        "eventStartField": "",
        "eventEndField": "",
        "linked": true,
        "unique": false,
        "required": false,
        "defaultValue": null,
        "hasMany": false,
        "relationType": "one-to-many",
        "onSideRelation": false,
        "private": false,
        "relationSideName": "",
        "computedFx": {
            "active": true,
            "fx": null,
            "needs": []
        },
        "admin": {
            "displayTemplate": "${item.id}",
            "mapLabel": "",
            "label": "End date",
            "readonly": false,
            "hidden": false,
            "suffix": null,
            "prefix": null
        }
    }, {
        "name": "employees",
        "type": "relationship",
        "options": [],
        "relationTo": "employees",
        "eventsRef": "",
        "eventStartField": "",
        "eventEndField": "",
        "linked": true,
        "unique": false,
        "required": false,
        "defaultValue": null,
        "hasMany": true,
        "relationType": "one-to-many",
        "onSideRelation": false,
        "private": false,
        "relationSideName": "planning",
        "computedFx": {
            "active": true,
            "fx": null,
            "needs": []
        },
        "admin": {
            "displayTemplate": "",
            "mapLabel": "",
            "label": "Employees",
            "readonly": false,
            "hidden": false,
            "suffix": null,
            "prefix": null
        },
        "self": false,
        "selfName": "employees"
    }, {
        "name": "model",
        "type": "relationship",
        "options": [],
        "relationTo": "timesheets_models",
        "eventsRef": "",
        "eventStartField": "",
        "eventEndField": "",
        "linked": true,
        "unique": false,
        "required": false,
        "defaultValue": null,
        "hasMany": false,
        "relationType": "many-to-one",
        "onSideRelation": false,
        "private": false,
        "relationSideName": "plannings",
        "computedFx": {
            "active": true,
            "fx": null,
            "needs": []
        },
        "admin": {
            "displayTemplate": "${item.id}",
            "mapLabel": "",
            "label": "Model",
            "readonly": false,
            "hidden": false,
            "suffix": null,
            "prefix": null
        },
        "self": false,
        "selfName": "model"
    }]
})