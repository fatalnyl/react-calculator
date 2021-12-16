import {useState} from 'react';

function App() {
	const [calc, setCalc] = useState("");
	const [result, setResult] = useState("");

	const ops = ['/', '*', '+', '-', '.'];

	// Updates calculation when input
	const updateCalc = value => {
		if (
			ops.includes(value) && calc === '' || // if no calc and operator is typed
			ops.includes(value) && ops.includes(calc.slice(-1)) // if operator is repeating
		) {
			return;
		}

		setCalc(calc + value); 

		if (!ops.includes(value)) {
			setResult(eval(calc+value).toString());
		}
	}

	const createDigits = () => {
		const digits = []
		for (let i = 1; i < 10; i++){
			digits.push(
				<button 
					onClick = { () => updateCalc(i.toString())}
					key={i}> 

					{i} 
								
				</button>
			)
		}
		return digits;
	}

	const calculate = () => {
		setCalc(eval(calc).toString());
	}

	const deleteLast = () => {
		if (calc === '') {
			return;
		}

		const value = calc.slice(0, -1);
		setCalc(value);
	}
	
	// clears everything
	const allClear = () => {
		// clears array giving []
		setCalc( calc.slice(0, 0) );
		
	}

	return (
		<div className="App">
			<div className="calculator">
				<div className="display">
					{result ? <span>({result})</span> : '' }
					{ calc || "0"} 
				</div>
				<div className= "row">
					<div className="col operators">
						<button onClick={ () => updateCalc('/') }>/</button>
						<button onClick={ () => updateCalc('*') }>*</button>
						<button onClick={ () => updateCalc('+') }>+</button>
						<button onClick={ () => updateCalc('-') }>-</button>

						<button onClick={deleteLast}>Del</button>
						<button onClick={allClear}>AC</button>

					</div>

					<div className="col digits">
						{ createDigits() }
						<button onClick={ () => updateCalc('0') }>0</button>
						<button onClick={ () => updateCalc('.') }>.</button>
						<button onClick={calculate}>=</button>
					</div>
				</div>
			</div>
		</div>
	);
}

export default App;
