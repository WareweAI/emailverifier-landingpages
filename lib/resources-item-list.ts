/** Serializable resource catalog for JSON-LD ItemList (server-safe). */
export const RESOURCES_ITEM_LIST = [
  {
    name: "Guides",
    path: "/guides",
    description:
      "Step-by-step how-tos for cleaning lists, verifying emails, and integrating the email verification API.",
  },
  {
    name: "Integrations",
    path: "/integrations",
    description:
      "Import lists from Google Drive, OneDrive, HubSpot, Salesforce, and other tools on the same credits.",
  },
  {
    name: "Blog",
    path: "/blog",
    description:
      "Product updates, email tips, and deliverability insights for teams using an email verifier.",
  },
] as const;
