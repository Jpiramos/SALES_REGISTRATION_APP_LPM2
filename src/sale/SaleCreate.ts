import AsyncStorage from "@react-native-async-storage/async-storage";

import { SaleStorageDTO } from "./SaleStorageDTO";

import { SALE_COLLECTION }
  from "../storage/storageConfig";

import { saleGetAll } from "./saleGetAll";

export async function saleCreate(
  newSale: SaleStorageDTO) {
  try {
    const storageSale = await saleGetAll()

    const storage = [...storageSale, newSale]

    await AsyncStorage.setItem(SALE_COLLECTION,
      JSON.stringify(storage))
  } catch (error) {
    throw error;
  }
}