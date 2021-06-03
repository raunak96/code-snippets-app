import Head from "next/head";
import Snippet from "../components/Snippet";
import useSWR from "swr";
import Link from "next/link";
import Header from "../components/Header";
export default function Home() {
	// mutate used to refetch data from specified API
	const { data: snippets, mutate } = useSWR("/api/snippets");
	return (
		<>
			<Head>
				<title>Code Snippets</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<main className="">
				<Header
					title="Errday Code Snippets"
					subtitle="Create and browse snippets you use every day in Web Development!"
				/>
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
}
