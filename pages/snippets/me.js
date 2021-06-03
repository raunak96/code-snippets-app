import { getSession, withPageAuthRequired } from "@auth0/nextjs-auth0";
import useSWR from "swr";
import SnippetsList from "../../components/SnippetsList";

const mySnippets = ({ user }) => {
	const { data: snippets, mutate } = useSWR("/api/snippets/me");
	return (
		<SnippetsList
			metaTitle={`${user.name} - Code Snippets`}
			title="My Snippets"
			snippets={snippets}
			onSnippetsDelete={mutate}
		/>
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
