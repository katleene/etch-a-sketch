function makeGrid(numOfCellsPerSide) {
	const canvas = document.querySelector('.canvas');
	canvas.innerHTML = '';

	for (let i = 0; i < numOfCellsPerSide; i++) {
		const row = document.createElement('div');
		row.className = 'row';

		canvas.appendChild(row);

		for (let j = 0; j < numOfCellsPerSide; j++) {
			const cell = document.createElement('div');
			cell.className = 'cell';

			row.appendChild(cell);
		}
	}

	document
		.querySelectorAll('.cell')
		.forEach((cell) => cell.addEventListener('mouseover', drawModeCb));

	countOfCells = numOfCellsPerSide;
}

function drawModeCb(e) {
	switch (drawingMode) {
		case 1:
			e.target.style.backgroundColor = '#000';
			break;

		case 2:
			e.target.style.backgroundColor = random_rgba();
			break;

		case 3:
			// Get the current background-color value
			let bgColor = getComputedStyle(e.target).getPropertyValue(
				'background-color'
			);

			// Get all color components (alpha may not be there if = 1)
			const parts = bgColor.match(/[\d.]+/g);

			// If alpha is not there, add it
			if (parts.length === 3) parts.push(1);

			// Modify alpha adding 20% more
			parts[3] = Math.min(1, Math.max(0, parseFloat(parts[3]) + 0.2));

			// Apply new value
			e.target.style.backgroundColor = `rgba(${parts.join(',')})`;
			break;

		default:
			break;
	}
}

function random_rgba() {
	var o = Math.round,
		r = Math.random,
		s = 255;
	return (
		'rgba(' +
		o(r() * s) +
		',' +
		o(r() * s) +
		',' +
		o(r() * s) +
		',' +
		r().toFixed(1) +
		')'
	);
}

function promptUserForCountOfCells() {
	let count = prompt('Enter the count of cells per side.');

	count = Number(count);

	if (count == 0 || !Number.isFinite(count)) {
		alert('The value you entered is not a positive number.');
		promptUserForCountOfCells();
		return;
	}

	if (count > 100) {
		alert("The count of cells can't be grater than 100.");
		promptUserForCountOfCells();
		return;
	}

	makeGrid(count);
}

function setDrawingMode(e) {
	const radioButtons = document.querySelectorAll('input[type="radio"]');

	for (const radioButton of radioButtons) {
		if (radioButton.checked) {
			drawingMode = radioButton.value * 1;
			break;
		}
	}
}

function eraseCanvas() {
	makeGrid(countOfCells);
}

let drawingMode = 1;
let countOfCells = 100;

makeGrid(countOfCells);

document
	.querySelector('#askCountOfCells')
	.addEventListener('click', promptUserForCountOfCells);

document.querySelector('#erase').addEventListener('click', eraseCanvas);

document
	.querySelectorAll('input[type="radio"]')
	.forEach((radio) => addEventListener('click', setDrawingMode));
