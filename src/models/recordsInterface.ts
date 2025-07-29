export const typesOptions = [
  {
    type: "ldap",
    title: "LDAP",
  },
  {
    type: "local",
    title: "Локальная",
  },
] as const;

type typesUnion = (typeof typesOptions)[number]["type"];

export interface UserRaw {
  tag: string;
  type: typesUnion;
  login: string;
  password: string;
}

export interface UserRecord {
  uuid?: string;
  tag?: { text: string }[];
  type: typesUnion;
  login: string;
  password: string | null;
}
