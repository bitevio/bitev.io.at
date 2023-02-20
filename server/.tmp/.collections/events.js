const {
    Collection
} = require("bitev.io/types");

module.exports = Collection({
    "icon": null,
    "singleType": false,
    "hidden": false,
    "slug": "events",
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
        "label": "Events",
        "timestampsFormat": "YY-MM-DD ,HH:mm:ss a"
    },
    "fields": [{
        "name": "start_datetime",
        "type": "datetime-local",
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
            "displayTemplate": "return item.id",
            "mapLabel": "",
            "label": "Start datetime",
            "readonly": false,
            "hidden": false,
            "suffix": null,
            "prefix": null
        }
    }, {
        "name": "end_datetime",
        "type": "datetime-local",
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
            "displayTemplate": "return item.id",
            "mapLabel": "",
            "label": "End datetime",
            "readonly": false,
            "hidden": false,
            "suffix": null,
            "prefix": null
        }
    }, {
        "name": "planning",
        "type": "relationship",
        "options": [],
        "relationTo": "planning",
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
        "relationSideName": "events",
        "computedFx": {
            "active": true,
            "fx": null,
            "needs": []
        },
        "admin": {
            "displayTemplate": "return item.id",
            "mapLabel": "",
            "label": "Planning",
            "readonly": false,
            "hidden": false,
            "suffix": null,
            "prefix": null
        },
        "self": false,
        "selfName": "planning"
    }]
})