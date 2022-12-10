export const emailValidateResponse = {
	message: "code sent"
}

export const validateResponse = {
	message: "successfuly validated",
	user: {
		id: 5,
		fullName: "Jane Doe",
		email: "janedow@gmail.com",
		validated: true,
		avatar: "eaa21c72-c2a9-48d5-8e21-f170d190203a.jpg",
		createdAt: "2022-05-10T08:28:40.078Z",
		updatedAt: "2022-05-11T06:51:06.367Z",
		roles: [
			{
				id: 1,
				name: "user",
				createdAt: "2022-05-09T16:16:38.051Z",
				UserRoles: {
					id: 4,
					roleId: 1,
					userId: 5,
					createdAt: "2022-05-10T08:28:40.084Z"
				}
			}
		]
	},
	accessToken: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6IjA5bWVyZGFuMTBAZ21haWwuY29tIiwiaWQiOjUsInJvbGVzIjpbInVzZXIiXSwiaWF0IjoxNjUyMjU0NzI2LCJleHAiOjE2NTIzNDExMjZ9.bIGBH8EHKMUzqiBJYJIORihltEbwLz1Kpd8S812g92A",
	refreshToken: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6IjA5bWVyZGFuMTBAZ21haWwuY29tIiwiaWQiOjUsInJvbGVzIjpbInVzZXIiXSwiaWF0IjoxNjUyMjU0NzI2LCJleHAiOjE2NTQ4NDY3MjZ9.vgOhU8vlRfej3SkDfUXTTg6_tBa1B5S-61Be2J6yLfU"
}