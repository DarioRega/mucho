import { defineConfig, type TinaField } from "tinacms";

const TIME_PATTERN = /^([01]\d|2[0-3]):[0-5]\d$/;

const timeField = (name: string, label: string): TinaField => ({
  type: "string",
  name,
  label,
  ui: {
    validate: (value?: string) => {
      if (value && !TIME_PATTERN.test(value)) {
        return "Format attendu: HH:mm (ex. 07:30)";
      }
    }
  }
});

const openingPeriod = (name: string, label: string): TinaField => ({
  type: "object",
  name,
  label,
  fields: [
    {
      type: "boolean",
      name: "closed",
      label: "Fermé"
    },
    timeField("from", "De"),
    timeField("to", "À")
  ]
});

const branch =
  process.env.GITHUB_BRANCH ||
  process.env.VERCEL_GIT_COMMIT_REF ||
  process.env.HEAD ||
  "main";
export default defineConfig({
  branch,
  clientId: process.env.TINA_CLIENT_ID,
  token: process.env.TINA_TOKEN,

  build: {
    outputFolder: "admin",
    publicFolder: "public"
  },
  media: {
    tina: {
      mediaRoot: "",
      publicFolder: "public"
    }
  },
  schema: {
    collections: [
      {
        name: "event",
        label: "events",
        path: "content/events",
        ui: {
          filename: {
            readonly: true
          }
        },
        fields: [
          {
            type: "string",
            name: "title",
            label: "Title",
            isTitle: true,
            required: true
          },
          {
            type: "string",
            name: "whenAndWhere",
            label: "When and where"
          },
          {
            label: "Description",
            name: "description",
            type: "string",
            required: true,
            ui: {
              component: "textarea"
            }
          },
          {
            type: "image",
            label: "Image",
            name: "imgSrc"
          },
          {
            type: "boolean",
            name: "active",
            label: "Active"
          }
        ]
      },
      {
        name: "section",
        label: "sections",
        path: "content/sections",
        ui: {
          filename: {
            readonly: true
          }
        },
        fields: [
          {
            type: "string",
            name: "title",
            label: "Title",
            isTitle: true,
            required: true
          },
          {
            type: "boolean",
            name: "showTitle",
            label: "Show title ?"
          },
          {
            label: "Description",
            name: "description",
            type: "string",
            ui: {
              component: "textarea"
            }
          },
          {
            type: "image",
            label: "Image",
            name: "imgSrc"
          },
          {
            type: "boolean",
            label: "Is this the Menu section ?",
            name: "isMenu"
          },
          {
            type: "number",
            name: "order",
            label: "Order"
          }
        ]
      },
      {
        name: "menuCategory",
        label: "carte - catégories",
        path: "content/menu-categories",
        ui: {
          filename: {
            readonly: true
          }
        },
        fields: [
          {
            type: "string",
            name: "title",
            label: "Titre",
            isTitle: true,
            required: true
          },
          {
            type: "number",
            name: "order",
            label: "Ordre d'affichage",
            required: true
          }
        ]
      },
      {
        name: "menuItem",
        label: "carte - plats & vins",
        path: "content/menu",
        ui: {
          filename: {
            readonly: true
          }
        },
        fields: [
          {
            type: "string",
            name: "name",
            label: "Nom",
            required: true,
            isTitle: true
          },
          {
            type: "string",
            name: "price",
            label: "Prix",
            required: true
          },
          {
            type: "reference",
            name: "category",
            label: "Catégorie",
            collections: ["menuCategory"],
            required: true
          },
          {
            type: "number",
            name: "order",
            label: "Ordre dans la catégorie",
            required: true
          },
          {
            type: "boolean",
            name: "active",
            label: "Affiché sur le site ?"
          }
        ]
      },
      {
        name: "openingHours",
        label: "horaires",
        path: "content/hours",
        format: "json",
        match: {
          include: "horaires"
        },
        ui: {
          allowedActions: {
            create: false,
            delete: false
          },
          filename: {
            readonly: true
          }
        },
        fields: [
          {
            type: "object",
            name: "week",
            label: "Semaine",
            list: true,
            ui: {
              itemProps: (item) => ({ label: item?.day })
            },
            fields: [
              {
                type: "string",
                name: "day",
                label: "Jour",
                required: true
              },
              openingPeriod("morning", "Matin"),
              openingPeriod("evening", "Soir")
            ]
          }
        ]
      }
    ]
  }
});
