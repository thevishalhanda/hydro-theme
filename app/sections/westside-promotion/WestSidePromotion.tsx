import { createSchema } from "@weaverse/hydrogen";
import type { SectionProps } from "~/components/section";
import { Section, sectionSettings } from "~/components/section";

interface PromoBannerProps extends SectionProps {
  ref?: React.Ref<HTMLElement>;
}

function PromoBanner(props: PromoBannerProps) {
  const { children, ref, ...rest } = props;

  return (
    <Section ref={ref} {...rest}>
      <div className="relative w-full overflow-hidden rounded-xl">
        {children}
      </div>
    </Section>
  );
}

export default PromoBanner;

export const schema = createSchema({
  type: "promo-banner",
  title: "Promo Banner",
  settings: sectionSettings,
  childTypes: [
    "subheading",
    "heading",
    "paragraph",
    "button",
    "image"
  ],
  presets: {
    gap: 16,
    children: [
      {
        type: "subheading",
        content: "LIMITED TIME OFFER",
      },
      {
        type: "heading",
        content: "Summer Collection 2026",
      },
      {
        type: "paragraph",
        content:
          "Discover the latest trends with up to 40% off on selected items.",
      },
      {
        type: "button",
        content: "Shop Now",
        settings: {
          link: "/collections/summer",
        },
      },
    ],
  },
});