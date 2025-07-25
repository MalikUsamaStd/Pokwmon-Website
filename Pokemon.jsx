import { useEffect,useState } from "react";
import Cards from "./Cards";

const Pokemon = () => {
  const [pokemon, setPokemon] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const[search,setSearch]=useState("")
  const API = "https://pokeapi.co/api/v2/pokemon?limit=124";

  const fetchPokemon = async () => {
    try {
      const response = await fetch(API);
      const data = await response.json();
       const fetchData = data.results.map(async(curPokemon) =>{
        const res = await fetch(curPokemon.url)
        const data = await res.json()
        return data;
       });
      
      //  console.log(fetchData);
       const detailedResponse = await Promise.all(fetchData);
       console.log(detailedResponse);
       setPokemon(detailedResponse);
       setLoading(false);

    } catch (error) {
      console.log(error);
      setLoading(false);
      setError(error);
      
    }

  };

  useEffect(() => {
    fetchPokemon();
  }, []);

  const searchData = pokemon.filter((curPokemon)=>
  curPokemon.name.toLowerCase().includes(search.toLowerCase())
);
  if(loading)
  {
    return(
      <>
      <div>
        <h2>Loading ....</h2>
      </div>
      </>
    )
  }

  if(error)
     {
    return(
      <>
      <div>
        <h2>{error.message}</h2>
      </div>
      </>
    )
  }

  return (
    <>
      <header className="container" style={{ textAlign: "center" }}>
      <h1  className="mb-5">
        Hello Pokemon!
      </h1>
      <div >
        <input className="Pokemon-Search" type="text" placeholder ="Search Pokemon" value={search} 
        onChange={(e)=>setSearch(e.target.value)}/>
      </div>
      </header>
      <div>
        <ul className="cards">

          {
            // pokemon.map((curPokemon) =>
              searchData.map((curPokemon) =>{
                return<Cards key={curPokemon.id} pokemonData={curPokemon}/>
            })
          }

        </ul>
      </div>

    </>
  );
};

export default Pokemon;
