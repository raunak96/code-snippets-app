import useSWR from "swr";
import SnippetsList from "../components/SnippetsList";
export default function Home() {
	// mutate used to refetch data from specified API
	const { data: snippets, mutate } = useSWR("/api/snippets");
	return (
		<SnippetsList
			metaTitle="Code Snippets"
			subtitle="Create and browse snippets you use every day in Web Development!"
			snippets={snippets}
			onSnippetsDelete={mutate}
		/>
	);
}
