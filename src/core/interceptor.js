import axios from "axios";

export const airtableApi = axios.create({
    baseURL: "https://api.airtable.com/v0/app22G2yK0fVFyaNl/Sites",
    headers: {Authorization: `Bearer keycgOj92sFa2R98f`},
});

export const gridmarketApi = axios.create({
    baseURL: "https://api.gridmarket.com/v2",
});

export const gridmarketStagingApi = axios.create({
    baseURL: "https://staging.gridmarket.com/e2e-api/api",
});

export const gridmarketPlatformApi = axios.create({
    baseURL: "https://platform.gridmarket.com/e2e-api/api"
});