import type { UserRecord } from "../models/recordsInterface";

export const initLocalStorageExampleData = () => {
  if (localStorage.getItem("saasoft-test") == null) {
    localStorage.setItem(
      "saasoft-test",
      JSON.stringify([
        {
          uuid: "3538570a-d824-42e0-b008-cc8703456932",
          tag: [{ text: "XXX" }],
          type: "local",
          login: "Значение",
          password: "123456",
        },
        {
          uuid: "416534b8-1238-4f3b-b06f-25ff89a3f7ae",
          tag: [{ text: "XXX" }, { text: "YYYYYYYYYYY" }, { text: "IIIIIII" }, { text: "MMMMMM" }],
          type: "local",
          login: "Значение",
          password: "123456",
        },
        {
          uuid: "9eca8041-662f-46cb-98e9-c265d012d78e",
          tag: [{ text: "XXX" }],
          type: "local",
          login: "Значение",
          password: "123456",
        },
        {
          uuid: "c4de1146-8608-4d3a-8ac4-bc0f09b1f65a",
          tag: [{ text: "Значение" }],
          type: "ldap",
          login: "Значение",
          password: null,
        },
        {
          uuid: "54c10f1e-67fe-4f69-a1bc-3fe8d280f0bd",
          tag: [{ text: "Значение" }],
          type: "ldap",
          login: "Значение",
          password: null,
        },
      ] as UserRecord[]),
    );
  }
};
