import React from 'react';
import { SaleStorageDTO } from '../../sale/SaleStorageDTO';
import { Container, Description, Category, Footer, Date, Quantity, TotalValue, Price } from './styles';
import { Text } from 'react-native';

type Props = {
  data: SaleStorageDTO;
};

export function TransactionCalculateSales({ data }: Props) {


  // Calcula o valor total
  const totalValue = data.amount * data.value;

  return (
    <Container>
      <Text> Produto: <Description>{data.product}</Description></Text>
      <Text> Valor: <Price>{data.value}</Price></Text>
      <Text> Cliente: <Category> {data.client}</Category></Text>

      <Footer>
        <Text> Data:<Date>{data.monthYear}</Date> </Text>
        <Text>Quantidade: <Quantity>{data.amount}</Quantity> </Text>
        <Text>Total: <TotalValue>{totalValue}</TotalValue></Text>
      </Footer>
    </Container>
  );
}
