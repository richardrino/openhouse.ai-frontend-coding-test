import { useState, useEffect } from 'react';

const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
const homesUrl =
	'https://storage.googleapis.com/openhouse-ai-fe-coding-test/homes.json';
let averageHomePrice: number = 0;

interface Props {
	communityId: string;
}

interface Home {
	id: string;
	communityId: string;
	price: number;
}

const AverageHomePrice = ({ communityId }: Props) => {
	const [averageHomePrice, setAverageHomePrice] = useState<string>('');

	async function getHomesData() {
		const response = await fetch(proxyUrl + homesUrl);
		const homesData = await response.json();

		return homesData;
	}

	function getCommunityHomes(homesData: Home[], communityId: string) {
		const communityHomes = homesData.filter((home: Home) => {
			if (home.communityId === communityId) {
				return true;
			} else {
				return false;
			}
		});

		return communityHomes;
	}

	function getAverageHomePrice(homes: Home[]) {
		const sum = homes.reduce((accumulator, home) => {
			return accumulator + home.price;
		}, 0);
		if (sum === 0) {
			return 'Not Available';
		} else {
			const average = '$' + Number(sum / homes.length).toFixed(2);

			return average;
		}
	}

	useEffect(() => {
		getHomesData().then((data) => {
			const communityHomes = getCommunityHomes(data, communityId);
			setAverageHomePrice(getAverageHomePrice(communityHomes));
		});
	}, []);
	return <p className='community__avg-price'>Avg: {averageHomePrice}</p>;
};

export default AverageHomePrice;
