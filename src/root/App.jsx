import 'normalize.scss/normalize.scss'
import './index.scss'

import { Route, BrowserRouter as Router, Switch } from 'react-router-dom'

import NavigationButton from '../components/navigation-button'
import HomePage from '../pages/home'
import RecipePage from '../pages/recipes'
import ShowRecipe from '../pages/recipe'
import PackagePage from '../pages/packages'
import IngredientPage from '../pages/ingredients'

const App = () => {
    return (
        <Router>
            <section className="container">
                <aside className="navigation-container">
                    <nav className="navigation-bar">
                        <NavigationButton link="/" routeName="Inicio" />
                        <NavigationButton link="/recetas" routeName="Recetas" />
                        <NavigationButton
                            link="/ingredientes"
                            routeName="Ingredientes"
                        />
                        <NavigationButton link="/envases" routeName="Envases" />
                    </nav>
                </aside>
                <main>
                    <Switch>
                        <Route exact path="/" component={HomePage} />
                        <Route exact path="/recetas" component={RecipePage} />
                        <Route exact path="/recetas/:recipeId" component={ShowRecipe} />
                        <Route exact path="/envases" component={PackagePage} />
                        <Route exact path="/ingredientes" component={IngredientPage} />
                    </Switch>
                </main>
            </section>
        </Router>
    )
}

export default App
