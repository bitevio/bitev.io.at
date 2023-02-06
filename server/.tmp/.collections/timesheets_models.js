const {
    Collection
} = require("bitev.io/types");

module.exports = Collection({
    "icon": null,
    "singleType": false,
    "hidden": false,
    "slug": "timesheets_models",
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
        "label": "Timesheets models",
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
        "name": "timetables",
        "type": "relationship",
        "options": [],
        "relationTo": "timetables",
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
        "relationSideName": "timesheets_model",
        "computedFx": {
            "active": true,
            "fx": null,
            "needs": []
        },
        "admin": {
            "displayTemplate": "return `${item.length} Sélectionnés`",
            "mapLabel": "",
            "label": "Timetables",
            "readonly": false,
            "hidden": false,
            "suffix": null,
            "prefix": null
        },
        "self": false,
        "selfName": "timetables"
    }, {
        "name": "total_time",
        "type": "computed",
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
            "fx": "var total_time = 0;\nfor (let timetable of item.timetables) {\n    total_time += timetable.total_time;\n}\n\nreturn total_time;",
            "needs": ["timetables"]
        },
        "admin": {
            "displayTemplate": "${item.id}",
            "mapLabel": "",
            "label": "Total time",
            "readonly": false,
            "hidden": false,
            "suffix": null,
            "prefix": null
        }
    }, {
        "name": "description",
        "type": "textarea",
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
            "label": "Description",
            "readonly": false,
            "hidden": false,
            "suffix": null,
            "prefix": null
        }
    }, {
        "name": "plannings",
        "type": "relationship",
        "linked": false,
        "relationTo": "planning",
        "hasMany": true,
        "unique": false,
        "relationType": "one-to-many",
        "onSideRelation": true,
        "relationSideName": "model",
        "self": false,
        "selfName": "model"
    }]
})