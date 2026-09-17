import React from "react";
import DotLogo from "../components/DotLogo";

export default function Home() {
	return (
		<main>
			<section
				style={{
		  minHeight: "135vh",
					display: "grid",
					placeItems: "center",
					padding: "12vh 24px",
				}}
			>
				<DotLogo />
			</section>
		</main>
	);
}
