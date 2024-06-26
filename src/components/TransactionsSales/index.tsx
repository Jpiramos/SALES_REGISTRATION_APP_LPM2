import { SaleStorageDTO }
  from "../../sale/SaleStorageDTO";
  import { Text } from 'react-native';
import {
  Container,
  Description,
  Amount,
  Quantity,
  Footer,
  Category,
  Date,
} from "./styles";


type Props = {
  data: SaleStorageDTO
}

export function TransactionSales({ data }: Props) {

 

  return (

    <Container>
      <Text> Produto: <Description>{data.product}</Description></Text>
      <Text> Valor: <Amount>{data.value}</Amount></Text>
      <Text> Cliente: <Category> {data.client}</Category></Text>

      <Footer>
        <Text> Data: <Date>{data.monthYear}</Date></Text>
        <Text>Quantidade: <Quantity>{data.amount}</Quantity> </Text>
      </Footer>
    </Container>
  );
}