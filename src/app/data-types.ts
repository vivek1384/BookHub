export interface SignUp{
    "name": string,
    "email": string,
    "password": string
}

export interface LogIn{
    "email": string,
    "password": string
}
export interface UserSignUp{
    "name": string,
    "email": string,
    "password": string
}

export interface UserLogIn{
    "email": string,
    "password": string
}
export interface Book{
    id: number
    name : string,
    url: string,
    price: number,
    category: string,
    auther: string,
    description: string,
    pdfURL:string,
    quantity: number | undefined,
    bookId: number | undefined
}
export interface Cart{
    id: number | undefined,
    name : string,
    url: string,
    price: number,
    category: string,
    auther: string,
    description: string,
    pdfURL:string,
    quantity: number | undefined, 
    bookId: number,
    userId: number
}
export interface Summary{
    price : number,
    shipping : number,
    tax : number,
    discount : number,
    total : number
}
export interface Order{
    id: number | undefined,
    fname: string,
    lname: string,
    mNumber: string,
    city: string,
    state: string,
    zipCode: string,
    adress: string,
    userId: number,
    totalPrice: number
}