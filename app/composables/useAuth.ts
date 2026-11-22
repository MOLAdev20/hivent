import type { AuthUser, LoginPayload, RegisterPayload } from "~/types/auth";

export function useAuth() {
  const user = useState<AuthUser | null>("auth_user", () => null);
  const isLoading = ref(false);
  const errorMessage = ref<string | null>(null);

  async function fetchUser() {
    try {
      const headers = import.meta.server
        ? useRequestHeaders(["cookie"])
        : undefined;
      const data = await $fetch<{ user: AuthUser | null }>("/api/auth/me", {
        headers,
      });
      user.value = data.user;
    } catch {
      user.value = null;
    }
  }

  async function register(payload: RegisterPayload) {
    isLoading.value = true;
    errorMessage.value = null;
    try {
      const data = await $fetch<{ user: AuthUser }>("/api/auth/register", {
        method: "POST",
        body: payload,
      });
      user.value = data.user;
      await navigateTo("/");
    } catch (err: any) {
      errorMessage.value = err?.data?.statusMessage || "Gagal mendaftar";
    } finally {
      isLoading.value = false;
    }
  }

  async function login(payload: LoginPayload) {
    isLoading.value = true;
    errorMessage.value = null;
    try {
      const data = await $fetch<{ user: AuthUser }>("/api/auth/login", {
        method: "POST",
        body: payload,
      });
      user.value = data.user;
      await navigateTo("/");
    } catch (err: any) {
      errorMessage.value = err?.data?.statusMessage || "Gagal masuk";
    } finally {
      isLoading.value = false;
    }
  }

  async function logout() {
    await $fetch("/api/auth/logout", { method: "POST" });
    user.value = null;
    await navigateTo("/login");
  }

  return {
    user,
    isLoading,
    errorMessage,
    fetchUser,
    register,
    login,
    logout,
  };
}
