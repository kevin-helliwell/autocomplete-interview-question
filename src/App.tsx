import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'

// Interview Question: Make an autocomplete input with a mock API and display the results of what the user put in

function getAutoCompleteResults(query:string): Promise<string[]> {
  const wowClasses = ["Death Knight", "Demon Hunter", "Druid", "Evoker", "Hunter", "Mage", "Monk", "Paladin", "Priest", "Rogue", "Shaman", "Warlock", "Warrior" ];
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(
        wowClasses.filter((wowClass) => wowClass.toLowerCase().includes(query.toLowerCase())
        )
      );
    }), Math.random()*1000; // Mocks a slow API request
  })

}


function App() {
  const [query, setQuery] = useState('')
  const [suggestions, setSuggestions] = useState<string[]>([])
  useEffect(() => {
    (async ()=> {
      setSuggestions([])
      if (query.length > 0) {
        console.log(query)
        const data = await getAutoCompleteResults(query)
        setSuggestions(data)
      }
    })()
  }, [query])

  return (
    <div className=''>
      <input className='' value={query} onChange={(e) => {
        setQuery(e.target.value)
      }}/>
      <div className=''>
        {suggestions.map(suggestion => <div key={suggestion}>{suggestion}</div>)}
      </div>
    </div>

  )
}

export default App
