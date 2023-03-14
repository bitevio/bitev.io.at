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
        "enabled": true,
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
        "admin": {
            "sortable": false,
            "readonly": false,
            "hidden": false,
            "required": false
        },
        "name": "controls",
        "type": "relationship",
        "unique": false,
        "hasMany": true,
        "relationTo": "controls",
        "linked": false,
        "required": false,
        "relationType": "one-to-many",
        "relationSideName": "employee",
        "private": false,
        "onSideRelation": true,
        "self": false,
        "selfName": "employee"
    }, {
        "admin": {
            "sortable": false,
            "readonly": false,
            "hidden": false,
            "required": false
        },
        "name": "planning",
        "type": "relationship",
        "unique": false,
        "hasMany": false,
        "relationTo": "planning",
        "linked": false,
        "required": false,
        "relationType": "many-to-one",
        "relationSideName": "employees",
        "private": false,
        "onSideRelation": true,
        "self": false,
        "selfName": "employees"
    }, {
        "name": "contact",
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
            "label": "Contact",
            "readonly": false,
            "hidden": false,
            "suffix": null,
            "prefix": null
        }
    }],
    "behavior": "basic"
})