import React, { useState, useEffect } from 'react';

const Visualizer = () => {
	const [mainArr, setMainArr] = useState([]);
	const [length, setLength] = useState(30);
	const [algo, setAlgo] = useState('linearSearch');
	const [searchValue, setSearchValue] = useState(250);
	const [resultmsg, setResultmsg] = useState('');

	const primaryColor = '#074478';

	useEffect(() => {
		algo === 'linearSearch' ? getNewArray(length) : getNewSortedArray(length);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [length, algo]);

	const randomNumberFromRange = (low, high) => {
		return Math.floor(Math.random() * (high - low) + low);
	};

	// for binary search
	const getNewSortedArray = length => {
		const arr = [];
		for (let i = 0; i < length; i++) {
			arr.push(randomNumberFromRange(100, 400));
			if (document.getElementsByClassName('array-bar')[i] != null) {
				document.getElementsByClassName('array-bar')[
					i
				].style.backgroundColor = primaryColor;
			}
		}

		arr.sort((a, b) => a - b);
		const temp = arr.map((item, idx) => ({ idx: idx, val: item }));
		setMainArr(temp);
		displayResult('no-result');
	};

	const getNewArray = length => {
		const arr = [];
		for (let i = 0; i < length; i++) {
			const item = {
				idx: i,
				val: randomNumberFromRange(100, 400),
			};
			arr.push(item);
			if (document.getElementsByClassName('array-bar')[i] != null) {
				document.getElementsByClassName('array-bar')[
					i
				].style.backgroundColor = primaryColor;
			}
		}
		setMainArr(arr);
		displayResult('no-result');
	};

	const linearSearch = value => {
		let found = false;
		for (let i = 0; i < length; i++) {
			if (mainArr[i].val === value) {
				console.log('found');
				setTimeout(() => {
					document.getElementsByClassName('array-bar')[
						i
					].style.backgroundColor = '#107834';
					displayResult(i);
				}, i * 100);

				found = true;
				return;
			} else {
				setTimeout(() => {
					document.getElementsByClassName('array-bar')[
						i
					].style.backgroundColor = 'cyan';
				}, i * 100);

				setTimeout(() => {
					document.getElementsByClassName('array-bar')[
						i
					].style.backgroundColor = primaryColor;
				}, (i + 5) * 100);
			}
		}
		if (found === false) {
			setTimeout(() => {
				displayResult(-1);
			}, length * 100);
		}
	};

	const binarySearch = value => {
		let lo = 0;
		let hi = length - 1;
		let animations = [];
		let found = false;

		while (lo <= hi) {
			let mid = Math.floor((lo + hi) / 2);

			animations.push({
				i: lo,
				j: hi,
				mid: mid,
			});

			if (mainArr[mid].val === value) {
				found = true;
				break;
			} else if (mainArr[mid].val > value) {
				hi = mid - 1;
			} else {
				lo = mid + 1;
			}
		}

		if (!found) {
			animations.push({
				i: -1,
				j: -1,
				mid: -1,
			});
		}

		binaryHelper(animations, value);
	};

	const binaryHelper = (animations, searchValue) => {
		let bars = document.getElementsByClassName('array-bar');

		for (let k = 0; k < animations.length; k++) {
			if (animations[k].i === -1) {
				setTimeout(() => {
					displayResult(-1);

					bars[animations[k - 1].mid].style.backgroundColor = 'grey';
				}, k * 1000);
				break;
			}

			if (mainArr[animations[k].mid].val === searchValue) {
				console.log('inside');
				setTimeout(() => {
					bars[animations[k].mid].style.backgroundColor = 'green';

					displayResult(parseInt(animations[k].mid));
				}, (k + 1) * 1000);
			}
			let tempLen = length;
			setTimeout(() => {
				for (let m = 0; m < tempLen; m++) {
					if (m <= animations[k].j && m >= animations[k].i)
						bars[m].style.backgroundColor = primaryColor;
					else bars[m].style.backgroundColor = 'grey';

					if (m === animations[k].mid) bars[m].style.backgroundColor = 'cyan';
				}
			}, k * 1000);
		}
	};

	const startSearch = algo => {
		setPrimaryColor();

		algo === 'linearSearch'
			? linearSearch(parseInt(searchValue))
			: binarySearch(parseInt(searchValue));
	};

	const setPrimaryColor = () => {
		const arrayBars = document.getElementsByClassName('array-bar');

		for (let i = 0; i < arrayBars.length; i++) {
			arrayBars[i].style.backgroundColor = primaryColor;
		}
	};

	const displayResult = idx => {
		if (idx === 'no-result') {
			setResultmsg('');
			document.getElementById('result-box').classList.remove('red', 'green');
		} else if (idx === -1) {
			setResultmsg(`not found !!!`);
			document.getElementById('result-box').classList.remove('red', 'green');
			document.getElementById('result-box').classList.add('red');
		} else {
			setResultmsg(`found at idx ${idx}`);
			document.getElementById('result-box').classList.remove('red', 'green');
			document.getElementById('result-box').classList.add('green');
		}
	};

	return (
		<div className='searching-container'>
			<div className='array-container'>
				<div id='result-box' className='result-box'>
					{resultmsg}
				</div>

				{mainArr.map(item => {
					return (
						<div
							className='array-bar'
							key={item.idx}
							style={{ height: item.val, backgroundColor: primaryColor }}
						>
							<p>{item.val}</p>
						</div>
					);
				})}
			</div>
			<div className='utility-container'>
				<label>Search Element</label>
				<input
					placeholder='try '
					type='number'
					value={searchValue}
					onChange={e => setSearchValue(e.target.value)}
				></input>

				<div style={{ height: '10px' }}></div>

				<label>Length of Array</label>
				<input
					className='input-range'
					type='range'
					value={length}
					onChange={e => setLength(e.target.value)}
					min='15'
					max='34'
				></input>

				<button
					className='btn'
					onClick={() =>
						algo === 'linearSearch'
							? getNewArray(length)
							: getNewSortedArray(length)
					}
				>
					Reset Array
				</button>

				<label htmlFor='algoritm'>select algorithm</label>
				<select
					value={algo}
					name='algoritm'
					onChange={e => setAlgo(e.target.value)}
					className='select'
				>
					<option value='bianrySearch'>Bianry Search</option>
					<option value='linearSearch'>Linear Search</option>
				</select>

				<button className='btn' onClick={() => startSearch(algo)}>
					search
				</button>
			</div>
		</div>
	);
};

export default Visualizer;
