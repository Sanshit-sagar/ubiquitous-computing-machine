
interface IValidatePutProps {
    email: string;
    destination: string; 
}

interface IValidateDeleteProps {
    email: string;
    slug: string;
    name: string;
}

// TODO: check that it exists in the db
export const isValidEmail = (email: string) => {
    const emailValidator = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return email?.length && emailValidator.test(email);
}

export const isValidName = (name: string) => {
    return name?.length && name?.length < 255; 
}

//TODO: Call redis to check if slug is valid
export const isValidSlug = (slug: string) => {
    console.log(`Validating slug: ${slug}`);
    return slug?.length && slug?.length < 30
}

export const isValidUrl = (destination: string) => {
    console.log(`Validating destination: ${destination}`);
    const urlValidator = /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi;
    return destination?.length && urlValidator.test(destination);
}

//TODO: check pair exists in prisma
export const isValidEmailAndUser = (email: string, name: string) => {
    console.log(`Validating email: ${email}, name: ${name}`);
    return isValidEmail(email) && name?.length && name.length < 255; 
}

export const validatePutParams = (props: IValidatePutProps) => {
    const { email, destination }: IValidatePutProps = props;

    let emailValidity: boolean = isValidEmail(email) 
    let urlValidity: boolean = isValidUrl(destination)
    
    return emailValidity && urlValidity
}

// TODO: use redis to verify ownership
export const validateDeleteParams = (props: IValidateDeleteProps) => {
    const { email, slug }: IValidateDeleteProps = props;

    let userValidity: boolean = isValidEmail(email) 
    let slugValidity: boolean = isValidSlug(slug)

    return userValidity && slugValidity
}