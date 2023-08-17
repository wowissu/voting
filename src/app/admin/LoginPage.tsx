'use client';
import { resolveUrl } from '@/utilities/resolveUrl';
import { setLoginToken } from '@/utilities/token-client';
import { Box, Button, TextField } from '@mui/material'
import { ChangeEventHandler, FC, FormEventHandler, useCallback, useState } from 'react'


const LoginPage: FC = () => {
  const [passwordInput, setPasswordInput] = useState(process.env.ADMIN_PASSWORD)
  
  const doLogin = useCallback<FormEventHandler<HTMLFormElement>>(async (e) => {
    e.stopPropagation();
    e.preventDefault();
    
    const res = await fetch(resolveUrl("/api/login"), { method: "POST", body: JSON.stringify({ password: passwordInput }) });
    const data = await res.json()
    
    setLoginToken(data.token);

    window.location.reload();
  }, [passwordInput])

  
  const onChange = useCallback<ChangeEventHandler<HTMLInputElement>>((e) => {
    setPasswordInput(e.target.value);
  }, [])

  return (
    <div className="w-screen h-screen flex items-center justify-center">
      <div>
        <Box 
          component="form" 
          sx={{ p: 2, }}
          noValidate
          autoComplete="off"
          className="space-y-4"
          onSubmit={doLogin}
        >
          <div>
            <TextField id="password" label="Password" variant="outlined" value={passwordInput} onChange={onChange}  />
          </div>
          <div>
            <Button type="submit" variant="contained">Login</Button>
          </div>
        </Box>
      </div>
    </div>
  )
}

export default LoginPage;