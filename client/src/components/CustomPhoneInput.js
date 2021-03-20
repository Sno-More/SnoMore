import { forwardRef } from 'react'
import TextField from '@material-ui/core/TextField'

const phoneInput = (props, ref) => {

  return (

    <TextField
      {...props}
      inputRef={ref}
      fullWidth
      label='Phone Number'
      variant='outlined'
      name='phone'
      maxlength="14"
    />
  )
}
export default forwardRef(phoneInput)