import 'normalize.scss/normalize.scss'
import './index.scss'

import {
  BrowserRouter as Router,
  Route,
  Switch,
} from 'react-router-dom'

import NavigationButton from '../components/navigation-button/NavigationButton'
import IngredientPage from '../containers/create-ingredient/IngredientPage'
import RecipePage from '../containers/create-recipe/RecipePage'
import HomePage from '../containers/home/HomePage'
import ShowRecipe from '../containers/show-recipe/ShowRecipe'

const App = () => {
    return (
        <Router>
            <section className="container">
                <aside>
                    <nav className="navigation-bar">
                        <NavigationButton
                            link="/"
                            routeName="Inicio"
                            className="navigation-bar__link"
                        />
                        <NavigationButton
                            link="/recipes"
                            routeName="Recetas"
                            className="navigation-bar__link"
                        />
                        <NavigationButton
                            link="/ingredients"
                            routeName="Ingredientes"
                            className="navigation-bar__link"
                        />
                    </nav>
                </aside>
                <main>
                    <Switch>
                        <Route exact path="/" component={HomePage} />
                        <Route path="/recipe-show/:recipeId" component={ShowRecipe} />
                        <Route path="/recipes" component={RecipePage} />
                        <Route exact path="/ingredients" component={IngredientPage} />
                    </Switch>
                </main>
            </section>
        </Router>
    )
}

export default App