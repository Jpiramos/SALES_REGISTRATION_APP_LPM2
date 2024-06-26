// hooks
import { useState, useEffect, useCallback } from 'react'
import { useFocusEffect } from '@react-navigation/native'
import { FlatList } from 'react-native'

import { Header } from '../../components/Header'
import {
  Container,
  Transactions
} from './styles'

import { TransactionSales }
  from '../../components/TransactionsSales'
import { saleGetAll } from '../../sale/saleGetAll'
import { SaleStorageDTO } from '../../sale/SaleStorageDTO'


export function ListSales() {
  const [dataSales, setDataSales] =
    useState<SaleStorageDTO[]>([])

  async function loadDataSale() {
    const data = await saleGetAll()
    setDataSales(data)
  }

  useFocusEffect(useCallback(() => {
    loadDataSale()
  }, []))

  return (
    <Container>
      <Header title='Listagem de Vendas' />

      <Transactions>
        <FlatList
          data={dataSales}
          renderItem={({ item }) =>
            <TransactionSales data={item} />
          }
          showsVerticalScrollIndicator={false}
        />
      </Transactions>

    </Container>
  )
}
