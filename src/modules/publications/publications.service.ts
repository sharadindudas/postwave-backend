import { eq } from "drizzle-orm";
import { db } from "../../db";
import { publicationDomains, publications, users } from "../../db/schema";
import type { CreatePublicationSchema } from "./publications.validator";

class PublicationsService {
  async createPublication(userId: string, createPublicationPayload: CreatePublicationSchema) {
    await db.transaction(async (tx) => {
      const [publication] = await tx
        .insert(publications)
        .values({
          ownerId: userId,
          ...createPublicationPayload
        })
        .returning({ id: publications.id });

      if (!publication) throw new Error("Failed to create publication");

      await tx.insert(publicationDomains).values({
        publicationId: publication.id,
        domain: `${createPublicationPayload.subdomain}.postwave.dev`,
        status: "active",
        is_primary: true
      });

      await tx.update(users).set({ isOnboarded: true }).where(eq(users.id, userId));
    });
  }
}
export const publicationsService = new PublicationsService();
