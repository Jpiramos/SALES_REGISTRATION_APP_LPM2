import { TextInputProps } from 'react-native'

import {
  Container,
  InputStyle
} from './styles'

type InputProps = TextInputProps

export function InputDate({ ...rest }: InputProps) {
  return (
    <Container>
      <InputStyle
        type={'datetime'}
        options={{
          format: 'MMYYYY'
        }}
        {...rest}
      />
    </Container>
  )
}

