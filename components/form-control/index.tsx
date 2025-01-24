import React, { cloneElement, isValidElement } from 'react';
import { Text, View, ViewStyle } from 'react-native';
import { Controller } from 'react-hook-form';

type FormControlProps = {
    style?: ViewStyle;
    label?: string;
    children?: any;
    name: string;
    note?: string;
    control: any;
    showError?: boolean;
};

function FormControl(props: FormControlProps): JSX.Element {
    const {
        style,
        label,
        children,
        control,
        name,
        note,
        showError = true,
    } = props;
    function addPropsToReactElement(element: any, propsChildren: any) {
        if (isValidElement(element)) {
            return cloneElement(element, propsChildren);
        }
        return element;
    }
    function addPropsToChildren(
        element: any,
        propsChildren: any,
        children: any,
    ) {
        if (!Array.isArray(children)) {
            return addPropsToReactElement(children, propsChildren);
        }
        return children.map(childElement =>
            addPropsToReactElement(childElement, propsChildren),
        );
    }

    return (
        <View style={{ display: "flex", flexDirection: "column", gap: 8, width: "100%" }}>
            {label && <Text style={{ color: "white", fontSize: 16, fontWeight: "bold" }}>{label}</Text>}
            <Controller
                control={control}
                render={({
                    field: { onChange, onBlur, value },
                    fieldState: { error },
                }: any) => {
                    return (
                        <>
                            {addPropsToChildren(
                                children,
                                {
                                    onChange: onChange,
                                    onBlur: onBlur,
                                    onChangeText: onChange,
                                    value: value,
                                    isError: !!error?.message,
                                },
                                children,
                            )}
                            {error?.message && showError && (
                                <Text style={{ color: "red" }}>
                                    {error?.message}
                                </Text>
                            )}
                        </>
                    );
                }}
                name={name}
            />
            {note && <Text >{note}</Text>}
        </View>
    );
}

export default FormControl
