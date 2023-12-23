import AverageHomePrice from './AverageHomePrice';
import { useState, useEffect } from 'react';

const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
const communitiesUrl =
	'https://storage.googleapis.com/openhouse-ai-fe-coding-test/communities.json';

const Community = () => {
	interface Community {
		name: string;
		id: string;
		imgUrl: string;
	}

	const [communities, setCommunities] = useState<Community[]>([]);

	async function getCommunitiesData() {
		const response = await fetch(proxyUrl + communitiesUrl);
		const communitiesData = await response.json();

		return communitiesData;
	}

	function sortCommunities(communities: Community[]) {
		const sortedCommunities = Array.from(communities);
		sortedCommunities.sort(compareByName);

		return sortedCommunities;
	}

	function compareByName(a: Community, b: Community) {
		return a.name.localeCompare(b.name);
	}

	useEffect(() => {
		getCommunitiesData().then((data) => {
			const sortedCommunities = sortCommunities(data);
			setCommunities(sortedCommunities);
		});
	}, []);

	return (
		<div className='community__container--outer'>
			<h1 className='title'>Communities</h1>
			<div className='community__container--inner'>
				{communities &&
					communities.map((community) => {
						return (
							<div className='community__card' key={community.id}>
								<p className='community__name'>{community.name}</p>
								<img className='community__img' src={community.imgUrl} alt='' />
								<AverageHomePrice communityId={community.id} />
							</div>
						);
					})}
			</div>
		</div>
	);
};

export default Community;
