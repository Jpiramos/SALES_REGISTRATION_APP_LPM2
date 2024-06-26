import React, { useState } from 'react';
import { Alert, FlatList, Text, View } from 'react-native';
import { Header } from '../../components/Header';
import { Container, Transactions } from './styles';
import { Input } from '../../components/Input';
import { Button } from '../../components/Button';
import { saleGetAll } from '../../sale/saleGetAll';
import { useFocusEffect } from '@react-navigation/native';

type TotalByClient = {
  client: string;
  total: number;
}

export function SearchTotal() {
  const [monthYear, setMonthYear] = useState('');
  const [totalByClient, setTotalByClient] = useState<TotalByClient[]>([]);

  useFocusEffect(
    React.useCallback(() => {
      // Reset the state when the screen is focused
      setTotalByClient([]);
      setMonthYear('');
    }, [])
  );

  async function handleSearchTotal() {
    const trimmedMonthYear = monthYear.trim();

    if (trimmedMonthYear === '') {
      return Alert.alert('Atenção', 'Digite um mês/ano para pesquisar');
    }

    const data = await saleGetAll();
    const filteredData = data.filter(dat => dat.monthYear.toUpperCase() === trimmedMonthYear.toUpperCase());

    if (filteredData.length === 0) {
      setTotalByClient([]);
      return Alert.alert('Atenção', 'Nenhum resultado encontrado!');
    }

    // Agrupar os dados por cliente e calcular o total das vendas
    const totals = filteredData.reduce((acc, sale) => {
      if (!acc[sale.client]) {
        acc[sale.client] = 0;
      }
      acc[sale.client] += sale.amount * sale.value;  // Calcula o total como quantidade * valor
      return acc;
    }, {} as { [key: string]: number });

    // Converter o objeto em um array
    const totalsArray = Object.keys(totals).map(client => ({
      client,
      total: totals[client]
    }));

    setTotalByClient(totalsArray);
    setMonthYear('');
  }

  return (
    <Container>
      <Header title='Totais Mensais' />

      <Input
        placeholder='Mês/Ano (MMYYYY)'
        placeholderTextColor='#363F5F'
        value={monthYear}
        onChangeText={value => setMonthYear(value)}
        keyboardType='numeric'
      />

      <Button
        title='Pesquisar'
        onPress={handleSearchTotal}
      />
    <Transactions>
      <FlatList
        data={totalByClient}
        keyExtractor={(item) => item.client}
        renderItem={({ item }) => (
          <View style={{ padding: 10 }}>
            <Text>Cliente: {item.client}</Text>
            <Text>Total: {item.total.toFixed(2)}</Text>
          </View>
          
        )}
      />
      </Transactions>
    </Container>
  );
}
