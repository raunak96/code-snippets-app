import { getSnippetsByLanguage } from "../../../utils/Fauna";

export default async function handler(req, res) {
	if (req.method !== "GET")
		return res
			.status(405)
			.json({ msg: "This method is not supported for this request." });
	try {
		const snippets = await getSnippetsByLanguage(req.query.language);
		return res.status(200).json(snippets);
	} catch (error) {
		console.error(error);
		res.status({ msg: "Something went wrong." });
	}
}
