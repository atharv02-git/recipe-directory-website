import { useFetch } from '../../hooks/useFetch'
import { useLocation } from 'react-router-dom'
import RecipeList from '../../components/RecipeList'
import { useTheme } from "../../hooks/useTheme";

// styles
import './Search.css'

export default function Search() {
  const { mode } = useTheme();

  const queryString = useLocation().search
  const queryParams = new URLSearchParams(queryString)
  const query = queryParams.get('_q')

  const url = 'http://localhost:3000/recipes?q=' + query
  const { error, isPending, data } = useFetch(url)

  return (
    <div>
      <h2 className={`page-title ${mode}`}>Recipes including "{query}"</h2>
      {error && <p className="error">{error}</p>}
      {isPending && <p className="loading">Loading...</p>}
      {data && <RecipeList recipes={data} />}
    </div>
  )
}