import { useState } from 'react'
import { Alert, ScrollView } from 'react-native'
import { Button } from '../../components/Button'
import { Header } from '../../components/Header'
import { Input } from '../../components/Input'
import { Container } from './styles'
import { InputAmount } from '../../components/InputAmount'
import { InputDate } from '../../components/InputDate'
import { saleCreate } from '../../sale/SaleCreate'
import { saleGetAll } from '../../sale/saleGetAll'
import { formatAmount } from '../../utils/formatAmount'
import AsyncStorage from '@react-native-async-storage/async-storage'


export function Dashboard() {

  const [monthYear, setMonthYear] = useState('')
  const [product, setProduct] = useState('')
  const [amount, setAmount] = useState('')
  const [value, setValue] = useState('')
  const [client, setClient] = useState('')

  async function handleAddNewSale() {

    // limpa o AsyncStorage no ios
    // AsyncStorage.getAllKeys().then(AsyncStorage.multiRemove)
    // alert('O programa sera finalizado')
    // return

    // limpa o AsyncStorage no android
    // await AsyncStorage.clear()
    // alert('O programa sera finalizado')
    // return

    const trimmedMonthYear = monthYear.trim();
    const trimmedProduct = product.trim();
    const trimmedAmount = amount.trim();
    const trimmedValue = value.trim();
    const trimmedClient = client.trim();

    if (trimmedMonthYear === '' && trimmedAmount === '' && trimmedProduct === '' &&
      trimmedValue === '' && trimmedClient === '') {
      return Alert.alert('Atenção', 'Favor preencha todos os campos !!!')
    }

    if(trimmedProduct !== "30-320" && trimmedProduct !== "20-280" && trimmedProduct !== "40-280" && trimmedProduct !== "50-310") {
      return Alert.alert('Atenção', 'Produtos disponíveis para cadastro: 30-320, 20-280, 40-280 e 50-310')
    }

    if (trimmedValue === 'R$0,00') {
      return Alert.alert('Atenção', 'O Valor não pode ser R$ 0,00')
    }

    if (trimmedAmount === '0') {
      return Alert.alert('Atenção', 'A quantidade não pode ser 0')
    }

    const clients = ['nissan', 'volkswagen', 'hyundai', 'peugeot']
    if (!clients.includes(trimmedClient.toLowerCase())) {
      return Alert.alert('Atenção', 'Aceita somente os clientes nissan, volkswagen, hyundai e peugeot')
    }

    const data = {
      id: String(new Date().getTime()),
      monthYear: trimmedMonthYear,
      product: trimmedProduct,
      amount: parseInt(trimmedAmount),
      value: formatAmount(trimmedValue),
      client: trimmedClient
    }

    setMonthYear('')
    setProduct('')
    setAmount('')
    setValue('')
    setClient('')

    await saleCreate(data)
    const result = await saleGetAll()
    console.log(result)
  }

  return (
    <Container>
      <Header title='Controle de Veículos por Cliente' />

      <ScrollView>
        <InputDate
          placeholder='Mês e ano'
          placeholderTextColor='#363F5F'
          value={monthYear}
          onChangeText={value => setMonthYear(value)}
        />

        <Input
          placeholder='Produto'
          placeholderTextColor='#363F5F'
          value={product}
          onChangeText={value => setProduct(value)}
        />

        <Input
          keyboardType='numeric'
          placeholder='Quantidade'
          placeholderTextColor='#363F5F'
          value={amount}
          onChangeText={value => setAmount(value)}
        />

        <InputAmount
          placeholder='Valor'
          placeholderTextColor='#363F5F'
          value={value}
          autoCapitalize='none'
          onChangeText={value => setValue(value)}
        />

        <Input 
          placeholder='Cliente'
          placeholderTextColor='#363F5F'
          value={client}
          onChangeText={value => setClient(value)}
        />

      </ScrollView>

      <Button
        title='Adicionar'
        onPress={handleAddNewSale}
      />

    </Container>
  )
}
