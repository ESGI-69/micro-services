import { userClient } from '../../../lib/server/grpc.client';
import type { RequestHandler } from '@sveltejs/kit';
export const POST: RequestHandler = async ({ request }) => {
	const data = await request.json();
	const { response } = await userClient.register(data);
	console.log({ user: response.user });
	return new Response(
		JSON.stringify(response.user, (k, v) => (typeof v === 'bigint' ? v.toString() : v))
	);
};