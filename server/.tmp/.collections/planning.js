const {
    Collection
} = require("bitev.io/types");

module.exports = Collection({
    "activeTask": false,
    "singleType": false,
    "hidden": false,
    "mode": "model",
    "slug": "planning",
    "timestamps": true,
    "auth": {
        "enabled": false,
        "by": "email"
    },
    "admin": {
        "label": "Planning",
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
            "label": "Code",
            "sortable": false,
            "readonly": false,
            "hidden": false,
            "required": false,
            "displayTemplate": "${item.id}"
        },
        "name": "code",
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
            "label": "Start date",
            "sortable": false,
            "readonly": false,
            "hidden": false,
            "required": false,
            "displayTemplate": "${item.id}"
        },
        "name": "start_date",
        "type": "date",
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
            "label": "End date",
            "sortable": false,
            "readonly": false,
            "hidden": false,
            "required": false,
            "displayTemplate": "${item.id}"
        },
        "name": "end_date",
        "type": "date",
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
            "label": "Employees",
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
        "linked": true,
        "required": false,
        "relationType": "one-to-many",
        "relationSideName": "planning",
        "private": false,
        "onSideRelation": false,
        "computedFx": {
            "active": true
        },
        "self": false,
        "selfName": "employees"
    }, {
        "admin": {
            "label": "Model",
            "sortable": false,
            "readonly": false,
            "hidden": false,
            "required": false,
            "displayTemplate": "${item.id}"
        },
        "name": "model",
        "type": "relationship",
        "unique": false,
        "hasMany": false,
        "relationTo": "timesheets_models",
        "linked": true,
        "required": false,
        "relationType": "many-to-one",
        "relationSideName": "plannings",
        "private": false,
        "onSideRelation": false,
        "computedFx": {
            "active": true
        },
        "self": false,
        "selfName": "model"
    }, {
        "admin": {
            "label": "Expired",
            "sortable": false,
            "readonly": false,
            "hidden": false,
            "required": false,
            "displayTemplate": "return item.id"
        },
        "name": "expired",
        "type": "computed",
        "unique": false,
        "hasMany": false,
        "linked": true,
        "required": false,
        "relationType": "one-to-many",
        "private": false,
        "onSideRelation": false,
        "computedFx": {
            "active": true,
            "fx": "return moment().isAfter(item.end_date) || false",
            "needs": ["start_date", "end_date"]
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
        "relationSideName": "planning",
        "private": false,
        "onSideRelation": true,
        "self": false,
        "selfName": "planning"
    }, {
        "admin": {
            "sortable": false,
            "readonly": false,
            "hidden": false,
            "required": false
        },
        "name": "events",
        "type": "relationship",
        "unique": false,
        "hasMany": true,
        "relationTo": "events",
        "linked": false,
        "required": false,
        "relationType": "one-to-many",
        "relationSideName": "planning",
        "private": false,
        "onSideRelation": true,
        "self": false,
        "selfName": "planning"
    }],
    "behavior": "basic"
})