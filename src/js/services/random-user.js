async function getUsers(numberOfUsers = 5) {
	try {
		const res = await fetch(
			`https://randomuser.me/api/?results=${numberOfUsers}`
		);

		const { results } = await res.json();

		return { results, error: false };
	} catch (error) {
		return { error: 'Something has gone wrong' };
	}
}

export { getUsers };
