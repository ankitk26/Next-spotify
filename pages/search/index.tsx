/** biome-ignore-all lint/suspicious/noExplicitAny: <will fix later> */
import type { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";
import CardItem from "@/components/card-item";
import CardItemGrid from "@/components/card-item-grid";
import Heading from "@/components/heading";
import Layout from "@/components/layout";
import { customGet } from "@/utils/custom-get";
import { isAuthenticated } from "@/utils/is-authenticated";

export default function Search({ categories }: { categories: any }) {
	return (
		<Layout title="Spotify - Search">
			<Heading text="Browse Categories" />

			<CardItemGrid>
				{categories?.categories.items.map((category: any) => (
					<CardItem
						altTitle={category.name}
						heading={category.name}
						id={category.id}
						images={category.icons}
						key={category.id}
						type="genre"
					/>
				))}
			</CardItemGrid>
		</Layout>
	);
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
	const session = await getSession(ctx);

	if (!(await isAuthenticated(session))) {
		return {
			redirect: {
				destination: "/login",
				permanent: false,
			},
		};
	}

	const categories = await customGet(
		"https://api.spotify.com/v1/browse/categories?limit=50&country=IN",
		session
	);
	return { props: { categories } };
};
