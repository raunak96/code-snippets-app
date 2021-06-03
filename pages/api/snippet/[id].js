import {
	deleteSnippet,
	getSnippetById,
	updateSnippet,
} from "../../../utils/Fauna";
import { getSession, withApiAuthRequired } from "@auth0/nextjs-auth0";

export default withApiAuthRequired(async function handler(req, res) {
	const session = getSession(req, res);
	const userId = session.user.sub;
	switch (req.method) {
		case "GET": {
			try {
				const snippet = await getSnippetById(req.query.id);
				return res.status(200).json(snippet);
			} catch (error) {
				console.error(err);
				res.status(500).json({ msg: "Something went wrong." });
			}
			break;
		}
		case "PUT": {
			const { code, language, description, name } = req.body;
			try {
				const existingRecord = await getSnippetById(req.query.id);
				if (!existingRecord || existingRecord.data.userId !== userId) {
					return res
						.status(403)
						.json({ msg: "Unauthorised. Access denied." });
				}
				const updatedSnippet = await updateSnippet(
					req.query.id,
					code,
					language,
					description,
					name
				);

				return res.status(201).json(updatedSnippet);
			} catch (error) {
				console.error(err);
				res.status(500).json({ msg: "Something went wrong." });
			}
			break;
		}
		case "DELETE": {
			try {
				const existingRecord = await getSnippetById(req.query.id);
				if (!existingRecord || existingRecord.data.userId !== userId) {
					return res
						.status(403)
						.json({ msg: "Unauthorised. Access denied." });
				}
				const deletedSnippet = await deleteSnippet(req.query.id);
				return res.status(200).json(deletedSnippet);
			} catch (error) {
				console.error(err);
				res.status(500).json({ msg: "Something went wrong." });
			}
			break;
		}
		default:
			return res.status(405).json({ msg: "Method not allowed" });
	}
});
