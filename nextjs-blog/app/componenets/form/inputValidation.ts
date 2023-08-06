import { RegisterOptions } from "react-hook-form";

export interface Validation {
    label: string;
    type: "text" | "textarea" | "password" | "number" | "email";
    id: string;
    placeholder: string;
    autoComplete: "off" | "name" | "email" | "current-password" | "username";
    validation: RegisterOptions;
}

export const usernameValidation: Validation = {
    label: "Username",
    type: "text",
    id: "username",
    placeholder: "enter your username ...",
    autoComplete: "username",
    validation: {
        required: {
            value: true,
            message: "required",
        },
        maxLength: {
            value: 15,
            message: "15 characters max",
        },
    },
}

export const nameValidation: Validation = {
    label: "Name",
    type: "text",
    id: "name",
    placeholder: "write your name ...",
    autoComplete: "name",
    validation: {
        required: {
            value: true,
            message: "required",
        },
        maxLength: {
            value: 30,
            message: "30 characters max",
        },
    },
};

export const subjectValidation: Validation = {
    label: "Subject",
    type: "text",
    id: "subject",
    placeholder: "write a subject ...",
    autoComplete: "off",
    validation: {
        required: {
            value: true,
            message: "required",
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
    placeholder: "write a message ...",
    autoComplete: "off",
    validation: {
        required: {
            value: true,
            message: "required",
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
    placeholder: "enter your password ...",
    autoComplete: "current-password",
    validation: {
        required: {
            value: true,
            message: "required",
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
    placeholder: "type a number ...",
    autoComplete: "off",
    validation: {
        required: {
            value: true,
            message: "required",
        },
    },
};

export const emailValidation: Validation = {
    label: "Email Address",
    type: "email",
    id: "email",
    placeholder: "enter your email address ...",
    autoComplete: "email",
    validation: {
        required: {
            value: true,
            message: "required",
        },
        pattern: {
            value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            message: "not a valid email",
        },
    },
};
