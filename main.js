
class DiophantineEquationSolver {

	a; b; c; s0; s;

	constructor() {
		this.init();
	}

	solve({ a, b, c }) {
		this.init();
		const result = {};
		this.a = a;
		this.b = b;
		this.c = c;
		this.computeParticularSolution();
		this.computeGeneralFormOfSolution();

		result.coeff = { a, b, c };
		result.s0 = this.s0;
		result.s = this.s;

		return result;
	}

	init() {
		this.a = 0;
		this.b = 0;
		this.c = 0;
		this.s = { x: "", y: "" };
		this.s0 = { x:0, y:0 };
	}

	pgcd(a, b) {
		if (b) {
			return this.pgcd(b, a % b);
		} else {
			return Math.abs(a);
		}
	}

	computeRest(a, b) {
		let tab = [], next = null;
		tab[0] = (a >= b) ? a : b;
		tab[1] = (a >= b) ? b : a;
	
		while (true) {
			const last = tab.length-1;
			next = tab[last-1] % tab[last];
			if (next > 0) {
				tab.push(next);
			} else {
				break;
			}
		}
	
		return tab;
	}

	computeGeneralFormOfSolution() {
		// @TEST
		const gcd = this.pgcd(this.a, this.b);
		const v = this.b / gcd;
		const u = this.a / gcd;
		this.s.x = `${this.s0.x} + k * ${u}`;
		this.s.y = `${this.s0.y} - k * ${v}`;
	}

	computeParticularSolution() {

		let row1 = null, 
			row2 = null, 
			result = [];
		row1 = this.computeRest(this.a, this.b);
		const N = row1.length;

		row2 = new Array(N);
		row2.fill(0);
		row2[0] = this.c;
		row2[1] = this.c % row1[1];
		for (let i = 2;i < N-1; i++) {
			row2[i] = row2[i-1] % row1[i];
		}

		result = new Array(N);
		result.fill(0);
		for (let i = N-2; i >= 0; i--) {
			result[i] = result[i+1] * row1[i] - row2[i];
			result[i] = Math.ceil(result[i] / (-row1[i+1]));
		}
	
		this.s0 = {
			x: result[0], 
			y: result[1]
		};
	}

}

const solver = new DiophantineEquationSolver();

result = solver.solve({ a: 35,  b: 37,  c: 85 });
console.log(result);
