let DB: KVNamespace

export const setDB = (db: KVNamespace) => (DB = db)

export const getDB = () => DB;

export const getFromDB = async (key: string) => await DB.get(key)

export const putToDB = async (key: string, value: string) => await DB.put(key, JSON.stringify(value))

export const getDBKeys = async (): Promise<KVNamespaceListResult<{name: string}>> => await DB.list()