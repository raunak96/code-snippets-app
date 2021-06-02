import { getSnippets } from "../../utils/Fauna";

const handler = async (req, res) => {
	switch (req.method) {
		case "GET": {
			try {
				const snippets = await getSnippets();
				return res.status(200).json(snippets);
			} catch (error) {
				console.error(err);
				res.status(500).json({ msg: "Something went wrong." });
			}
			break;
		}
		default:
			return res.status(405);
	}
};

export default handler;
