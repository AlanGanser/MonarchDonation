import { RegisterOptions } from "react-hook-form";

export interface Validation {
    label: string;
    type: "text" | "textarea" | "password" | "number" | "email";
    id: string;
    autoComplete: "off" | "given-name" | "family-name" | "email" | "current-password" | "username";
    validation: RegisterOptions;
}

export const usernameValidation: Validation = {
    label: "Username",
    type: "text",
    id: "username",
    autoComplete: "username",
    validation: {
        required: {
            value: true,
            message: "Required",
        },
        maxLength: {
            value: 15,
            message: "15 characters max",
        },
    },
}

export const firstNameValidation: Validation = {
    label: "First name",
    type: "text",
    id: "fistName",
    autoComplete: "given-name",
    validation: {},
};

export const lastNameValidation: Validation = {
    label: "Last name",
    type: "text",
    id: "lastName",
    autoComplete: "family-name",
    validation: {},
};

export const subjectValidation: Validation = {
    label: "Subject",
    type: "text",
    id: "subject",
    autoComplete: "off",
    validation: {
        required: {
            value: true,
            message: "Required",
        },
        maxLength: {
            value: 100,
            message: "100 characters max",
        },
    },
};

export const messageValidation: Validation = {
    label: "Message",
    type: "textarea",
    id: "message",
    autoComplete: "off",
    validation: {
        required: {
            value: true,
            message: "Required",
        },
        maxLength: {
            value: 700,
            message: "700 characters max",
        },
    },
};

export const passwordValidation: Validation = {
    label: "Password",
    type: "password",
    id: "password",
    autoComplete: "current-password",
    validation: {
        required: {
            value: true,
            message: "Required",
        },
        minLength: {
            value: 6,
            message: "6 characters minimum",
        },
    },
};

export const numValidation: Validation = {
    label: "Number",
    type: "number",
    id: "num",
    autoComplete: "off",
    validation: {
        required: {
            value: true,
            message: "Required",
        },
    },
};

export const emailValidation: Validation = {
    label: "Email address",
    type: "email",
    id: "email",
    autoComplete: "email",
    validation: {
        required: {
            value: true,
            message: "Required",
        },
        pattern: {
            value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            message: "Not a valid email",
        },
    },
};
