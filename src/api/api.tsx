const TOKEN: any = process.env.REACT_APP_API_TOKEN;

const URL: string = 'https://api.json-generator.com/templates/ZM1r0eic3XEy/data?access_token=';

const getJobList = async (): Promise<any> => {
	const response = await fetch(`${URL}${TOKEN}`);
	return await response.json();
};

export { getJobList };