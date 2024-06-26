import React, { useState } from 'react'
import { Alert, FlatList, ScrollView } from 'react-native'
import { Header } from '../../components/Header'
import { Container, Transactions } from './styles'
import { Input } from '../../components/Input'
import { Button } from '../../components/Button'
import { saleGetAll } from '../../sale/saleGetAll'
import { SaleStorageDTO } from '../../sale/SaleStorageDTO'
import { TransactionCalculateSales } from '../../components/TransactionCalculatesSales'

export function SearchSales() {
  const [client, setClient] = useState('')
  const [product, setProduct] = useState('')
  const [monthYear, setMonthYear] = useState('')
  const [sales, setSales] = useState<SaleStorageDTO[]>([])

  async function handleSearchSale() {
    const trimmedClient = client.trim();
    const trimmedProduct = product.trim();
    const trimmedMonthYear = monthYear.trim();

    if (trimmedClient === '' && trimmedProduct === '' && trimmedMonthYear === '') {
      return Alert.alert('Atenção', 'Digite pelo menos um cliente, produto ou mês/ano para pesquisar');
    } 

    const data = await saleGetAll()
    let newData = [...data]

    if (trimmedClient !== '') {
      newData = newData.filter(dat => dat.client.toUpperCase().includes(trimmedClient.toUpperCase()))
    }

    if (trimmedProduct !== '') {
      newData = newData.filter(dat => dat.product.toUpperCase().includes(trimmedProduct.toUpperCase()))
    }

    if (trimmedMonthYear !== '') {
      newData = newData.filter(dat => dat.monthYear.toUpperCase().includes(trimmedMonthYear.toUpperCase()))
    }

    if (newData.length === 0) {
      setSales([])
      return Alert.alert('Atenção', 'Nenhum resultado encontrado!')
    }

    setSales(newData)
    setClient('')
    setProduct('')
    setMonthYear('')
  }

  return (
    <Container>
      <Header title='Pesquisa Vendas' />
      <ScrollView>
      <Input
        placeholder='Cliente'
        placeholderTextColor='#363F5F'
        value={client}
        onChangeText={value => setClient(value)}
      />

      <Input
        placeholder='Produto'
        placeholderTextColor='#363F5F'
        value={product}
        onChangeText={value => setProduct(value)}
        keyboardType='numeric'
      />

      <Input
        placeholder='Mês/Ano (MMYYYY)'
        placeholderTextColor='#363F5F'
        value={monthYear}
        onChangeText={value => setMonthYear(value)}
        keyboardType='numeric'
      />
      </ScrollView>
      <Button
        title='Pesquisar'
        onPress={handleSearchSale}
      />

      <Transactions>
        <FlatList
          data={sales}
          renderItem={({ item }) =>
            <TransactionCalculateSales data={item} />
          }
        />
      </Transactions>

    </Container>
  )
}
