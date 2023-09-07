export const shouldNotContainSpaces = (value: string) => {
    return !value?.includes(' ')
}

export const shouldNotContainLettersAndNumbers = (value: string) => {
    return !/[a-zA-Z0-9]/.test(value)
}
