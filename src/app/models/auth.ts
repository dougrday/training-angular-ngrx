export interface Response {
    errors?: string[];
    success: boolean;
}

export interface AuthenticateRequest {
    username: string;
    password: string;
};

export interface AuthenticateResponse extends Response {
    access_key?: string;
    displayName: string;
    username: string;
};

export interface RegistrationRequest {
    displayName: string;
    username: string;
    password: string;
}

export interface RegistrationResponse extends Response { }
