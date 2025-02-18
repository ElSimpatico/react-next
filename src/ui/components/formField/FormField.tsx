import { Field } from "@chakra-ui/react";
import React, { forwardRef } from "react";

export interface FieldProps extends Omit<Field.RootProps, "label"> {
    label?: React.ReactNode;
    helperText?: React.ReactNode;
    errorText?: React.ReactNode;
    optionalText?: React.ReactNode;
}

const FormField = forwardRef<HTMLDivElement, FieldProps>((props, ref) => {
    const { label, children, helperText, errorText, optionalText, ...rest } =
        props;

    return (
        <Field.Root ref={ref} {...rest}>
            {label && (
                <Field.Label>
                    {label}
                    <Field.RequiredIndicator fallback={optionalText} />
                </Field.Label>
            )}
            {children}
            {helperText && <Field.HelperText>{helperText}</Field.HelperText>}
            {errorText && <Field.ErrorText>{errorText}</Field.ErrorText>}
        </Field.Root>
    );
});

FormField.displayName = "FormField";

export default FormField;
