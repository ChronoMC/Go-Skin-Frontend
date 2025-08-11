import { Turnstile } from '@marsidev/react-turnstile'
import Button from '@mui/material/Button'
import { useRef, useState, memo, forwardRef, useImperativeHandle, useEffect } from 'react'
import type { TurnstileInstance } from '@marsidev/react-turnstile'
import Alert from '@mui/material/Alert';
import Skeleton from '@mui/material/Skeleton';
import { useRequest } from 'ahooks';
import { getConfig } from '@/apis/apis';
import { Box } from '@mui/material';

interface prop {
    onSuccess: ((token: string) => void)
    hideRefreshButton?: boolean
}

export type refType = {
    reload: () => void
}

const CaptchaWidget = forwardRef<refType, prop>(({ onSuccess, hideRefreshButton = false }, ref) => {
    const Turnstileref = useRef<TurnstileInstance>(null)
    const [key, setKey] = useState(1)
    const { data, error, loading } = useRequest(getConfig, {
        cacheKey: "/api/v1/config",
        staleTime: 600000,
        loadingDelay: 200
    })

    useImperativeHandle(ref, () => {
        return {
            reload: () => {
                setKey(key + 1)
            }
        }
    })
    useEffect(() => {
        if (data?.captcha?.type != "turnstile") {
            onSuccess("ok")
            return
        }
    }, [data?.captcha?.type, onSuccess])

    if (error) {
        console.warn(error)
        return <Alert severity="warning">{String(error)}</Alert>
    }
    if (!data && loading) {
        return <Skeleton variant="rectangular" width={300} height={65} />
    }

    if (data?.captcha.type == "") {
        return <></>
    }

    return (
        <Box sx={{ 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center',
            width: '100%'
        }}>
            <Turnstile 
                siteKey={data?.captcha?.siteKey ?? ""} 
                key={key} 
                onSuccess={onSuccess} 
                ref={Turnstileref} 
                scriptOptions={{ async: true }} 
                style={{ marginBottom: hideRefreshButton ? 0 : '8px' }}
            />
            {!hideRefreshButton && (
                <Button 
                    onClick={() => setKey(key + 1)}
                    sx={{ 
                        alignSelf: 'flex-end',
                        minWidth: 'auto',
                        padding: '4px 8px',
                        fontSize: '0.75rem'
                    }}
                >
                    刷新验证码
                </Button>
            )}
        </Box>
    )
})

const CaptchaWidgetMemo = memo(CaptchaWidget)

export default CaptchaWidgetMemo