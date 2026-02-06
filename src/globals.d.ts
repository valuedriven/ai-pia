export { };

declare global {
    interface CustomJwtSessionClaims {
        metadata: {
            role?: "admin" | "client";
        };
    }

    interface UserPublicMetadata {
        role?: "admin" | "client";
    }
}
