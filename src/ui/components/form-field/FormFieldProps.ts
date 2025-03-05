import { Field } from "@chakra-ui/react";

export interface FieldProps extends Omit<Field.RootProps, "label"> {
    label?: React.ReactNode;
    helperText?: React.ReactNode;
    errorText?: React.ReactNode;
    optionalText?: React.ReactNode;
}
