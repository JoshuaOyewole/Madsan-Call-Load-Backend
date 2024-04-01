/* export type  = {
    id: string,
    name: string,
    phone_no: number,
    profilePicture: string
}
 */
export interface UserType {
    _id?:string,
    firstname: string,
    lastname: string,
    phone: number,
    email:string,
    nationality: string,
    gender:string,
    password:string,
    profilePicture:string,
}