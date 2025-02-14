export type MockFirestoreData = {
    [key: string]: unknown;
};

export type MockFirestoreDocumentSnapshot = {
    data: () => MockFirestoreData;
    id: string;
};

export type MockQuerySnapshot = {
    docs: MockFirestoreDocumentSnapshot[];
    forEach: jest.Mock;
    empty: boolean;
    size: number;
};