const { Collection } = require("bitev.io/types")

module.exports = Collection({
    "activeTask": false,
    "singleType": false,
    "hidden": true,
    "mode": "model",
    "slug": "Webhooks",
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
            "sortable": false,
            "readonly": false,
            "hidden": false,
            "required": false
        },
        "name": "name",
        "type": "string",
        "unique": true,
        "hasMany": false,
        "linked": true,
        "required": false,
        "relationType": "one-to-many",
        "private": false
    }, {
        "admin": {
            "sortable": false,
            "readonly": false,
            "hidden": false,
            "required": false
        },
        "name": "status",
        "type": "select",
        "unique": false,
        "hasMany": false,
        "linked": true,
        "required": false,
        "relationType": "one-to-many",
        "private": false
    }, {
        "admin": {
            "sortable": false,
            "readonly": false,
            "hidden": false,
            "required": false
        },
        "name": "method",
        "type": "select",
        "unique": false,
        "hasMany": false,
        "linked": true,
        "required": false,
        "options": ["get", "post"],
        "relationType": "one-to-many",
        "private": false
    }, {
        "admin": {
            "sortable": false,
            "readonly": false,
            "hidden": false,
            "required": false
        },
        "name": "actions",
        "type": "select",
        "unique": false,
        "hasMany": true,
        "linked": true,
        "required": false,
        "options": ["create", "update", "delete"],
        "relationType": "one-to-many",
        "private": false
    }, {
        "admin": {
            "sortable": false,
            "readonly": false,
            "hidden": false,
            "required": false
        },
        "name": "collections",
        "type": "select",
        "unique": false,
        "hasMany": true,
        "linked": true,
        "required": false,
        "relationType": "one-to-many",
        "private": false
    }]
})