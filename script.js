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

	document.querySelectorAll('.cell').forEach((cell) =>
		cell.addEventListener('mouseover', (e) => {
			e.target.style.backgroundColor = '#000';
		})
	);
}

function promptUserForCountOfCells() {
	const countOfCells = prompt('Enter the count of cells per side.');

	if (countOfCells > 100) {
		alert("The count of cells can't be grater than 100.");
		promptUserForCountOfCells();
		return;
	}

	makeGrid(countOfCells);
}

makeGrid(100);

document
	.querySelector('#askCountOfCells')
	.addEventListener('click', promptUserForCountOfCells);
