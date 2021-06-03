import { useUser } from "@auth0/nextjs-auth0";
import Link from "next/link";

const Navbar = () => {
	const { user, isLoading } = useUser();
	return (
		<nav>
			<Link href="/">
				<div className="text-2xl mb-2 text-center text-red-200 uppercase cursor-pointer">
					Errday Snippets
				</div>
			</Link>
			<div className="flex space-x-3 justify-center mb-6 mx-auto">
				<Link href="/snippets/html">
					<span className="text-red-100 hover:underline uppercase cursor-pointer">
						html
					</span>
				</Link>
				<Link href="/snippets/css">
					<span className="text-red-100 hover:underline uppercase cursor-pointer">
						css
					</span>
				</Link>
				<Link href="/snippets/javascript">
					<span className="text-red-100 hover:underline uppercase cursor-pointer">
						javascript
					</span>
				</Link>
				{!user && !isLoading && (
					<Link href="/api/auth/login">
						<span className="text-red-100 hover:underline cursor-pointer">
							Login
						</span>
					</Link>
				)}
				{user && !isLoading && (
					<>
						<Link href="/mySnippets">
							<span className="text-red-100 hover:underline cursor-pointer">
								My Snippets
							</span>
						</Link>
						<Link href="/api/auth/logout">
							<span className="text-red-100 hover:underline cursor-pointer">
								Logout
							</span>
						</Link>
					</>
				)}
			</div>
		</nav>
	);
};

export default Navbar;
