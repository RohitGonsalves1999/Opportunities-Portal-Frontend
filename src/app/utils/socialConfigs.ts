import { AuthServiceConfig, GoogleLoginProvider } from 'angularx-social-login';

const GOOGLE_APP_ID = '343600838738-8qp1ko38besbjlirc7ov3ca908s47g4s.apps.googleusercontent.com';

export const socialConfigs = () => {
    return new AuthServiceConfig([
        {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(GOOGLE_APP_ID),
        },
    ]);
};
