const {
    Collection
} = require("bitev.io/types");

module.exports = Collection({
    "activeTask": false,
    "singleType": false,
    "hidden": false,
    "mode": "model",
    "slug": "controls",
    "timestamps": true,
    "auth": {
        "enabled": false,
        "by": "email"
    },
    "admin": {
        "label": "Controls",
        "timestampsFormat": "YY-MM-DD ,HH:mm:ss a"
    },
    "fields": [{
        "admin": {
            "label": "Employee",
            "sortable": false,
            "readonly": false,
            "hidden": false,
            "required": false,
            "displayTemplate": "return item.id"
        },
        "name": "employee",
        "type": "relationship",
        "unique": false,
        "hasMany": false,
        "relationTo": "employees",
        "linked": true,
        "required": false,
        "relationType": "many-to-one",
        "relationSideName": "controls",
        "private": false,
        "onSideRelation": false,
        "computedFx": {
            "active": true
        },
        "self": false,
        "selfName": "employee"
    }, {
        "admin": {
            "label": "Datetime",
            "sortable": false,
            "readonly": false,
            "hidden": false,
            "required": false,
            "displayTemplate": "${item.id}"
        },
        "name": "datetime",
        "type": "datetime-local",
        "unique": false,
        "hasMany": false,
        "linked": true,
        "required": false,
        "relationType": "one-to-many",
        "private": false,
        "onSideRelation": false,
        "computedFx": {
            "active": true
        }
    }, {
        "admin": {
            "label": "Action",
            "sortable": false,
            "readonly": false,
            "hidden": false,
            "required": false,
            "displayTemplate": "${item.id}"
        },
        "name": "action",
        "type": "select",
        "unique": false,
        "hasMany": false,
        "linked": true,
        "required": false,
        "options": [{
            "label": "Départ",
            "value": "departure"
        }, {
            "label": "Arrivée",
            "value": "arrival"
        }],
        "relationType": "one-to-many",
        "private": false,
        "onSideRelation": false,
        "computedFx": {
            "active": true
        }
    }, {
        "admin": {
            "label": "Device",
            "sortable": false,
            "readonly": false,
            "hidden": false,
            "required": false,
            "displayTemplate": "return item.id"
        },
        "name": "device",
        "type": "relationship",
        "unique": false,
        "hasMany": false,
        "relationTo": "devices",
        "linked": true,
        "required": false,
        "relationType": "many-to-one",
        "relationSideName": "controls",
        "private": false,
        "onSideRelation": false,
        "computedFx": {
            "active": true
        },
        "self": false,
        "selfName": "device"
    }, {
        "admin": {
            "label": "Function code",
            "sortable": false,
            "readonly": false,
            "hidden": false,
            "required": false,
            "displayTemplate": "return item.id"
        },
        "name": "function_code",
        "type": "relationship",
        "unique": false,
        "hasMany": false,
        "relationTo": "function_codes",
        "linked": true,
        "required": false,
        "relationType": "many-to-one",
        "relationSideName": "controls",
        "private": false,
        "onSideRelation": false,
        "computedFx": {
            "active": true
        },
        "self": false,
        "selfName": "function_code"
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
        "relationSideName": "controls",
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
    }, {
        "name": "details",
        "type": "json",
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
            "label": "Details",
            "readonly": true,
            "hidden": false,
            "suffix": null,
            "prefix": null
        }
    }],
    "behavior": "basic"
})