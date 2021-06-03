import { getSession, withApiAuthRequired } from "@auth0/nextjs-auth0";
import { getSnippetsByUser } from "../../../utils/Fauna";

export default withApiAuthRequired(async function handler(req, res) {
	const session = getSession(req, res);
	const userId = session.user.sub;
	if (req.method !== "GET")
		return res
			.status(405)
			.json({ msg: "This method is not supported for this request." });
	try {
		const snippets = await getSnippetsByUser(userId);
		return res.status(200).json(snippets);
	} catch (error) {
		console.error(error);
		res.status({ msg: "Something went wrong." });
	}
});
