// import { useState } from 'react'
import '../index.css'
import Navbar from './Navbar'
import { Routes, Route } from 'react-router'
import Crud from './Crud'
import Calendar from './Calendar'
import Graphics from './Graphics'
import Map from './Map'
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"

const queryClient = new QueryClient();



function App() {

  return (
    	<QueryClientProvider client={queryClient}>
      <Navbar />
      <Routes>
          <Route index element={<Crud />} />
          <Route path="calendar" element={<Calendar />}/>
          <Route path="graphics" element={<Graphics />}/>
          <Route path="map" element={<Map />} />
          <Route path="calendar" element={<Calendar />}/>
      </Routes>
    </QueryClientProvider>
  )
}

export default App