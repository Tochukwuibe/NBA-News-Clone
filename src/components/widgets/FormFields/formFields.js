import React from 'react';
import styles from './formFields.module.css'

export default (props) => {
    return (
        <div>
            {renderTemplate(props)}
        </div>
    );
}



export const checkFormValid = (form) => {
    let valid = true;
    for (let key in form) {
        valid = form[key].valid;
        if (!valid) break;
    }
    return valid
}

export const getFormData = (form) => {
    return Object.keys(form).reduce((acc, key) => ({ ...acc, [key]: form[key].value }), {})
}



export const FormControl = (element, name, config) => {
    return {
        name,
        element,
        value: config.value || '',
        touched: false,
        valid: false,
        error: '',
        ...config
    }
}

const validateControl = ({ value, validation, name, touched }) => {

    let valid = true;
    let error = '';

    if (validation) {
        if (valid && validation.required) {
            valid = !!value;
            error = !valid ? `${name} is required` : '';
        }

        if (valid && validation.minLength) {
            valid = value.length >= validation.minLength
            error = !valid ? `${name} must be at least ${validation.minLength}` : '';
        }
    }

    // console.log('the value ', { value, validation, touched, error, valid })
    return { error, valid };
}


const renderFeedback = ({ touched, error }) => {
    if (!touched) return null;
    return (
        <div className={styles.Feedback}>
            <p>{error}</p>
        </div>
    );
}



const onInputChange = (value, control, onChange) => {
    const { error, valid } = validateControl({ ...control, value });
    onChange({ value, error, valid })
}

const onInputBlur = (control, onBlur) => {
    const { error, valid } = validateControl(control);
    onBlur(control.name, { error, valid, touched: true });
}

const renderTemplate = ({ control, onChange, onBlur }) => {
    let template = null;

    switch (control.element) {
        case 'input': {

            template = (
                <div>
                    <input
                        {...control.native}
                        value={control.value}
                        onChange={({ target: { value } }) => onInputChange(value, control, onChange)}
                        onBlur={() => onInputBlur(control, onBlur)}
                    />
                    {renderFeedback(control)}
                </div>


            )
            break;
        }

        case 'select': {

            template = (
                <div>
                    <select
                        {...control.native}
                        value={control.value}
                        onChange={({ target: { value } }) => onInputChange(value, control, onChange)}
                        onBlur={() => onInputBlur(control, onBlur)}
                    >
                        {
                            control.options.map((option, index) => <option key={index} value={option.value}>{option.text}</option>)
                        }
                    </select>
                    {renderFeedback(control)}
                </div>


            )
            break;
        }

        default: {
            template = null;
        }
    }

    return template;
}


