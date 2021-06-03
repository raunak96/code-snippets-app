import faunadb from "faunadb";

const faunaClient = new faunadb.Client({ secret: process.env.FAUNA_SECRET });
const q = faunadb.query;

const transformData = snippet => {
	const x = { ...snippet };
	x.id = x.ref.id;
	delete x.ref; // no need of ref anymore as we have extrcted id
	return x;
};

const getSnippets = async () => {
	// Basically Mapping through all Documents inside collection
	const { data } = await faunaClient.query(
		q.Map(
			q.Paginate(q.Documents(q.Collection("snippets"))),
			q.Lambda("snippet", q.Get(q.Var("snippet")))
		)
	);

	const snippets = data.map(snippet => transformData(snippet));

	return snippets;
};

const getSnippetById = async id => {
	const snippet = await faunaClient.query(
		q.Get(q.Ref(q.Collection("snippets"), id))
	);
	transformData(snippet);
};

const getSnippetsByUser = async userId => {
	const { data } = await faunaClient.query(
		q.Map(
			q.Paginate(q.Match(q.Index("snippets_by_user"), userId)),
			q.Lambda("snippet", q.Get(q.Var("snippet")))
		)
	);
	const snippets = data.map(snippet => transformData(snippet));
	return snippets;
};

const createSnippet = async (code, language, description, name, userId) => {
	return await faunaClient.query(
		q.Create(q.Collection("snippets"), {
			data: { code, language, description, name, userId },
		})
	);
};

const updateSnippet = async (id, code, language, name, description) => {
	return await faunaClient.query(
		q.Update(q.Ref(q.Collection("snippets"), id), {
			data: { code, language, description, name },
		})
	);
};

const deleteSnippet = async id => {
	return await faunaClient.query(
		q.Delete(q.Ref(q.Collection("snippets"), id))
	);
};

export {
	createSnippet,
	getSnippets,
	getSnippetById,
	getSnippetsByUser,
	updateSnippet,
	deleteSnippet,
};
