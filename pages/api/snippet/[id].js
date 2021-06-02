import {
	deleteSnippet,
	getSnippetById,
	updateSnippet,
} from "../../../utils/Fauna";

export default async function handler(req, res) {
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
}
