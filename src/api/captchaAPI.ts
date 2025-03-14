import {instance} from './api'

type CaptchaType = {url:string}

export const securityAPI = {
    getCaptchaURL() {
        return instance.get<CaptchaType>('security/get-captcha-url')
            .then(response => response.data)
    },
}