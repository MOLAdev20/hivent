<script setup lang="ts">
import { Ticket } from "@lucide/vue";

const { register, isLoading, errorMessage } = useAuth();

const name = ref("");
const email = ref("");
const phone = ref("");
const password = ref("");

const handleSubmit = () => {
  register({
    name: name.value,
    email: email.value,
    phone: phone.value || undefined,
    password: password.value,
  });
};
</script>

<template>
  <div class="min-h-screen flex items-center justify-center bg-slate-50 px-4">
    <div
      class="w-full max-w-md bg-white p-8 rounded-2xl shadow-sm border border-slate-200"
    >
      <div
        class="flex items-center gap-2 text-indigo-600 font-bold text-xl mb-2"
      >
        <Ticket class="w-6 h-6" />
        <span>Hivent</span>
      </div>
      <h1 class="text-2xl font-bold text-slate-900 mb-6">Buat Akun Baru</h1>

      <div
        v-if="errorMessage"
        class="mb-4 p-3 rounded-lg bg-red-50 text-red-600 text-sm"
      >
        {{ errorMessage }}
      </div>

      <form @submit.prevent="handleSubmit" class="space-y-4">
        <div>
          <label class="block text-sm font-medium text-slate-700 mb-1"
            >Nama Lengkap</label
          >
          <input
            v-model="name"
            type="text"
            required
            class="w-full px-3.5 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
        <div>
          <label class="block text-sm font-medium text-slate-700 mb-1"
            >Email</label
          >
          <input
            v-model="email"
            type="email"
            required
            class="w-full px-3.5 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
        <div>
          <label class="block text-sm font-medium text-slate-700 mb-1"
            >No. WhatsApp (Opsional)</label
          >
          <input
            v-model="phone"
            type="tel"
            placeholder="0812..."
            class="w-full px-3.5 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
        <div>
          <label class="block text-sm font-medium text-slate-700 mb-1"
            >Password</label
          >
          <input
            v-model="password"
            type="password"
            required
            minlength="6"
            class="w-full px-3.5 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <button
          type="submit"
          :disabled="isLoading"
          class="w-full py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg transition disabled:opacity-50"
        >
          {{ isLoading ? "Memproses..." : "Daftar Sekarang" }}
        </button>
      </form>

      <p class="mt-6 text-center text-sm text-slate-600">
        Sudah punya akun?
        <NuxtLink
          to="/login"
          class="text-indigo-600 font-medium hover:underline"
          >Masuk di sini</NuxtLink
        >
      </p>
    </div>
  </div>
</template>
