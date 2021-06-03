import { getSession, withPageAuthRequired } from "@auth0/nextjs-auth0";
import Head from "next/head";
import useSWR from "swr";
import Header from "../components/Header";
import Snippet from "../components/Snippet";

const mySnippets = ({ user }) => {
	const { data: snippets, mutate } = useSWR("/api/mySnippets");
	return (
		<>
			<Head>
				<title>{user.name} - Code Snippets</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<main className="">
				<Header title="My Snippets" />
				{snippets?.map(snippet => (
					<Snippet
						key={snippet.id}
						snippet={snippet}
						snippetDeleted={mutate}
					/>
				))}
			</main>
		</>
	);
};

export default mySnippets;

export const getServerSideProps = withPageAuthRequired({
	async getServerSideProps(context) {
		const session = getSession(context.req, context.res);
		const user = session.user;
		return { props: { user } };
	},
});
