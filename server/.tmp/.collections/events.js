const {
    Collection
} = require("bitev.io/types");

module.exports = Collection({
    "activeTask": false,
    "singleType": false,
    "hidden": false,
    "mode": "model",
    "slug": "events",
    "timestamps": true,
    "auth": {
        "enabled": false,
        "by": "email"
    },
    "admin": {
        "label": "Events",
        "timestampsFormat": "YY-MM-DD ,HH:mm:ss a"
    },
    "fields": [{
        "admin": {
            "label": "Start datetime",
            "sortable": false,
            "readonly": false,
            "hidden": false,
            "required": false,
            "displayTemplate": "return item.id"
        },
        "name": "start_datetime",
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
            "label": "End datetime",
            "sortable": false,
            "readonly": false,
            "hidden": false,
            "required": false,
            "displayTemplate": "return item.id"
        },
        "name": "end_datetime",
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
            "label": "Planning",
            "sortable": false,
            "readonly": false,
            "hidden": false,
            "required": false,
            "displayTemplate": "return item.id"
        },
        "name": "planning",
        "type": "relationship",
        "unique": false,
        "hasMany": false,
        "relationTo": "planning",
        "linked": true,
        "required": false,
        "relationType": "many-to-one",
        "relationSideName": "events",
        "private": false,
        "onSideRelation": false,
        "computedFx": {
            "active": true
        },
        "self": false,
        "selfName": "planning"
    }],
    "behavior": "basic"
})