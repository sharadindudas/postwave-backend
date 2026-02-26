import * as v from "valibot";

const nullableUrl = (label: string) => v.nullable(v.pipe(v.string(), v.url(`Please provide a valid ${label} URL`)));

export const UpdateUserSchema = v.object({
  name: v.pipe(v.string(), v.nonEmpty("Please provide the name"), v.minLength(1), v.maxLength(100)),
  bio: v.optional(v.nullable(v.pipe(v.string(), v.maxLength(500)))),
  x: v.optional(nullableUrl("X")),
  facebook: v.optional(nullableUrl("Facebook")),
  linkedin: v.optional(nullableUrl("LinkedIn")),
  instagram: v.optional(nullableUrl("Instagram")),
  youtube: v.optional(nullableUrl("YouTube")),
  threads: v.optional(nullableUrl("Threads")),
  tiktok: v.optional(nullableUrl("TikTok"))
});
export type UpdateUserSchema = v.InferInput<typeof UpdateUserSchema>;
