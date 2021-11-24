import React, {useState} from 'react';
import styles from './PhoneMask.module.scss'

const PhoneMask = () => {
    const [inputValue, setInputValue] = useState('')

    const _getInputNumbersValue = (value) => {
        if (['8', '9'].includes(value[1])) {
            return '+' + value.replace(/\D/g, '');
        }
        if (value !== '+') {
            return value.replace(/\D/g, '');
        } else {
            return '+';
        }
    }

    const handleChange = (e) => {
        let inputNumbersValue = _getInputNumbersValue(e.target.value);
        let formattedInputValue = '';
        const selectionStart = e.target.selectionStart;

        if (!inputNumbersValue) {
            setInputValue('');
            return;
        }

        if (e.target.value.length !== selectionStart) {
            return
        }

        if (['7', '8', '9'].includes(inputNumbersValue[0])) {
            if (inputNumbersValue[0] === '9') {
                inputNumbersValue = '7' + inputNumbersValue;
            }
            const firstSymbols = '+7';
            formattedInputValue = firstSymbols + ' ';
            setInputValue(formattedInputValue);

            if (inputNumbersValue.length > 1) {
                formattedInputValue += '(' + inputNumbersValue.substring(1, 4)
            }
            if (inputNumbersValue.length >= 5) {
                formattedInputValue += ') ' + inputNumbersValue.substring(4, 7)
            }
            if (inputNumbersValue.length >= 8) {
                formattedInputValue += '-' + inputNumbersValue.substring(7, 9);
            }
            if (inputNumbersValue.length >= 10) {
                formattedInputValue += '-' + inputNumbersValue.substring(9, 11);
            }
        } else {
            if (inputNumbersValue[0] === '+') {
                formattedInputValue = inputNumbersValue.substring(0, 15);
            } else {
                formattedInputValue = '+' + inputNumbersValue.substring(0, 16);
            }
            if (inputNumbersValue.length === 0) {
                formattedInputValue = '';
            }
        }
        setInputValue(formattedInputValue);
    }

    const onBackspaceDown = (e) => {
        if (e.code === 'Backspace') {
            if (inputValue.length === 2 || inputValue === '+7 ') {
                setInputValue('');
            }
        }
    }

    const onPaste = (e) => {
        const inputNumbersValue = _getInputNumbersValue(e.target.value);
        const pasted = e.clipboardData;
        if (pasted && /\D/g.test(pasted.getData('text'))) {
            setInputValue(inputNumbersValue);
        }
    }

    return (
        <form className={styles.form}>
            <input className={styles.input} placeholder="Номер телефона" autoFocus={true} type="tel" value={inputValue} onChange={handleChange.bind(this)} onKeyDown={onBackspaceDown.bind(this)} onPaste={onPaste.bind(this)}/>
        </form>
    );
};


export default PhoneMask;