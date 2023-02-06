const {
    Collection
} = require("bitev.io/types");

module.exports = Collection({
    "icon": null,
    "singleType": false,
    "hidden": false,
    "slug": "controls",
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
        "label": "Controls",
        "timestampsFormat": "YY-MM-DD ,HH:mm:ss a"
    },
    "fields": [{
        "name": "employee",
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
        "hasMany": false,
        "relationType": "many-to-one",
        "onSideRelation": false,
        "private": false,
        "relationSideName": "controls",
        "computedFx": {
            "active": true,
            "fx": null,
            "needs": []
        },
        "admin": {
            "displayTemplate": "return item.id",
            "mapLabel": "",
            "label": "Employee",
            "readonly": false,
            "hidden": false,
            "suffix": null,
            "prefix": null
        },
        "self": false,
        "selfName": "employee"
    }, {
        "name": "datetime",
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
            "displayTemplate": "${item.id}",
            "mapLabel": "",
            "label": "Datetime",
            "readonly": false,
            "hidden": false,
            "suffix": null,
            "prefix": null
        }
    }, {
        "name": "action",
        "type": "select",
        "options": [{
            "label": "Départ",
            "value": "departure"
        }, {
            "label": "Arrivée",
            "value": "arrival"
        }],
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
            "label": "Action",
            "readonly": false,
            "hidden": false,
            "suffix": null,
            "prefix": null
        }
    }, {
        "name": "device",
        "type": "relationship",
        "options": [],
        "relationTo": "devices",
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
        "relationSideName": "controls",
        "computedFx": {
            "active": true,
            "fx": null,
            "needs": []
        },
        "admin": {
            "displayTemplate": "return item.id",
            "mapLabel": "",
            "label": "Device",
            "readonly": false,
            "hidden": false,
            "suffix": null,
            "prefix": null
        },
        "self": false,
        "selfName": "device"
    }, {
        "name": "function_code",
        "type": "relationship",
        "options": [],
        "relationTo": "function_codes",
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
        "relationSideName": "controls",
        "computedFx": {
            "active": true,
            "fx": null,
            "needs": []
        },
        "admin": {
            "displayTemplate": "return item.id",
            "mapLabel": "",
            "label": "Function code",
            "readonly": false,
            "hidden": false,
            "suffix": null,
            "prefix": null
        },
        "self": false,
        "selfName": "function_code"
    }]
})