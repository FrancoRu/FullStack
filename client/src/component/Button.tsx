import ButtonBostrap from 'react-bootstrap/Button'

type Props = {
  type: 'submit' | 'reset' | 'button' | undefined
  value: string
  variant?: string
  classname?: string
  handler?: (param?: string) => void
}

export const Button: React.FC<Props> = (props) => {
  return (
    <ButtonBostrap
      variant={props.variant ?? 'outline-success'}
      type={props.type}
      onClick={() => props.handler?.()}
      className={props.classname ?? props.classname}>
      {props.value}
    </ButtonBostrap>
  )
}
