const {
    Collection
} = require("@bitev.io/core/types");

module.exports = Collection({
    "activeTask": false,
    "singleType": false,
    "hidden": false,
    "mode": "model",
    "slug": "timesheets_models",
    "timestamps": true,
    "auth": {
        "enabled": false,
        "by": "email"
    },
    "admin": {
        "label": "Timesheets models",
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
            "label": "Timetables",
            "sortable": false,
            "readonly": false,
            "hidden": false,
            "required": false,
            "displayTemplate": "return `${item.length} Sélectionnés`"
        },
        "name": "timetables",
        "type": "relationship",
        "unique": false,
        "hasMany": true,
        "relationTo": "timetables",
        "linked": true,
        "required": false,
        "relationType": "one-to-many",
        "relationSideName": "timesheets_model",
        "private": false,
        "onSideRelation": false,
        "computedFx": {
            "active": true
        },
        "self": false,
        "selfName": "timetables"
    }, {
        "admin": {
            "label": "Total time",
            "sortable": false,
            "readonly": false,
            "hidden": false,
            "required": false,
            "displayTemplate": "${item.id}"
        },
        "name": "total_time",
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
            "fx": "var total_time = 0;\nfor (let timetable of item.timetables) {\n    total_time += timetable.total_time;\n}\n\nreturn total_time;",
            "needs": ["timetables"]
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
    }, {
        "admin": {
            "sortable": false,
            "readonly": false,
            "hidden": false,
            "required": false
        },
        "name": "plannings",
        "type": "relationship",
        "unique": false,
        "hasMany": true,
        "relationTo": "planning",
        "linked": false,
        "required": false,
        "relationType": "one-to-many",
        "relationSideName": "model",
        "private": false,
        "onSideRelation": true,
        "self": false,
        "selfName": "model"
    }],
    "behavior": "basic"
})