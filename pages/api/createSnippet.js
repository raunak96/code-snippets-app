import { createSnippet } from "../../utils/Fauna";
export default async function handler(req, res) {
	const { code, language, description, name } = req.body;
	switch (req.method) {
		case "POST": {
			try {
				const createdSnippet = await createSnippet(
					code,
					language,
					description,
					name
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
}
