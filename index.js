const squel = require('squel');

q = 'UNION("abc", SELECT(FIND("avg >= 10", "stud"), ["id", "sname"]))';

function OUTPUT(obj) {
    console.log(obj.toString());
}

function SELECT(obj, fields) {
    let s = squel.select();

    for (let field in fields) {
        s = s.field(fields[field]);
    }

    return s.from(obj);
}

function FIND(cond, obj) {
    return squel.select()
            .where(cond)
            .from(obj);
}

function UNION(obj1, obj2) {
    if (typeof obj1 === 'string') {
        obj1 = SELECT(obj1, ["*"]);
    }

    if (typeof obj2 === 'string') {
        obj2 = SELECT(obj2, ["*"]);
    }

    return obj1.union(obj2);
}

function EXCEPT(obj1, obj2) {
    if (typeof obj1 === 'string') {
        obj1 = SELECT(obj1, ["*"]);
    }

    if (typeof obj2 === 'string') {
        obj2 = SELECT(obj2, ["*"]);
    }

    return obj1.union(obj2);
}

function INTERSECT(obj1, obj2) {
    if (typeof obj1 === 'string') {
        obj1 = SELECT(obj1, ["*"]);
    }

    if (typeof obj2 === 'string') {
        obj2 = SELECT(obj2, ["*"]);
    }
}

eval(`OUTPUT(${q});`);