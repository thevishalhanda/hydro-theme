import { createSchema } from "@weaverse/hydrogen";
import type { SectionProps } from "~/components/section";
import { Section, sectionSettings } from "~/components/section";

// 1. Define your GraphQL Query
const PRODUCTS_QUERY = `#graphql
  query getProducts($country: CountryCode, $language: LanguageCode, $first: Int)
  @inContext(country: $country, language: $language) {
    products(first: $first) {
      nodes {
        id
        title
        handle
        featuredImage {
          url
          altText
          width
          height
        }
        priceRange {
          minVariantPrice {
            amount
            currencyCode
          }
        }
      }
    }
  }
`;

interface PromoBannerProps extends SectionProps {
  ref?: React.Ref<HTMLElement>;
  // Data from the loader will be available in props.loaderData
  loaderData?: {
    products: any[]; // Replace with proper types if available
  };
}

function PromoBanner(props: PromoBannerProps) {
  const { children, ref, loaderData, ...rest } = props;
  
  // You can now access the products here
  console.log("Fetched Products:", loaderData);

  return (
    <Section ref={ref} {...rest}>
      <div className="relative w-full overflow-hidden rounded-xl">
        {children}
        {/* Example: Render product titles if needed */}
        <div className="flex gap-4 mt-4">
          {loaderData?.products?.map((product: any) => (
            <div key={product.id} className="text-sm">{product.title}</div>
          ))}
        </div>
      </div>
    </Section>
  );
}

export default PromoBanner;

export const schema = createSchema({
  type: "promo-banner",
  title: "Promo Banner",
  childTypes: ["subheading", "heading", "paragraph", "button", "image"],
  presets: {
    // ... your existing presets
  },
});

// 2. Add the Loader function
export let loader = async ({ storefront, section }) => {
  const { productLimit } = section.settings;

  const data = await storefront.query(PRODUCTS_QUERY, {
    variables: {
      first: productLimit || 4,
    },
  });

  return {
    products: data.products.nodes,
  };
};

