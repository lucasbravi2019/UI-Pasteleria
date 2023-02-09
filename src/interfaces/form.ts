export interface FormInterface {
    inputName: string
    inputType: string
    inputText: string
    inputValue?: string | number | boolean
    options?: {
        id: string
        nombre: string
    }[] | Function
}