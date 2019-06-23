var initialString = `Π(["a", "b"], σ("id=12", stud))∩Π(["a", "b"], clg)`;

var transformedString = initialString.replace(/\(([^Πσ]+), (\w+)\)/g, '($1, "$2")');

console.log(transformedString);