import TextField from '@mui/material/TextField';
import { useState, useImperativeHandle, forwardRef } from 'react';
import type { TextFieldProps } from '@mui/material/TextField';
import { useControllableValue } from 'ahooks';
import { getPasswordStrength, getPasswordStrengthColor } from '@/utils/validation';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import LinearProgress from '@mui/material/LinearProgress';

export type refType = {
    verify: () => boolean
}

type prop = {
    checkList: {
        errMsg: string
        reg: RegExp
    }[]
} & Omit<Omit<TextFieldProps, 'error'>, 'helperText'>

export const CheckInput = forwardRef<refType, prop>(({ required, checkList, ...textFied }, ref) => {
    const [err, setErr] = useState("");
    const [value, setValue] = useControllableValue<string>({ ...textFied, defaultValue: '' });

    const check = (value: string) => {
        if (required && (!value || value == "")) {
            setErr("此项必填")
            return false
        }
        for (const v of checkList) {
            if (!v.reg.test(value)) {
                setErr(v.errMsg)
                return false
            }
        }
        setErr("")
        return true
    }

    const verify = () => {
        return check(value)
    }

    useImperativeHandle(ref, () => {
        return {
            verify
        }
    })

    const onChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const value = event.target.value
        setValue(value)
        check(value)
    }

    // 检查是否为密码字段
    const isPassword = textFied.type === 'password';
    const passwordStrength = isPassword && value ? getPasswordStrength(value) : null;

    return (
        <Box>
            <TextField
                error={err != ""}
                onChange={onChange}
                helperText={err}
                required={required}
                value={value}
                {...textFied}
            />
            {isPassword && value && (
                <Box sx={{ mt: 1, mb: 1 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 0.5 }}>
                        <Typography variant="caption" color="text.secondary">
                            密码强度
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                            {passwordStrength?.strength === 'weak' && '弱'}
                            {passwordStrength?.strength === 'medium' && '中'}
                            {passwordStrength?.strength === 'strong' && '强'}
                        </Typography>
                    </Box>
                    <LinearProgress
                        variant="determinate"
                        value={(passwordStrength?.score || 0) * 16.67} // 6个条件，每个16.67%
                        sx={{
                            height: 4,
                            borderRadius: 2,
                            backgroundColor: 'rgba(0,0,0,0.1)',
                            '& .MuiLinearProgress-bar': {
                                backgroundColor: getPasswordStrengthColor(passwordStrength?.strength || 'weak'),
                            },
                        }}
                    />
                </Box>
            )}
        </Box>
    );
})

export default CheckInput