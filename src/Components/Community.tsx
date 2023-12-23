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

	const placeHolderImage =
		'https://images.unsplash.com/photo-1610513320995-1ad4bbf25e55?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';

	const onImageError = (e: React.ChangeEvent<HTMLImageElement>) => {
		e.target.src = placeHolderImage;
	};

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
					communities.map(({ id, name, imgUrl }) => {
						return (
							<div className='community__card' key={id}>
								<p className='community__name'>{name}</p>
								<img
									className='community__img'
									src={imgUrl ? imgUrl : placeHolderImage}
									alt='community image'
									onError={onImageError}
								/>
								<AverageHomePrice communityId={id} />
							</div>
						);
					})}
			</div>
		</div>
	);
};

export default Community;
