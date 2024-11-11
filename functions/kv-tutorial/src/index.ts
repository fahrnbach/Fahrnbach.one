/**
 * Welcome to Cloudflare Workers! This is your first worker.
 *
 * - Run `npm run dev` in your terminal to start a development server
 * - Open a browser tab at http://localhost:8787/ to see your worker in action
 * - Run `npm run deploy` to publish your worker
 *
 * Bind resources to your worker in `wrangler.toml`. After adding bindings, a type definition for the
 * `Env` object can be regenerated with `npm run cf-typegen`.
 *
 * Learn more at https://developers.cloudflare.com/workers/
 */

export interface Env {
	BINDING_NAME: KVNamespace;
  }

  export default {
	async fetch(request, env, ctx): Promise<Response> {
	  try {
		await env.BINDING_NAME.put("KEY", "First KVVALUE~");
		const value = await env.BINDING_NAME.get("KEY");
		if (value === null) {
		  return new Response("Value not found", { status: 404 });
		}
		return new Response(value);
	  } catch (err: any) {
		// In a production application, you could instead choose to retry your KV
		// read or fall back to a default code path.
		console.error(`KV returned error: ${err}`);
		return new Response(err, { status: 500 });
	  }
	},
  } satisfies ExportedHandler<Env>;
