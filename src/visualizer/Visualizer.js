import React, { useState, useEffect } from 'react';

const Visualizer = () => {
	const [mainArr, setMainArr] = useState([]);
	const [length, setLength] = useState(30);
	const [algo, setAlgo] = useState('linearSearch');
	const [able, setAble] = useState(true);
	const [searchValue, setSearchValue] = useState(0);
	const [resultmsg, setResultmsg] = useState('');

	const primaryColor = '#074478';

	useEffect(() => {
		if (able) {
			getNewArray(length);
		}
	}, [length, algo]);

	const randomNumberFromRange = (low, high) => {
		return Math.floor(Math.random() * (high - low) + low);
	};

	const getNewArray = length => {
		const arr = [];
		for (let i = 0; i < length; i++) {
			const item = {
				idx: i,
				val: randomNumberFromRange(100, 200),
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
			console.log(mainArr[i].val, value);
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

	const displayResult = idx => {
		if (idx === 'no-result') {
			setResultmsg('');
			document.getElementById('result-box').classList.remove('red', 'green');
		} else if (idx === -1) {
			// setResultmsg()
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
					onClick={() => linearSearch(parseInt(searchValue))}
				>
					Linear Search
				</button>

				<button className='btn' onClick={() => getNewArray(length)}>
					Reset Array
				</button>
			</div>
		</div>
	);
};

export default Visualizer;
