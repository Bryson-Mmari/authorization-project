import { db } from "@/drizzle/db"
import { DocumentInsertData, DocumentTable } from "@/drizzle/schema"
import { eq } from "drizzle-orm"

export async function createDocument(data: DocumentInsertData) {
  // PERMISSION:
  // FIX: Missing viewer role check
  const [document] = await db
    .insert(DocumentTable)
    .values(data)
    .returning({ id: DocumentTable.id })

  return document
}

export async function updateDocument(
  documentId: string,
  data: Partial<DocumentInsertData>,
) {
  // PERMISSION:
  await db
    .update(DocumentTable)
    .set(data)
    .where(eq(DocumentTable.id, documentId))
}

export async function deleteDocument(documentId: string) {
  // PERMISSION:
  await db.delete(DocumentTable).where(eq(DocumentTable.id, documentId))
}
