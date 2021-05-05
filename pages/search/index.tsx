import { GetServerSideProps } from "next";
import CardItem from "../../components/CardItem";
import CardItemGrid from "../../components/CardItemGrid";
import Heading from "../../components/Heading";
import { customGet } from "../../utils/customGet";

export default function Search({ categories }) {
  return (
    <div className="p-4">
      <Heading text="Browse Categories" />

      <CardItemGrid>
        {categories?.categories.items.map((category) => (
          <CardItem
            key={category.id}
            altTitle={category.name}
            heading={category.name}
            id={category.id}
            images={category.icons}
            type="genre"
          />
        ))}
      </CardItemGrid>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const categories = await customGet(
    "https://api.spotify.com/v1/browse/categories?limit=50&country=IN",
    ctx
  );
  return { props: { categories } };
};
