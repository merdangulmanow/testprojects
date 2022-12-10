export const setTopicImageResponse = {
    fileName: "c5dfe0e4-b3bb-4681-9e63-e4ec737390de.jpg"
  };

export const createTopicAndTags = {
	topic: {
		isActive: true,
		id: 11,
		name: "бизнес",
		image: "02b47860-c438-4cd1-8825-b627337f50cb11.jpg",
		updatedAt: "2022-05-09T18:45:48.138Z",
		createdAt: "2022-05-09T18:45:48.138Z"
	},
	tags: [
		{
			id: 6,
			topicId: 11,
			tag: "tag 6",
			updatedAt: "2022-05-09T18:45:48.141Z"
		},
		{
			id: 7,
			topicId: 11,
			tag: "tag 7",
			updatedAt: "2022-05-09T18:45:48.141Z"
		}
	]
}

export const getAllTopicsResponse = [
	{
		id: 3,
		name: "бизнес",
		isActive: true,
		image: "02b47860-c438-4cd1-8825-b627337f50cb.jpg",
		createdAt: "2022-05-09T18:32:04.973Z",
		updatedAt: "2022-05-09T18:32:04.973Z",
		tags: [
			{
				id: 1,
				tag: "tag 6",
				topicId: 3,
				updatedAt: "2022-05-09T18:32:05.005Z"
			},
			{
				id: 2,
				tag: "tag 7",
				topicId: 3,
				updatedAt: "2022-05-09T18:32:05.005Z"
			}
		]
	},
	{
		id: 1,
		name: "фитнес",
		isActive: true,
		image: "02b47860-c438-4cd1-8825-b627337f50cb.jpg",
		createdAt: "2022-05-09T18:27:36.764Z",
		updatedAt: "2022-05-09T18:27:36.764Z",
		tags: []
	}
]