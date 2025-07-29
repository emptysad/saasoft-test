import { defineStore } from "pinia";
import { ref, watch } from "vue";
import { type UserRaw, type UserRecord } from "./recordsInterface";
import { initLocalStorageExampleData } from "../helpers/exampleLocalStorage";

export const useRecordsStore = defineStore("usersStore", () => {
  initLocalStorageExampleData();

  const records = ref<UserRecord[]>(
    JSON.parse(localStorage.getItem("saasoft-test") || "[]") as UserRecord[],
  );

  const convertRawToRecord = (raw: UserRaw): UserRecord => {
    const record: UserRecord = {
      tag: undefined,
      type: raw.type,
      login: raw.login,
      password: raw.password || null,
    };

    if (raw.type == "ldap") {
      record.password = null;
    }

    if (raw.tag != "") {
      raw.tag = raw.tag.replace(/\n/g, " ");
      record.tag = raw.tag
        .split(";")
        .map((val) => {
          return { text: val.trim() };
        })
        .filter((el) => el.text !== "");

      if (record.tag.length === 0) {
        record.tag = undefined;
      }
    }

    return record;
  };

  const convertRecordToRaw = (record: UserRecord): UserRaw | undefined => {
    if (record == null) {
      return undefined;
    }

    let tag = "";
    if (record.tag) {
      tag = record.tag.reduce(
        (
          prev: string,
          cur: NonNullable<UserRecord["tag"]>[number],
          i: number,
          array: UserRecord["tag"],
        ) => prev + cur.text + (i + 1 === array?.length ? "" : "; "),
        "",
      );
    }
    const type = record.type;
    const login = record.login;
    const password = record.password == null ? "" : record.password;

    return {
      tag,
      type,
      login,
      password,
    } as UserRaw;
  };

  const changeRecord = (index: number, record: UserRaw) => {
    if (records.value && records.value[index]) {
      const uuid = records.value[index].uuid;
      records.value[index] = { uuid, ...convertRawToRecord(record) };
    }
  };

  const deleteRecord = (index: number) => {
    records.value.splice(index, 1);
  };

  const addRecord = (raw: UserRaw) => {
    const uuid = crypto.randomUUID();
    records.value.push({ uuid, ...convertRawToRecord(raw) });
  };

  const getRawRecordByIndex = (index: number): UserRaw | undefined => {
    if (records.value[index]) {
      return convertRecordToRaw(records.value[index]);
    }
    return undefined;
  };

  const saveInLocalStorage = () => {
    localStorage.setItem("saasoft-test", JSON.stringify(records.value));
  };

  watch(
    records,
    () => {
      saveInLocalStorage();
    },
    { deep: true },
  );

  return { records, changeRecord, addRecord, deleteRecord, getRawRecordByIndex };
});
