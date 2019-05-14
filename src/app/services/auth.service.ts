import { Injectable } from "@angular/core";
import { AuthenticateRequest, RegistrationRequest, AuthenticateResponse, RegistrationResponse } from "../models/auth";
import { timer, of, Observable } from "rxjs";
import { map } from "../../../node_modules/rxjs/operators";

/**
 * Generates a simple random string to represent an access key (not suitable for production)
 */
function generateAccessKey() {
    return btoa(Math.random().toString()).substr(0, 32);
}

@Injectable({
    providedIn: "root"
})
export class AuthService {
    // This service should normally call an API that's responsible for authentication.
    // Since we're not dealing with API development in this training material, this service
    // is merely a mock/stub of what a real AuthService should normally look like.
    private users: RegistrationRequest[] = [{
        displayName: "Test User",
        password: "test",
        username: "test",
    }];

    /**
     * Authenticates a user with the system.
     * @param request The authentication request.
     */
    authenticate(request: AuthenticateRequest): Observable<AuthenticateResponse> {
        const user = this.users.find(u =>
            u.username === request.username &&
            u.password === request.password
        );

        if (!!user) {
            // Simulate delay, 0.5 seconds
            return timer(500).pipe(
                map(() => ({
                    access_key: generateAccessKey(),
                    displayName: user.displayName,
                    username: user.username,
                    success: true,
                }) as AuthenticateResponse)
            );
        }

        // Simulate delay, 0.5 seconds
        return timer(500).pipe(
            map(() => ({
                errors: ["Username or password was incorrect."],
                success: false,
            } as AuthenticateResponse))
        );
    }

    /**
     * Registers a new user in the system.
     * @param request The user registration request.
     */
    register(request: RegistrationRequest): Observable<RegistrationResponse> {
        this.users.push(request);

        // Simulate delay, 0.5 seconds
        return timer(500).pipe(
            map(() => ({ success: true }))
        );
    }
}
