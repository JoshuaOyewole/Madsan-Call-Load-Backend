export type OTPType = {
    email: string,
    otp: string,
    expiresAt: Date,
}

export type EmailDetailsType = {
    email: string,
    subject: string,
    message: string,
    duration: number
}

export type mailOptionsType = {
    from?: string,
    to?: string,
    subject: string,
    html?: string,
    email?: string,
    message?: string,
    duration?: number
}

export type verifyOTPCredentialsType = {
    email: string,
    otp: string
}