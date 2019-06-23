var o = document.getElementById('output');

var operators = {
    "∪": {
        name: "UNION",
    },
    "*": {
        name: "INTERSECT",
    },
    "-": {
        name: "EXCEPT",
    },
    "×": {
        name: "MULTIPLY",
    },
    "∞": {
        name: "NATURAL_JOIN",
    },
    "∝": {
        name: "SEMIJOIN_JOIN",
    }
};

function OUTPUT(obj) {
    var out = obj.toString();
    output.innerText = out;
}

function SELECT(fields, obj) {
    // console.log('#1 SELECT obj', obj);

    if (typeof obj === 'string') {
        obj = squel.select({ autoQuoteTableNames: true, autoQuoteFieldNames: true }).from(obj);
    }

    // console.log('#2 SELECT obj', obj);

    obj.deleteAllFields();

    for (let field in fields) {
        obj = obj.field(fields[field]);
    }

    return obj;
}

function FIND(cond, obj) {
    return squel.select({ autoQuoteTableNames: true, autoQuoteFieldNames: true })
            .where(cond)
            .from(obj);
}

function NATURAL_JOIN(obj1, obj2) {
    if (typeof obj1 === 'string') {
        obj1 = SELECT(["*"], obj1);
    }

    if (typeof obj2 === 'string') {
        obj2 = SELECT(["*"], obj2);
    }

    return obj1.natural_join(obj2);
}

function SEMIJOIN_JOIN(obj1, obj2) {
    if (typeof obj1 === 'string') {
        obj1 = SELECT(["*"], obj1);
    }

    if (typeof obj2 === 'string') {
        obj2 = SELECT(["*"], obj2);
    }

    return obj1.semijoin_join(obj2);
}

function UNION(obj1, obj2) {
    if (typeof obj1 === 'string') {
        obj1 = SELECT(["*"], obj1);
    }

    if (typeof obj2 === 'string') {
        obj2 = SELECT(["*"], obj2);
    }

    return obj1.union(obj2);
}

function EXCEPT(obj1, obj2) {
    if (typeof obj1 === 'string') {
        obj1 = SELECT(["*"], obj1);
    }

    if (typeof obj2 === 'string') {
        obj2 = SELECT(["*"], obj2);
    }

    return obj1.except(obj2);
}

function INTERSECT(obj1, obj2) {
    if (typeof obj1 === 'string') {
        obj1 = SELECT(["*"], obj1);
    }

    if (typeof obj2 === 'string') {
        obj2 = SELECT(["*"], obj2);
    }

    return obj1.intersect(obj2);
}

function MULTIPLY(obj1, obj2) {
    if (typeof obj1 === 'string' && typeof obj2 !== 'string') {
        return obj2.from(obj1);
    }

    if (typeof obj1 !== 'string' && typeof obj2 === 'string') {
        return obj1.from(obj2);
    }

    if (typeof obj1 === 'string' && typeof obj2 === 'string') {
        obj1 = SELECT(["*"], obj1);
    }

    return obj1.from(obj2);
}