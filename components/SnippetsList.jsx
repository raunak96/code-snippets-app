import Head from "next/head";
import Header from "./Header";
import Snippet from "./Snippet";

const SnippetsList = ({
	metaTitle = "Code Snippets App",
	title = "Errday Snippets",
	subtitle,
	snippets,
	onSnippetsDelete,
}) => {
	return (
		<>
			<Head>
				<title>{metaTitle}</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<main>
				<Header title={title} subtitle={subtitle} />
				{snippets?.map(snippet => (
					<Snippet
						key={snippet.id}
						snippet={snippet}
						snippetDeleted={onSnippetsDelete}
					/>
				))}
			</main>
		</>
	);
};

export default SnippetsList;
