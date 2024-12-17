import { PUBLIC_API_KEY, PUBLIC_API_URL } from '$env/static/public';

export enum HttpMethod {
	GET = 'GET',
	POST = 'POST',
	PUT = 'PUT',
	DELETE = 'DELETE',
	PATCH = 'PATCH',
	OPTIONS = 'OPTIONS',
	HEAD = 'HEAD'
}

type JsonValue = string | number | boolean | null | JsonValue[] | { [key: string]: JsonValue };

export async function fetchUserData() {
	const response = await fetch('/api/user'); // Adjust endpoint as needed
	if (!response.ok) {
		throw new Error('Failed to fetch user data');
	}
	return response.json();
}

export const request = async (
	method: HttpMethod,
	path: string,
	body?: JsonValue,
	contentType = 'application/json'
) => {
	const options: Record<string, unknown> = {
		method: method,
		headers: {
			apikey: PUBLIC_API_KEY,
			'Content-Type': contentType
		}
	};

	if (HttpMethod.POST === method && body !== undefined) {
		options.body = JSON.stringify(body);
	}

	const res = await fetch(PUBLIC_API_URL + path, options);

	const contentTypeHeader = res.headers.get('Content-Type') || '';
	if (contentTypeHeader.includes('application/json')) {
		try {
			return await res.json();
		} catch (err) {
			console.error('Failed to parse JSON response:', err);
			throw new Error('Invalid JSON response');
		}
	}

	const text = await res.text();
	return { raw: text, status: res.status };
};

export const api = {
	get: async (path: string) => request(HttpMethod.GET, path),
	post: async (path: string, body?: JsonValue) => request(HttpMethod.POST, path, body)
};
