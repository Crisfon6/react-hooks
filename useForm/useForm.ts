import { ChangeEvent, useState } from "react";

export const useForm = <T extends Record<string, unknown>>(form: T) => {
    const [formState, setFormState] = useState<T>(form);
    const onInputChange = ({target}: ChangeEvent<HTMLInputElement>)=>{
        const {name, value} = target;
        setFormState((current) => ({
            ...current,
            [name]: value
        }));
    }
    const onResetForm = ()=>{
        setFormState(form);
    }
    return {
        formState,
        onInputChange,
        onResetForm
    }
}