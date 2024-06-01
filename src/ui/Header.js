import Navbar from "./Navbar";
import Showcase from "./Showcase";

export default function Header({ lower }) {
	return (
		<header>
			<Navbar />
			<Showcase lower={lower} />
		</header>
	);
}
