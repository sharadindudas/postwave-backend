import * as v from "valibot";

const socialUrl = (label: string) => v.optional(v.nullable(v.pipe(v.string(), v.url(`Please provide a valid ${label} URL`))));

export const UpdateUserSchema = v.partial(
  v.object({
    name: v.pipe(v.string(), v.nonEmpty("Please provide the name"), v.minLength(1), v.maxLength(100)),
    bio: v.optional(v.nullable(v.pipe(v.string(), v.maxLength(500)))),
    x: socialUrl("X"),
    facebook: socialUrl("Facebook"),
    linkedin: socialUrl("LinkedIn"),
    instagram: socialUrl("Instagram"),
    youtube: socialUrl("YouTube"),
    threads: socialUrl("Threads"),
    tiktok: socialUrl("TikTok")
  })
);
export type UpdateUserSchema = v.InferInput<typeof UpdateUserSchema>;

export const UpdateUserOnboardingSchema = v.object({
  isOnboarded: v.optional(v.boolean()),
  onboardingStep: v.optional(v.pipe(v.number(), v.integer(), v.minValue(1))),
  journey: v.optional(v.nullable(v.pipe(v.string(), v.maxLength(500)))),
  platformsUsed: v.optional(v.nullable(v.pipe(v.string(), v.maxLength(500)))),
  source: v.optional(v.nullable(v.pipe(v.string(), v.maxLength(500)))),
  goals: v.optional(v.nullable(v.pipe(v.string(), v.maxLength(500))))
});
export type UpdateUserOnboardingSchema = v.InferInput<typeof UpdateUserOnboardingSchema>;
