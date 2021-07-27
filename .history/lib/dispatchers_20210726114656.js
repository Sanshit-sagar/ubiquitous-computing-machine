
export const dispatchValidationUpdate = ({ validationKey, isValidValue, state, dispatch }) => {
    let unfairlyValidated = isValidValue && (!state.validated[`${validationKey}`] || state.hasError[`${validationKey}`]);
    let unfairlyErroneous = !isValidValue && (!state.hasError[`${validationKey}`] || state.validated[`${validationKey}`]);

    if(unfairlyValidated || unfairlyErroneous) {
        dispatch({
            type: 'validation',
            payload: {
                key: `${validationKey}`,
                isValid: isValidValue,
            }
        });
    }
}

