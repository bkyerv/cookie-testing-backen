export interface Env {
	URL: string;
}

export default {
	async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
		const corsHeaders = {
			'Access-Control-Allow-Origin': env.URL ? env.URL : 'http://localhost:5173',
			'Access-Control-Allow-Headers': '*',
			'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
			'Access-Control-Max-Age': '86400',
			'Access-Control-Allow-Credentials': 'true',
		};

		if (request.method === 'OPTIONS') {
			return new Response(null, {
				headers: corsHeaders,
			});
		}
		const url = new URL(request.url);

		if (request.method === 'GET' && url.pathname === '/') {
			const response = new Response('Cookie has been set!', { headers: corsHeaders, status: 200 });

			// Adjust the cookie settings as necessary
			response.headers.append(
				'Set-Cookie',
				`test_cookie_name=sample_cookie_value; SameSite=${env.URL ? 'None;' : 'Lax;'} ${env.URL && 'Secure;'}   Max-Age=86400`
			);

			return response;
		}
		return new Response('endpoint not found', { headers: corsHeaders, status: 404 });
	},
};
