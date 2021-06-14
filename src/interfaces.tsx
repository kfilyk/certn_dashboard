interface UserData {
    expiry: string;
    token: string;
    user: Record<string, unknown>;
}

interface StoredAuth {
    storedToken: string;
    storedExpiry: string;
}

export type { UserData, StoredAuth };
