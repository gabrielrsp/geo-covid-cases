import { useEffect, useState } from 'react'
import logo from './logo.svg'
import './App.css'
import { supabase } from './api/supabase'

function App() {
  const [items, setItems] = useState([])
  const [item, setItem] = useState({})

  useEffect(() => {
    fetchData()
  },[])

  async function fetchData() {
    const { data } : any = await supabase
    .from('covidvariants')
    .select()
    setItems(data)

    console.log("data: ", data)
  }


  return (
    <div className="App">
        <h1>Hello</h1>

    </div>
  )
}

export default App
