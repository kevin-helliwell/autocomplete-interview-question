import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'

// Interview Question: Make an autocomplete input with a mock API and display the results of what the user put in

function getAutoCompleteResults(query:string, signal?:AbortSignal): Promise<string[]> {
  const wowClasses = ["Death Knight", "Demon Hunter", "Druid", "Evoker", "Hunter", "Mage", "Monk", "Paladin", "Priest", "Rogue", "Shaman", "Warlock", "Warrior" ];
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (signal?.aborted) {
        reject(signal.reason)
      }
      resolve(
        wowClasses.filter((wowClass) => wowClass.toLowerCase().includes(query.toLowerCase())
        )
      );
    }), Math.random()*1000; // Mocks a slow API request
  })

}

function useDebounceValue(value:string, time=250) {
  const [debounceValue, setDebounceValue] = useState(value)

  useEffect(
    () => {
      const timeout = setTimeout(() => {setDebounceValue(value)}, time)
    return () => {
      clearTimeout(timeout)
    }
    
    }
  ,[value, time]);
  return debounceValue
}


function App() {
  const [query, setQuery] = useState('')
  const [suggestions, setSuggestions] = useState<string[]>([])
  const debounceQuery = useDebounceValue(query)
  const controller = new AbortController()

  useEffect(() => {
    const signal = controller.signal;
    (async ()=> {
      setSuggestions([])
      if (debounceQuery.length > 0) {
        console.log(debounceQuery)
        const data = await getAutoCompleteResults(debounceQuery, signal)
        setSuggestions(data)
      }
    })()
    return () => controller.abort("cancel request")
  }, [debounceQuery])

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
