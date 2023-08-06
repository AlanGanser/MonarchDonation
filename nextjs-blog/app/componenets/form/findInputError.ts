import { type } from "os";
import { FieldErrors } from "react-hook-form"

export const findInputError = (errors: FieldErrors, name: string) => {
    const filtered: any = Object.keys(errors)
      .filter(key => key.includes(name))
      .reduce((cur, key) => {
        return Object.assign(cur, { error: errors[key] })
      }, {})
    return filtered;
  }