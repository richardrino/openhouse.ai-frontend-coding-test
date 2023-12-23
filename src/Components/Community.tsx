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
		<>
			<h1>Communities</h1>
			{communities &&
				communities.map((community) => {
					return (
						<div key={community.id}>
							<p>{community.name}</p>
							<img src={community.imgUrl} alt='' />
						</div>
					);
				})}
		</>
	);
};

export default Community;
