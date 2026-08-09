"use server";

import { revalidatePath, revalidateTag } from "next/cache";

import { approveEntry, GUESTBOOK_CACHE_TAG, rejectEntry } from "@/lib/guestbook";

export async function approveGuestbookEntry(id: string) {
  await approveEntry(id);
  revalidatePath("/admin/guestbook");
  revalidateTag(GUESTBOOK_CACHE_TAG);
}

export async function rejectGuestbookEntry(id: string) {
  await rejectEntry(id);
  revalidatePath("/admin/guestbook");
}
