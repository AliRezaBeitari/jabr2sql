const cheerio = require('cheerio');
//const input = "<math><msub><mrow><mi>Π</mi></mrow><mrow><mi>a</mi><mo>,</mo><mi>b</mi></mrow></msub><mo>(</mo><msub><mrow><mi>σ</mi></mrow><mrow><mi>i</mi><mi>d</mi><mo>=</mo><mn>1</mn><mn>2</mn></mrow></msub><mo>(</mo><mi>s</mi><mi>t</mi><mi>u</mi><mi>d</mi><mo>)</mo><mo>)</mo><mi>∩</mi><msub><mrow><mi>Π</mi></mrow><mrow><mi>a</mi><mo>,</mo><mi>b</mi></mrow></msub><mo>(</mo><mi>c</mi><mi>l</mi><mi>g</mi><mo>)</mo></math>";

const input = "<math><mi>s</mi><mi>t</mi><mi>u</mi><mi>d</mi></math>";

const $ = cheerio.load(input);
const root = $('math');
let result = "";

// Π(['a', 'b'], σ('id=12', 'stud'))∩Π(['a', 'b'], 'clg')

function recursivelyParse(element) {
	let res = "";
	let functionIsOpen = false;
	let lastWasId = false;

	element.children().each((i, el) => {
		switch (el.name) {
			case "mo":
			case "mi":
			case "mn":
				let _id = $(el).text();

				if (functionIsOpen && _id == "(") {
					functionIsOpen = false;
					// res += '"';
					// lastWasId = false;
				}
				else {
					/*if (_id == ")" && lastWasId) {
						res += '"';
					}*/

					res += _id;
					lastWasId = true;
				}

				break;

			case "msub":
				let func = recursivelyParse($(el).children().first());
				let inner = recursivelyParse($(el).children().last());

				console.log("function: " + func);
				console.log("params: " + inner);
				console.log("-----------------------");

				functionIsOpen = true;
				
				if (func == "Π") {
					inner = inner.split(",").map(p => '"' + p + '"').join(", ");
					res += func + "([" + inner + "], ";
				}
				else if (func == "σ") {
					res += func + "(\"" + inner + "\", ";
				}

				break;
		}
	});

	return res.trim();
}

result = recursivelyParse(root);
result = result.replace(/\(([^Πσ]+), (\w+)\)/g, '($1, "$2")');

console.log(result);