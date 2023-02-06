const {
    Collection
} = require("bitev.io/types");

module.exports = Collection({
    "activeTask": false,
    "singleType": false,
    "hidden": false,
    "mode": "model",
    "slug": "employees",
    "timestamps": true,
    "auth": {
        "enabled": false,
        "by": "email"
    },
    "admin": {
        "label": "Employees",
        "timestampsFormat": "YY-MM-DD ,HH:mm:ss a"
    },
    "fields": [{
        "admin": {
            "label": "First name",
            "sortable": false,
            "readonly": false,
            "hidden": false,
            "required": false,
            "displayTemplate": "${item.id}"
        },
        "name": "first_name",
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
            "label": "Last name",
            "sortable": false,
            "readonly": false,
            "hidden": false,
            "required": false,
            "displayTemplate": "${item.id}"
        },
        "name": "last_name",
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
            "label": "Role",
            "sortable": false,
            "readonly": false,
            "hidden": false,
            "required": false,
            "displayTemplate": "${item.id}"
        },
        "name": "role",
        "type": "relationship",
        "unique": false,
        "hasMany": false,
        "relationTo": "Roles",
        "linked": true,
        "required": false,
        "relationType": "many-to-one",
        "relationSideName": "employees",
        "private": false,
        "onSideRelation": false,
        "computedFx": {
            "active": true
        },
        "self": false,
        "selfName": "role"
    }, {
        "admin": {
            "label": "Facials",
            "sortable": false,
            "readonly": false,
            "hidden": false,
            "required": false,
            "displayTemplate": "${item.id}"
        },
        "name": "facials",
        "type": "media",
        "unique": false,
        "hasMany": true,
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
            "label": "Email",
            "sortable": false,
            "readonly": false,
            "hidden": false,
            "required": false,
            "displayTemplate": "${item.id}"
        },
        "name": "email",
        "type": "string",
        "unique": true,
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
            "label": "Password",
            "sortable": false,
            "readonly": false,
            "hidden": false,
            "required": false,
            "displayTemplate": "${item.id}"
        },
        "name": "password",
        "type": "password",
        "unique": false,
        "hasMany": false,
        "linked": true,
        "required": false,
        "relationType": "one-to-many",
        "private": true,
        "onSideRelation": false,
        "computedFx": {
            "active": true
        }
    }, {
        "name": "controls",
        "type": "relationship",
        "linked": false,
        "relationTo": "controls",
        "hasMany": true,
        "unique": false,
        "relationType": "one-to-many",
        "onSideRelation": true,
        "relationSideName": "employee",
        "self": false,
        "selfName": "employee"
    }, {
        "name": "planning",
        "type": "relationship",
        "linked": false,
        "relationTo": "planning",
        "hasMany": false,
        "unique": false,
        "relationType": "many-to-one",
        "onSideRelation": true,
        "relationSideName": "employees",
        "self": false,
        "selfName": "employees"
    }],
    "behavior": "basic"
})