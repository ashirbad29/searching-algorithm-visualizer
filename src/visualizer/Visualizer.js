import React, { useState, useEffect } from 'react';

const Visualizer = () => {
	const [mainArr, setMainArr] = useState([]);
	const [length, setLength] = useState(30);
	const [algo, setAlgo] = useState('linearSearch');
	const [able, setAble] = useState(true);
	const [searchValue, setSearchValue] = useState(200);
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
		}
		setMainArr(arr);
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
							{' '}
							<p>{item.val}</p>{' '}
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
			</div>
		</div>
	);
};

export default Visualizer;
