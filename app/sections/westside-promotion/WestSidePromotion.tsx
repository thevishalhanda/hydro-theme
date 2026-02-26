import { forwardRef } from "react";
import type { HydrogenComponentProps } from "@weaverse/hydrogen";
import { createSchema } from "@weaverse/hydrogen";

// 1. Define the TypeScript interface for your props
interface MyComponentProps extends HydrogenComponentProps {
  heading: string;
  description: string;
  buttonText: string;
  backgroundColor: string;
}

// 2. The React Component
// Note: Using forwardRef is required for Weaverse to handle selection in the Studio
const MyCustomComponent = forwardRef<HTMLElement, MyComponentProps>((props, ref) => {
  const { heading, description, buttonText, backgroundColor, ...rest } = props;

  return (
    <section 
      ref={ref} 
      {...rest} 
      style={{ backgroundColor }} 
      className="p-10 text-center"
    >
      <h2 className="text-3xl font-bold">{heading}</h2>
      <p className="mt-4">{description}</p>
      {buttonText && (
        <button className="mt-6 px-4 py-2 bg-black text-white rounded">
          {buttonText}
        </button>
      )}
    </section>
  );
});

export default MyCustomComponent;

// 3. Define the Schema for Weaverse Studio
export const schema = createSchema({
  type: "my-custom-component", // Unique ID
  title: "My Custom Component", // Display name in Studio
  settings: [
    {
      group: "Content",
      inputs: [
        {
          type: "text",
          name: "heading",
          label: "Heading",
          defaultValue: "Hello Weaverse!",
        },
        {
          type: "textarea",
          name: "description",
          label: "Description",
          defaultValue: "This is a custom component created with code.",
        },
        {
          type: "text",
          name: "buttonText",
          label: "Button Text",
          defaultValue: "Click Me",
        },
      ],
    },
    {
      group: "Design",
      inputs: [
        {
          type: "color",
          name: "backgroundColor",
          label: "Background Color",
          defaultValue: "#ffffff",
        },
      ],
    },
  ],
});
