import { useRouter } from "next/router";
import { useMemo } from "react";
import useSWR from "swr";
import SnippetsList from "../../components/SnippetsList";

const SnippetsByLanguage = () => {
	const router = useRouter();
	const language = router.query.language;
	const { data: snippets, mutate } = useSWR(
		language ? `/api/snippets/${language.toLowerCase()}` : null
	);
	const lang = useMemo(() => {
		if (!language) return "";
		return `${language[0].toUpperCase()}${language.slice(1)}`;
	}, [language]);

	return (
		<SnippetsList
			metaTitle={`${lang ? `${lang} - ` : ""}Code Snippets`}
			title={`${lang ? `${lang} ` : ""}Code Snippets`}
			snippets={snippets}
			onSnippetsDelete={mutate}
		/>
	);
};

export default SnippetsByLanguage;
