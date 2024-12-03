// import { useState } from 'react'
import '../index.css'
import Navbar from './Navbar'
import { Routes, Route } from 'react-router'
import Crud from './Crud'
import Calendar from './Calendar'
import Graphics from './Graphics'
import Map from './Map'
// import queryClient
import { useEvents } from '../hooks/useEvents'

function App() {
  const { data: events, isLoading, error } = useEvents();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  if (!events) return <div>No events found</div>;


  return (
    <>
      <Navbar />
      <Routes>
          <Route index element={<Crud events={events}/>} />
          <Route path="calendar" element={<Calendar />}/>
          <Route path="graphics" element={<Graphics events={events}/>}/>
          <Route path="map" element={<Map />} />
          <Route path="calendar" element={<Calendar />}/>
      </Routes>
    </>
  )
}

export default App