import type { DeleteUser } from "@/use-cases";

export async function deleteUserUseCase(
  context: {
    deleteUser: DeleteUser;
  },
  data: { id: string }
) {
  try {
    await context.deleteUser(data.id);
  } catch (error) {
    console.log("[DELETE_USER_USE_CASE]: ERROR", error);
  }
}