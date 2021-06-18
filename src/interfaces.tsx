interface UserData {
    expiry: string;
    token: string;
    user: Record<string, unknown>;
}

interface StoredAuth {
    storedToken: string;
    storedExpiry: string;
}

interface AdvApplicationInfo {
    key: string;
    email: string;
    firstName: string;
    lastName: string;
    phone: string;
    created: string;
    updated: string;
    status: string;
    orderedBy: string;
    team: string;
}

interface ApplicationAPIResponse {
    created: string;
    modified: string;
    id: string;
    applicant: {
        status: string;
        first_name: string;
        last_name: string;
        email: string;
        id: string;
        phone_number: string;
    };
    owner: {
        id: string;
        email: string;
        team: {
            id: string;
            name: string;
        };
    };
    listing: Record<string, unknown>;
    is_active: boolean;
    is_selected: boolean;
    team_id: string;
    team: {
        id: string;
        name: string;
        country: string;
    };
}

export type { UserData, StoredAuth, AdvApplicationInfo, ApplicationAPIResponse };
