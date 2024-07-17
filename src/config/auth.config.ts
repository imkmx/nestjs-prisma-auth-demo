export const AuthConfig = () => ({
    jwt: {
        access: {
            secret: process.env.JWT_ACCESS_SECRET || 'default_access_secret',
            expiresIn: process.env.JWT_ACCESS_EXPIRES || '1h',
        },
        refresh: {
            secret: process.env.JWT_REFRESH_SECRET || 'default_refresh_secret',
            expiresIn: process.env.JWT_REFRESH_EXPIRES || '7d',
        }
    }
});