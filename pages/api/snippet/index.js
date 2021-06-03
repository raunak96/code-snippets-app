import { getSession, withApiAuthRequired } from "@auth0/nextjs-auth0";
import { createSnippet } from "../../../utils/Fauna";

export default withApiAuthRequired(async function handler(req, res) {
	const session = getSession(req, res);
	const userId = session.user.sub;
	const { code, language, description, name } = req.body;
	switch (req.method) {
		case "POST": {
			try {
				const createdSnippet = await createSnippet(
					code,
					language,
					description,
					name,
					userId
				);
				return res.status(201).json(createdSnippet);
			} catch (error) {
				console.error(err);
				res.status(500).json({ msg: "Something went wrong." });
			}
			break;
		}
		default:
			return res.status(405);
	}
});
