import db from "../../../../config/firebase";
import { FieldValue, Timestamp } from "firebase-admin/firestore";

import { RepositoryError } from "../middleware/errorHandler";


/**
 * Defines the allowed data types that can be stored in Firestore.
 * These types are restricted to ensure type safety when working with Firestore documents.
 */
type FirestoreDataTypes =
    | string
    | number
    | boolean
    | null
    | Timestamp
    | FieldValue;

/**
 * Represents a field-value pair used for querying documents.
 * Used primarily in filtering operations when deleting multiple documents.
 */
interface FieldValuePair {
    fieldName: string;
    fieldValue: FirestoreDataTypes;
}

/**
 * Executes a series of operations within a Firestore transaction.
 * @param {(transaction: FirebaseFirestore.Transaction) => Promise<T>} operations - Function containing the operations to perform within the transaction.
 * @returns {Promise<T>} - The result of the transaction.
 */
export const runTransaction = async <T>(
	operations: (transaction: FirebaseFirestore.Transaction) => Promise<T>
): Promise<T> => {
	try {
		return await db.runTransaction(operations);
	} catch (error) {
		console.error("Transaction failed:", error);
		throw new RepositoryError("Transaction failed.");
	}
};

/**
 * Creates a new document in a specified Firestore collection.
 * @param {string} collectionName - The name of the collection.
 * @param {Partial<T>} data - The data for the new document.
 * @returns {Promise<string>} - The ID of the newly created document.
 */
export const createDocument = async <T>(
	collectionName: string,
	data: Partial<T>,
): Promise<string> => {
	try {
		let docRef: FirebaseFirestore.DocumentReference;

		docRef = await db.collection(collectionName).add(data);

		return docRef.id;
	} catch (error) {
		console.error(`Failed to create document in ${collectionName}:`, error);
		throw new RepositoryError("Document creation failed.");
	}
};

/**
 * Retrieves all documents from a specified Firestore collection.
 * @param {string} collectionName - The name of the collection.
 * @returns {Promise<FirebaseFirestore.QuerySnapshot>} - A QuerySnapshot containing all documents.
 */
export const getDocuments = async (
	collectionName: string
): Promise<FirebaseFirestore.QuerySnapshot> => {
	try {
		return await db.collection(collectionName).get();
	} catch (error) {
		console.error(
			`Failed to fetch documents from ${collectionName}:`,
			error
		);
		throw new RepositoryError("Document list fetch failed.");
	}
};

/**
 * Retrieves a document by its ID from a specified Firestore collection.
 * @param {string} collectionName - The name of the collection.
 * @param {string} id - The ID of the document to retrieve.
 * @returns {Promise<FirebaseFirestore.DocumentSnapshot | null>} - The document or null if it doesn't exist.
 */
export const getDocumentById = async (
	collectionName: string,
	id: string
): Promise<FirebaseFirestore.DocumentSnapshot | null> => {
	try {
		const doc: FirebaseFirestore.DocumentSnapshot = await db
			.collection(collectionName)
			.doc(id)
			.get();
		return doc?.exists ? doc : null;
	} catch (error) {
		console.error(
			`Failed to fetch document ${id} from ${collectionName}:`,
			error
		);
		throw new RepositoryError("Unable to fetch specified document failed.");
	}
};

/**
 * Updates an existing document in a specified Firestore collection.
 * @param {string} collectionName - The name of the collection.
 * @param {string} id - The ID of the document to update.
 * @param {Partial<T>} data - The updated document data.
 * @returns {Promise<void>}
 */
export const updateDocument = async <T>(
	collectionName: string,
	id: string,
	data: Partial<T>
): Promise<void> => {
	try {
		await db.collection(collectionName).doc(id).update(data);
	} catch (error) {
		console.error(
			`Failed to update document ${id} in ${collectionName}:`,
			error
		);
		throw new RepositoryError("Document update failed.");
	}
};

/**
 * Deletes a document from a specified Firestore collection.
 * Can operate within a transaction if provided, otherwise performs a direct delete.
 * @param {string} collectionName - The name of the collection.
 * @param {string} id - The ID of the document to delete.
 * @param {FirebaseFirestore.Transaction} [transaction] - Optional Firestore transaction.
 * @returns {Promise<void>}
 */
export const deleteDocument = async (
	collectionName: string,
	id: string,
	transaction?: FirebaseFirestore.Transaction
): Promise<void> => {
	try {
		const docRef: FirebaseFirestore.DocumentReference = db
			.collection(collectionName)
			.doc(id);
		if (transaction) {
			transaction.delete(docRef);
		} else {
			await docRef.delete();
		}
	} catch (error) {
		console.error(
			`Failed to delete document ${id} from ${collectionName}:`,
			error
		);
		throw new RepositoryError("Document deletion failed.");
	}
};

/**
 * Deletes documents from a specified collection based on multiple field values.
 * Can operate within a transaction if provided, otherwise performs a batch delete.
 * @param {string} collectionName - The name of the collection to find documents in.
 * @param {string} fieldName - The name of the document field to examine the value of.
 * @param {string} fieldValue - The value to check a document field for.
 * @returns {Promise<FirebaseFirestore.QuerySnapshot>}
 */
export const fetchDocsByField = async (
	collectionName: string,
	fieldName: string,
    fieldValue: string
): Promise<FirebaseFirestore.QuerySnapshot> => {
	try {
		const snapshot: FirebaseFirestore.QuerySnapshot = await db.collection(collectionName).where(fieldName, "==", fieldValue).get();

		snapshot.forEach(entry => { console.log(`ID: ${entry.id}\n Data:`, entry.data()); });

		return snapshot;
	} catch (error) {
		console.error(
			`Failed to fetch documents from ${collectionName} where ${fieldName} = ${fieldValue}:`,
			error
		);
		throw new RepositoryError("Collection fetch by field failed.");
	}
};