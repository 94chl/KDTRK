import Image from "../../components/Image";

export default {
  title: "Example/Image",
  component: Image,
  argTypes: {
    src: {
      type: { name: "string", require: true },
      defaultValue: "https://picsum.photos/200",
      control: { type: "text" },
    },
    placeholder: {
      type: { name: "string", require: true },
      defaultValue: "https://via.placeholder.com/200",
      control: { type: "text" },
    },
    threshold: { type: "number", defaultValue: 0.5, control: "number" },
    alt: { control: "string" },
    lazy: { control: "boolean", defaultValue: false },
    block: { control: "boolean", defaultValue: false },
    width: {
      defaultValue: 200,
      control: { type: "range", min: 200, max: 600 },
    },
    height: {
      defaultValue: 200,
      control: { type: "range", min: 200, max: 600 },
    },
    mode: {
      defaultValue: "cover",
      options: ["cover", "fill", "contain"],
      control: "inline-radio",
    },
  },
};

export const Default = (args) => {
  return <Image {...args}></Image>;
};

export const Lazy = (args) => {
  return (
    <div>
      {Array.from(new Array(20), (_, k) => k).map((i) => (
        <Image {...args} lazy block src={`${args.src}?${i}`} key={i} />
      ))}
    </div>
  );
};
