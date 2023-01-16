import RecipeForm from "../../components/recipe-form/RecipeForm"

const formInputs = {
    tituloReceta: {
        inputName: 'name', 
        inputText: 'Título de receta', 
        inputType: 'text'
    }
}

const CreateRecipe = () => {
    return (
        <section>
            <h1>Crear Receta</h1>
            <RecipeForm 
                inputs={[formInputs.tituloReceta]}
                submitText="Crear receta"
            />
        </section>
    )
}

export default CreateRecipe