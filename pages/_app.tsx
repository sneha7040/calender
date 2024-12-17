import { AppProps } from 'next/app';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Wrapper from '@/layout/wrapper/wrapper';


function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
        <Wrapper>
       <Component {...pageProps} />
    </Wrapper>
    
    </>


     
   
  );
}

export default MyApp;
