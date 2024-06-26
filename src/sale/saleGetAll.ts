import AsyncStorage
  from "@react-native-async-storage/async-storage";

import { SALE_COLLECTION }
  from "../storage/storageConfig";

import { SaleStorageDTO }
  from "./SaleStorageDTO";

export async function saleGetAll() {
  try {
    const storage = await AsyncStorage
      .getItem(SALE_COLLECTION)
    const sale: SaleStorageDTO[] = storage
      ? JSON.parse(storage)
      : []

    return sale
  } catch (error) {
    throw error;
  }
}