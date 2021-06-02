import { updateSnippet } from "../../utils/Fauna";
export default async function handler(req, res) {
	const { id, code, language, description, name } = req.body;
	switch (req.method) {
		case "PUT": {
			try {
				const updateSnippet = await updateSnippet(
					id,
					code,
					language,
					description,
					name
				);
				return res.status(201).json(updateSnippet);
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
