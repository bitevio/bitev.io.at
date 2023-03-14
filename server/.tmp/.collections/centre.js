const {
    Collection
} = require("bitev.io/types");

module.exports = Collection({
    "icon": null,
    "singleType": false,
    "hidden": false,
    "slug": "centre",
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
        "label": "Centre",
        "timestampsFormat": "YY-MM-DD ,HH:mm:ss a"
    },
    "fields": [{
        "name": "libelle",
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
            "fx": "return ;",
            "needs": []
        },
        "admin": {
            "displayTemplate": "return item.id",
            "mapLabel": "",
            "label": "Libelle",
            "readonly": false,
            "hidden": false,
            "suffix": null,
            "prefix": null
        }
    }, {
        "name": "devices",
        "type": "relationship",
        "linked": false,
        "relationTo": "devices",
        "hasMany": true,
        "unique": false,
        "relationType": "one-to-many",
        "onSideRelation": true,
        "relationSideName": "centre",
        "self": false,
        "selfName": "centre"
    }]
})