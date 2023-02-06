const {
    Collection
} = require("bitev.io/types");

module.exports = Collection({
    "activeTask": false,
    "singleType": false,
    "hidden": false,
    "mode": "model",
    "slug": "timetables",
    "timestamps": true,
    "auth": {
        "enabled": false,
        "by": "email"
    },
    "admin": {
        "label": "Timetables",
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
    }, {
        "admin": {
            "label": "Days of_week",
            "sortable": false,
            "readonly": false,
            "hidden": false,
            "required": false,
            "displayTemplate": "${item.id}"
        },
        "name": "days_of_week",
        "type": "select",
        "unique": false,
        "hasMany": true,
        "linked": true,
        "required": false,
        "options": [{
            "label": "lundi",
            "value": "1"
        }, {
            "label": "mardi",
            "value": "2"
        }, {
            "label": "mercredi",
            "value": "3"
        }, {
            "label": "jeudi",
            "value": "4"
        }, {
            "label": "vendredi",
            "value": "5"
        }, {
            "label": "samedi",
            "value": "6"
        }, {
            "label": "dimanche",
            "value": "7"
        }],
        "relationType": "one-to-many",
        "private": false,
        "onSideRelation": false,
        "computedFx": {
            "active": true
        }
    }, {
        "admin": {
            "label": "Start time",
            "sortable": false,
            "readonly": false,
            "hidden": false,
            "required": false,
            "displayTemplate": "${item.id}"
        },
        "name": "start_time",
        "type": "time",
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
            "label": "End time",
            "sortable": false,
            "readonly": false,
            "hidden": false,
            "required": false,
            "displayTemplate": "${item.id}"
        },
        "name": "end_time",
        "type": "time",
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
            "label": "Day lag",
            "sortable": false,
            "readonly": false,
            "hidden": false,
            "required": false,
            "displayTemplate": "${item.id}"
        },
        "name": "day_lag",
        "type": "number",
        "unique": false,
        "hasMany": false,
        "linked": true,
        "defaultValue": 0,
        "required": false,
        "relationType": "one-to-many",
        "private": false,
        "onSideRelation": false,
        "computedFx": {
            "active": true
        }
    }, {
        "admin": {
            "label": "Included",
            "sortable": false,
            "readonly": false,
            "hidden": false,
            "required": false,
            "displayTemplate": "${item.id}"
        },
        "name": "included",
        "type": "boolean",
        "unique": false,
        "hasMany": false,
        "linked": true,
        "defaultValue": "false",
        "required": false,
        "relationType": "one-to-many",
        "private": false,
        "onSideRelation": false,
        "computedFx": {
            "active": true
        }
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
            "fx": "var gap = item.day_lag;\nvar start = moment(`2023-01-01T${item.start_time}`)\nvar end = moment(`2023-01-01T${item.end_time}`).add(gap, 'days');\nif (!item.included) {\nreturn (end.diff(start, 'hours') )*item.days_of_week.length*(-1);\n}\nreturn (end.diff(start, 'hours') )*item.days_of_week.length;\n",
            "needs": ["start_time", "end_time", "day_lag", "days_of_week", "included"]
        }
    }, {
        "name": "timesheets_model",
        "type": "relationship",
        "linked": false,
        "relationTo": "timesheets_models",
        "hasMany": false,
        "unique": false,
        "relationType": "many-to-one",
        "onSideRelation": true,
        "relationSideName": "timetables",
        "self": false,
        "selfName": "timetables"
    }],
    "behavior": "basic"
})