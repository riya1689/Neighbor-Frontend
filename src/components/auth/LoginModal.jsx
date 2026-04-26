"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Modal from "../ui/Modal";
import useAppStore from "@/store/useAppStore";
import useAuthStore from "@/store/useAuthStore";
import Link from "next/link";

export default function LoginModal() {
  const { isLoginModalOpen, closeLoginModal } = useAppStore();
  const { login } = useAuthStore();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  
  const router = useRouter();

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    try {
      await login(formData);
      closeLoginModal();
      router.refresh();
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed. Please verify your credentials.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal isOpen={isLoginModalOpen} onClose={closeLoginModal} title="Sign in required">
      <div className="space-y-4">
        <p className="text-sm text-gray-500 dark:text-gray-400">
          You need an account to interact with posts. Please sign in or create an account.
        </p>

        {error && (
          <div className="bg-red-50 text-red-600 px-3 py-2 rounded-lg text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email</label>
            <input
              name="email"
              type="email"
              required
              value={formData.email}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white rounded-lg focus:ring-2 focus:ring-amber focus:outline-none dark:bg-gray-800"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Password</label>
            <input
              name="password"
              type="password"
              required
              value={formData.password}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white rounded-lg focus:ring-2 focus:ring-amber focus:outline-none dark:bg-gray-800"
            />
          </div>
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-amber hover:bg-amber-600 text-white font-semibold py-2.5 rounded-lg transition-transform active:scale-95 disabled:opacity-70 disabled:active:scale-100"
          >
            {isSubmitting ? "Signing in..." : "Sign In"}
          </button>
        </form>

        <div className="pt-2 text-center text-sm">
          <span className="text-gray-600 dark:text-gray-400">New here? </span>
          <Link href="/register" onClick={closeLoginModal} className="text-teal font-medium hover:underline">
            Create an account
          </Link>
        </div>
      </div>
    </Modal>
  );
}
