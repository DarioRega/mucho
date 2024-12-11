import { defineConfig } from "tinacms";

const branch =
    process.env.GITHUB_BRANCH ||
    process.env.VERCEL_GIT_COMMIT_REF ||
    process.env.HEAD ||
    "main";

export default defineConfig({
  branch,
  clientId: process.env.NEXT_PUBLIC_TINA_CLIENT_ID,
  token: process.env.TINA_TOKEN,

  build: {
    outputFolder: "admin",
    publicFolder: "public",
  },
  media: {
    tina: {
      mediaRoot: "",
      publicFolder: "public",
    },
  },
  schema: {
    collections: [
      {
        name: "event",
        label: "events",
        path: "content/events",
        ui: {
          filename: {
            readonly: true,
          }
        },
        fields: [
          {
            type: "string",
            name: "title",
            label: "Title",
            isTitle: true,
            required: true,
          },
          {
            type: "string",
            name: "whenAndWhere",
            label: "When and where",
          },
          {
            label: 'Description',
            name: 'description',
            type: 'string',
            required: true,
            ui: {
              component: 'textarea',
            },
          },
          {
            type: 'image',
            label: 'Image',
            name: 'imgSrc',
          },
          {
            type: "boolean",
            name: "active",
            label: "Active",
          },
        ],
      },
      {
        name: "section",
        label: "sections",
        path: "content/sections",
        ui: {
          filename: {
            readonly: true,
          }
        },
        fields: [
          {
            type: "string",
            name: "title",
            label: "Title",
            isTitle: true,
            required: true,
          },
          {
            type: "boolean",
            name: "showTitle",
            label: "Show title ?",
          },
          {
            label: 'Description',
            name: 'description',
            type: 'string',
            ui: {
              component: 'textarea',
            },
          },
          {
            type: 'image',
            label: 'Image',
            name: 'imgSrc',
          },
          {
            type: 'boolean',
            label: 'Is this the Menu section ?',
            name: 'isMenu',
          },
          {
            type: "number",
            name: "order",
            label: "Order",
          },
        ],
      },
      {
        name: "snack",
        label: "snacks",
        path: "content/snacks",
        ui: {
          filename: {
            readonly: true,
          }
        },
        fields: [
          {
            label: "Name",
            name: "name",
            type: "string",
            required: true,
            isTitle: true,
          },
          {
            label: "Price",
            name: "price",
            type: "string",
            required: true,
          },
          {
            type: "number",
            name: "order",
            label: "Order",
            required: true,
          },
        ],
      },
      {
        name: "wine",
        label: "wines",
        path: "content/wines",
        ui: {
          filename: {
            readonly: true,
          }
        },
        fields: [
          {
            label: "Name",
            name: "name",
            type: "string",
            required: true,
            isTitle: true,
          },
          {
            label: "Price",
            name: "price",
            type: "string",
            required: true,
          },
          {
            type: "number",
            name: "order",
            label: "Order",
            required: true,
          },
        ],
      },
      {
        name: "cocktail",
        label: "cocktails",
        path: "content/cocktails",
        ui: {
          filename: {
            readonly: true,
          }
        },
        fields: [
          {
            label: "Name",
            name: "name",
            type: "string",
            required: true,
            isTitle: true,
          },
          {
            label: "Price",
            name: "price",
            type: "string",
            required: true,
          },
          {
            type: "number",
            name: "order",
            label: "Order",
            required: true,
          },
        ],
      },
    ],
  },
});
