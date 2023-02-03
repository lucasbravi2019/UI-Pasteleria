import 'normalize.scss/normalize.scss'
import './index.scss'

import {
    BrowserRouter as Router,
    Route,
    Switch,
} from 'react-router-dom'

import NavigationButton from '../components/navigation-button'
import VersionLabel from '../components/version-label'
import HomePage from '../pages/home'
import IngredientPage from '../pages/ingredients/create-ingredient'
import Package from '../pages/packages'
import RecipePage from '../pages/recipes/create-recipe'
import RecipeIngredientPage from '../pages/recipes/recipe-ingredient'
import ShowRecipe from '../pages/recipes/show-recipe'

const App = () => {
    return (
        <Router>
            <section className="container">
                <aside className="navigation-container">
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
                        <NavigationButton
                            link="/recipe-ingredients"
                            routeName="Agregar ingredientes"
                            className="navigation-bar__link"
                        />
                        <NavigationButton
                            link="/packages"
                            routeName="Agregar envases"
                            className="navigation-bar__link"
                        />
                    </nav>
                    <VersionLabel />
                </aside>
                <main>
                    <Switch>
                        <Route exact path="/" component={HomePage} />
                        <Route path="/recipe-show/:recipeId" component={ShowRecipe} />
                        <Route exact path="/recipes" component={RecipePage} />
                        <Route exact path="/ingredients" component={IngredientPage} />
                        <Route exact path="/recipe-ingredients" component={RecipeIngredientPage} />
                        <Route exact path="/packages" component={Package} />
                    </Switch>
                </main>
            </section>
        </Router>
    )
}

export default App