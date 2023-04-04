const {
    Collection
} = require("@bitev.io/core/types");

module.exports = Collection({
    "activeTask": false,
    "singleType": false,
    "hidden": false,
    "mode": "model",
    "slug": "departments",
    "timestamps": true,
    "auth": {
        "enabled": false,
        "by": "email"
    },
    "admin": {
        "label": "Departments",
        "timestampsFormat": "YY-MM-DD ,HH:mm:ss a"
    },
    "fields": [{
        "admin": {
            "label": "Name",
            "sortable": false,
            "readonly": false,
            "hidden": false,
            "required": false,
            "displayTemplate": "${item.id}"
        },
        "name": "name",
        "type": "string",
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
            "label": "Description",
            "sortable": false,
            "readonly": false,
            "hidden": false,
            "required": false,
            "displayTemplate": "${item.id}"
        },
        "name": "description",
        "type": "textarea",
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
    }],
    "behavior": "basic"
})