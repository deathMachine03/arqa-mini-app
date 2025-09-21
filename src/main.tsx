import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { Toaster } from "sonner";
import "./i18n/i18n"; 
import { ThemeProvider } from "@/components/layout/ThemeProvider";


const client = new QueryClient()

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={client}>
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
    <App />
    <Toaster richColors position='top-right'/>
    </ThemeProvider>
    </QueryClientProvider>
  </StrictMode>,
)
