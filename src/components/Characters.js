import React, { useState } from 'react'
import { useQuery } from 'react-query'
import Character from './Character'

function Characters() {
    const [page, setPage] = useState(1)

    const fetchCharacters = async ({queryKey}) => {
        const response = await fetch(`https://rickandmortyapi.com/api/character?page=${queryKey[1]}`)
        return response.json()
    }

    const { data, isPreviousData, isError, isLoading } = useQuery(['characters', page], fetchCharacters, {keepPreviousData: true})


    if(isLoading){
        return <div>Loading...</div>
    }

    if(isError){
        return <div>Error</div>
    }
  return (
    <div className='characters'>
        {data.results.map(character => (
            <Character key={character.name} character={character}/>
        ))}
        <div>
            <button 
            disabled={page === 1} 
            onClick={() => setPage((old) => old-1)}
            >
                Prev
            </button>
            
            <button 
            disabled={isPreviousData && !data.info.next} 
            onClick={() => setPage((old) => old+1)}
            >
                Next
            </button>
        </div>
    </div>
  )
}

export default Characters