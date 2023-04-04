const {
    Collection
} = require("@bitev.io/core/types");

module.exports = Collection({
    "activeTask": false,
    "singleType": false,
    "hidden": false,
    "mode": "model",
    "slug": "Roles",
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
        "name": "description",
        "type": "textarea",
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
        "name": "permissions",
        "type": "json",
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
        "name": "employees",
        "type": "relationship",
        "unique": false,
        "hasMany": true,
        "relationTo": "employees",
        "linked": false,
        "required": false,
        "relationType": "one-to-many",
        "relationSideName": "role",
        "private": false,
        "onSideRelation": true,
        "self": false,
        "selfName": "role"
    }, {
        "admin": {
            "sortable": false,
            "readonly": false,
            "hidden": false,
            "required": false
        },
        "name": "devices",
        "type": "relationship",
        "unique": false,
        "hasMany": true,
        "relationTo": "devices",
        "linked": false,
        "required": false,
        "relationType": "one-to-many",
        "relationSideName": "role",
        "private": false,
        "onSideRelation": true,
        "self": false,
        "selfName": "role"
    }]
})