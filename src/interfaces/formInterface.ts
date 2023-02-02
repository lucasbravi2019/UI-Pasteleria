export interface FormInterface {
    inputName: string
    inputType: string
    inputText: string
    options?:
    {
        id: string
        nombre: string
    }[]
}