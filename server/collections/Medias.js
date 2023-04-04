const {
    Collection
} = require("@bitev.io/core/types");

module.exports = Collection({
    "activeTask": false,
    "singleType": false,
    "hidden": false,
    "mode": "model",
    "slug": "Medias",
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
        "name": "ref",
        "type": "string",
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
        "name": "driver",
        "type": "string",
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
        "name": "filename",
        "type": "string",
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
        "name": "filedisk",
        "type": "string",
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
        "name": "asseturl",
        "type": "string",
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
        "name": "url",
        "type": "string",
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
        "name": "details",
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
        "name": "data",
        "type": "json",
        "unique": false,
        "hasMany": false,
        "linked": true,
        "required": false,
        "relationType": "one-to-many",
        "private": false
    }]
})