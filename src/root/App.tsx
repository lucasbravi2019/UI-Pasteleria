import './index.scss'
import 'normalize.scss/normalize.scss'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import ShowRecipe from '../containers/recipe/ShowRecipe'
import Home from '../containers/home/Home'
import NavigationButton from '../components/navigation-button/NavigationButton'
import CreateRecipe from '../containers/recipe/CreateRecipe'

const App = () => {
    return (
        <Router>
            <aside className="container">
                <h1>Pastelería</h1>
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
            <main className="container">
                <Switch>
                    <Route exact path="/" component={Home} />
                    <Route path="/recipe-show/:recipeId" component={ShowRecipe} />
                    <Route path="/recipes" component={CreateRecipe} />
                </Switch>
            </main>
        </Router>
    )
}

export default App