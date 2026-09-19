import React, { useEffect, useMemo, useState } from "react";
import {
  FiActivity,
  FiAlertCircle,
  FiCheck,
  FiCheckCircle,
  FiChevronDown,
  FiClock,
  FiEye,
  FiFileText,
  FiInbox,
  FiLogOut,
  FiMail,
  FiMenu,
  FiPlus,
  FiRefreshCw,
  FiSearch,
  FiShield,
  FiStar,
  FiTrash2,
  FiUser,
  FiUsers,
  FiX,
} from "react-icons/fi";

import LogoIcon from "../assets/Black-Logo-Circle.png";
import { API_URL } from "../config/api";

/* =============================================================
   SAFE JSON RESPONSE PARSER
============================================================= */

const parseResponse = async (response) => {
  const contentType = response.headers.get("content-type") || "";

  if (!contentType.includes("application/json")) {
    const text = await response.text();

    throw new Error(
      `Server returned an invalid response (${response.status}). ${
        text.slice(0, 120) || "Please check your backend API."
      }`,
    );
  }

  return response.json();
};

/* =============================================================
   ADMIN
============================================================= */

const Admin = () => {
  /* =========================================================
     AUTH
  ========================================================= */

  const [token, setToken] = useState(
    () => localStorage.getItem("pixelforge_admin_token") || "",
  );

  const [admin, setAdmin] = useState(() => {
    try {
      return JSON.parse(
        localStorage.getItem("pixelforge_admin_user") || "null",
      );
    } catch {
      return null;
    }
  });

  const [loginForm, setLoginForm] = useState({
    email: "",
    password: "",
  });

  const [loginLoading, setLoginLoading] = useState(false);
  const [loginError, setLoginError] = useState("");

  /* =========================================================
     DASHBOARD
  ========================================================= */

  const [activeSection, setActiveSection] = useState("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [messages, setMessages] = useState([]);
  const [reviews, setReviews] = useState([]);

  const [loadingMessages, setLoadingMessages] = useState(false);
  const [loadingReviews, setLoadingReviews] = useState(false);

  const [dashboardError, setDashboardError] = useState("");

  const [searchMessage, setSearchMessage] = useState("");
  const [searchReview, setSearchReview] = useState("");

  /* =========================================================
     MESSAGE MODAL
  ========================================================= */

  const [selectedMessage, setSelectedMessage] = useState(null);

  /* =========================================================
     REVIEW FILTER
  ========================================================= */

  const [reviewFilter, setReviewFilter] = useState("all");

  /* =========================================================
     ADD ADMIN
  ========================================================= */

  const [showAddAdmin, setShowAddAdmin] = useState(false);

  const [newAdminForm, setNewAdminForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [addAdminLoading, setAddAdminLoading] = useState(false);
  const [addAdminError, setAddAdminError] = useState("");
  const [addAdminSuccess, setAddAdminSuccess] = useState("");

  /* =========================================================
     CONFIRM MODAL
  ========================================================= */

  const [confirmAction, setConfirmAction] = useState(null);

  /* =========================================================
     TOAST
  ========================================================= */

  const [toast, setToast] = useState(null);

  const showToast = (message, type = "success") => {
    setToast({
      message,
      type,
    });

    setTimeout(() => {
      setToast(null);
    }, 3500);
  };

  /* =========================================================
     AUTH HEADERS
  ========================================================= */

  const authHeaders = useMemo(() => {
    return {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };
  }, [token]);

  /* =========================================================
     LOGOUT
  ========================================================= */

  const logout = () => {
    localStorage.removeItem("pixelforge_admin_token");
    localStorage.removeItem("pixelforge_admin_user");

    setToken("");
    setAdmin(null);
    setMessages([]);
    setReviews([]);
    setSelectedMessage(null);
    setSidebarOpen(false);
  };

  /* =========================================================
     LOGIN
  ========================================================= */

  const handleLoginChange = (e) => {
    const { name, value } = e.target;

    setLoginForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    setLoginError("");

    if (!loginForm.email || !loginForm.password) {
      setLoginError("Please enter your email and password.");
      return;
    }

    try {
      setLoginLoading(true);

      const response = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginForm),
      });

      const data = await parseResponse(response);

      if (!response.ok) {
        throw new Error(data.message || "Login failed.");
      }

      if (!data.token || !data.admin) {
        throw new Error("Invalid login response from server.");
      }

      localStorage.setItem("pixelforge_admin_token", data.token);

      localStorage.setItem("pixelforge_admin_user", JSON.stringify(data.admin));

      setToken(data.token);
      setAdmin(data.admin);

      setLoginForm({
        email: "",
        password: "",
      });
    } catch (error) {
      console.error("Login error:", error);

      setLoginError(error.message || "Unable to login.");
    } finally {
      setLoginLoading(false);
    }
  };

  /* =========================================================
     FETCH MESSAGES
  ========================================================= */

  const fetchMessages = async () => {
    if (!token) return;

    try {
      setLoadingMessages(true);

      const response = await fetch(`${API_URL}/contact`, {
        method: "GET",
        headers: authHeaders,
      });

      if (response.status === 401) {
        logout();
        return;
      }

      const data = await parseResponse(response);

      if (!response.ok) {
        throw new Error(data.message || "Failed to load messages.");
      }

      setMessages(data.messages || []);
    } catch (error) {
      console.error("Fetch messages error:", error);

      setDashboardError(error.message || "Failed to load messages.");
    } finally {
      setLoadingMessages(false);
    }
  };

  /* =========================================================
     FETCH REVIEWS
  ========================================================= */

  const fetchReviews = async () => {
    if (!token) return;

    try {
      setLoadingReviews(true);

      const response = await fetch(`${API_URL}/reviews/admin`, {
        method: "GET",
        headers: authHeaders,
      });

      if (response.status === 401) {
        logout();
        return;
      }

      const data = await parseResponse(response);

      if (!response.ok) {
        throw new Error(data.message || "Failed to load reviews.");
      }

      setReviews(data.reviews || []);
    } catch (error) {
      console.error("Fetch reviews error:", error);

      setDashboardError(error.message || "Failed to load reviews.");
    } finally {
      setLoadingReviews(false);
    }
  };

  /* =========================================================
     INITIAL DASHBOARD DATA
  ========================================================= */

  useEffect(() => {
    if (!token) return;

    setDashboardError("");

    fetchMessages();
    fetchReviews();
  }, [token]);

  /* =========================================================
     REFRESH
  ========================================================= */

  const refreshDashboard = async () => {
    setDashboardError("");

    await Promise.all([fetchMessages(), fetchReviews()]);

    showToast("Dashboard refreshed.");
  };

  /* =========================================================
     MESSAGE STATUS
  ========================================================= */

  const updateMessageStatus = async (id, status) => {
    try {
      const response = await fetch(`${API_URL}/contact/${id}/status`, {
        method: "PATCH",
        headers: authHeaders,
        body: JSON.stringify({
          status,
        }),
      });

      if (response.status === 401) {
        logout();
        return;
      }

      const data = await parseResponse(response);

      if (!response.ok) {
        throw new Error(data.message || "Failed to update message.");
      }

      setMessages((prev) =>
        prev.map((message) =>
          Number(message.id) === Number(id)
            ? {
                ...message,
                status,
              }
            : message,
        ),
      );

      if (selectedMessage && Number(selectedMessage.id) === Number(id)) {
        setSelectedMessage((prev) => ({
          ...prev,
          status,
        }));
      }

      showToast("Message status updated.");
    } catch (error) {
      console.error(error);

      showToast(error.message || "Failed to update message.", "error");
    }
  };

  /* =========================================================
     DELETE MESSAGE
  ========================================================= */

  const deleteMessage = async (id) => {
    try {
      const response = await fetch(`${API_URL}/contact/${id}`, {
        method: "DELETE",
        headers: authHeaders,
      });

      if (response.status === 401) {
        logout();
        return;
      }

      const data = await parseResponse(response);

      if (!response.ok) {
        throw new Error(data.message || "Failed to delete message.");
      }

      setMessages((prev) =>
        prev.filter((message) => Number(message.id) !== Number(id)),
      );

      setSelectedMessage(null);

      showToast("Message deleted.");
    } catch (error) {
      console.error(error);

      showToast(error.message || "Failed to delete message.", "error");
    }
  };

  /* =========================================================
     REVIEW STATUS
  ========================================================= */

  const updateReviewStatus = async (id, status) => {
    try {
      const response = await fetch(`${API_URL}/reviews/${id}/status`, {
        method: "PATCH",
        headers: authHeaders,
        body: JSON.stringify({
          status,
        }),
      });

      if (response.status === 401) {
        logout();
        return;
      }

      const data = await parseResponse(response);

      if (!response.ok) {
        throw new Error(data.message || "Failed to update review.");
      }

      setReviews((prev) =>
        prev.map((review) =>
          Number(review.id) === Number(id)
            ? {
                ...review,
                status,
              }
            : review,
        ),
      );

      if (status === "approved") {
        showToast("Review approved and published.");
      } else if (status === "rejected") {
        showToast("Review rejected.");
      } else {
        showToast("Review status updated.");
      }
    } catch (error) {
      console.error(error);

      showToast(error.message || "Failed to update review.", "error");
    }
  };

  /* =========================================================
     DELETE REVIEW
  ========================================================= */

  const deleteReview = async (id) => {
    try {
      const response = await fetch(`${API_URL}/reviews/${id}`, {
        method: "DELETE",
        headers: authHeaders,
      });

      if (response.status === 401) {
        logout();
        return;
      }

      const data = await parseResponse(response);

      if (!response.ok) {
        throw new Error(data.message || "Failed to delete review.");
      }

      setReviews((prev) =>
        prev.filter((review) => Number(review.id) !== Number(id)),
      );

      showToast("Review deleted.");
    } catch (error) {
      console.error(error);

      showToast(error.message || "Failed to delete review.", "error");
    }
  };

  /* =========================================================
     ADD ADMIN
  ========================================================= */

  const handleNewAdminChange = (e) => {
    const { name, value } = e.target;

    setNewAdminForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAddAdmin = async (e) => {
    e.preventDefault();

    setAddAdminError("");
    setAddAdminSuccess("");

    if (!newAdminForm.name || !newAdminForm.email || !newAdminForm.password) {
      setAddAdminError("Please fill all fields.");
      return;
    }

    if (newAdminForm.password.length < 6) {
      setAddAdminError("Password must contain at least 6 characters.");
      return;
    }

    try {
      setAddAdminLoading(true);

      const response = await fetch(`${API_URL}/auth/register`, {
        method: "POST",
        headers: authHeaders,
        body: JSON.stringify(newAdminForm),
      });

      if (response.status === 401) {
        logout();
        return;
      }

      const data = await parseResponse(response);

      if (!response.ok) {
        throw new Error(data.message || "Failed to create admin.");
      }

      setAddAdminSuccess("New admin account created successfully.");

      setNewAdminForm({
        name: "",
        email: "",
        password: "",
      });

      showToast("New admin account created.");
    } catch (error) {
      console.error(error);

      setAddAdminError(error.message || "Failed to create admin.");
    } finally {
      setAddAdminLoading(false);
    }
  };

  /* =========================================================
     FILTERED MESSAGES
  ========================================================= */

  const filteredMessages = useMemo(() => {
    const search = searchMessage.trim().toLowerCase();

    if (!search) return messages;

    return messages.filter((message) => {
      return (
        message.name?.toLowerCase().includes(search) ||
        message.email?.toLowerCase().includes(search) ||
        message.phone?.toLowerCase().includes(search) ||
        message.service?.toLowerCase().includes(search) ||
        message.message?.toLowerCase().includes(search)
      );
    });
  }, [messages, searchMessage]);

  /* =========================================================
     FILTERED REVIEWS
  ========================================================= */

  const filteredReviews = useMemo(() => {
    let result = reviews;

    if (reviewFilter !== "all") {
      result = result.filter((review) => review.status === reviewFilter);
    }

    const search = searchReview.trim().toLowerCase();

    if (search) {
      result = result.filter((review) => {
        return (
          review.name?.toLowerCase().includes(search) ||
          review.role?.toLowerCase().includes(search) ||
          review.review?.toLowerCase().includes(search)
        );
      });
    }

    return result;
  }, [reviews, reviewFilter, searchReview]);

  /* =========================================================
     STATISTICS
  ========================================================= */

  const stats = useMemo(() => {
    return {
      totalMessages: messages.length,

      newMessages: messages.filter((message) => message.status === "new")
        .length,

      totalReviews: reviews.length,

      pendingReviews: reviews.filter((review) => review.status === "pending")
        .length,

      approvedReviews: reviews.filter((review) => review.status === "approved")
        .length,

      rejectedReviews: reviews.filter((review) => review.status === "rejected")
        .length,
    };
  }, [messages, reviews]);

  /* =========================================================
     NAVIGATION
  ========================================================= */

  const navigation = [
    {
      id: "dashboard",
      label: "Dashboard",
      icon: FiActivity,
    },
    {
      id: "messages",
      label: "Messages",
      icon: FiMail,
      count: stats.newMessages,
    },
    {
      id: "reviews",
      label: "Reviews",
      icon: FiStar,
      count: stats.pendingReviews,
    },
  ];

  const changeSection = (section) => {
    setActiveSection(section);
    setSidebarOpen(false);
    setDashboardError("");
  };

  /* =========================================================
     LOGIN SCREEN
  ========================================================= */

  if (!token) {
    return (
      <div className="min-h-screen bg-brand-dark text-brand-light">
        <div className="relative flex min-h-screen items-center justify-center overflow-hidden px-5 py-10">
          {/* Background atmosphere */}
          <div className="pointer-events-none absolute left-1/2 top-1/2 h-125 w-125 -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-amber/8 blur-[120px]" />

          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(232,89,12,0.05),transparent_35%)]" />

          {/* Login wrapper */}
          <div className="relative z-10 w-full max-w-md">
            {/* Brand */}
            <div className="mb-8 text-center">
              {/* Circular PixelForge Icon */}
              <div className="relative mx-auto mb-6 flex h-22 w-22 items-center justify-center rounded-full border border-brand-amber/30 bg-[#191C21] p-2 shadow-[0_0_50px_rgba(232,89,12,0.14)]">
                <div className="absolute inset-1 rounded-full border border-brand-amber/10" />

                <img
                  src={LogoIcon}
                  alt="PixelForge Studio"
                  className="relative h-full w-full rounded-full object-contain"
                />
              </div>

              <p className="font-body text-[10px] font-extrabold uppercase tracking-[0.3em] text-brand-amber">
                PixelForge Studio
              </p>

              <h1 className="mt-3 font-heading text-4xl font-semibold tracking-tight">
                Admin Portal
              </h1>

              <p className="mx-auto mt-3 max-w-sm font-body text-sm leading-6 text-brand-light/45">
                Sign in to manage messages, reviews and your administration
                dashboard.
              </p>
            </div>

            {/* Login Card */}
            <form
              onSubmit={handleLogin}
              className="relative overflow-hidden rounded-3xl border border-brand-light/10 bg-[#191C21]/85 p-6 shadow-[0_25px_90px_rgba(0,0,0,0.40)] backdrop-blur-xl sm:p-8"
            >
              {/* Top amber line */}
              <div className="absolute left-8 right-8 top-0 h-px bg-brand-amber/30" />

              {loginError && (
                <div className="mb-5 flex items-start gap-3 rounded-xl border border-red-400/20 bg-red-400/5 p-4 text-sm text-red-300">
                  <FiAlertCircle className="mt-0.5 shrink-0" />

                  <span>{loginError}</span>
                </div>
              )}

              <div className="space-y-5">
                {/* Email */}
                <div>
                  <label className="mb-2 block font-body text-[10px] font-extrabold uppercase tracking-[0.14em] text-brand-light/55">
                    Email Address
                  </label>

                  <div className="relative">
                    <FiMail className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-brand-light/30" />

                    <input
                      type="email"
                      name="email"
                      value={loginForm.email}
                      onChange={handleLoginChange}
                      placeholder="admin@example.com"
                      autoComplete="email"
                      className="w-full rounded-xl border border-brand-light/10 bg-brand-dark px-11 py-3.5 font-body text-sm text-brand-light outline-none transition focus:border-brand-amber/60 focus:bg-[#16181C] focus:ring-2 focus:ring-brand-amber/10"
                    />
                  </div>
                </div>

                {/* Password */}
                <div>
                  <label className="mb-2 block font-body text-[10px] font-extrabold uppercase tracking-[0.14em] text-brand-light/55">
                    Password
                  </label>

                  <div className="relative">
                    <FiShield className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-brand-light/30" />

                    <input
                      type="password"
                      name="password"
                      value={loginForm.password}
                      onChange={handleLoginChange}
                      placeholder="••••••••"
                      autoComplete="current-password"
                      className="w-full rounded-xl border border-brand-light/10 bg-brand-dark px-11 py-3.5 font-body text-sm text-brand-light outline-none transition focus:border-brand-amber/60 focus:bg-[#16181C] focus:ring-2 focus:ring-brand-amber/10"
                    />
                  </div>
                </div>

                {/* Login */}
                <button
                  type="submit"
                  disabled={loginLoading}
                  className="group flex w-full items-center justify-center gap-2 rounded-xl bg-brand-amber px-5 py-3.5 font-body text-xs font-extrabold uppercase tracking-widset text-brand-dark transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_0_35px_rgba(232,89,12,0.25)] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {loginLoading ? (
                    <>
                      <FiRefreshCw className="animate-spin text-base" />
                      Signing In...
                    </>
                  ) : (
                    <>
                      <FiShield className="text-base" />
                      Sign In
                    </>
                  )}
                </button>
              </div>
            </form>

            <div className="mt-6 flex items-center justify-center gap-2 text-brand-light/25">
              <FiShield className="text-xs" />

              <p className="font-body text-[10px] uppercase tracking-[0.12em]">
                Protected Administration Area
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  /* =========================================================
     DASHBOARD
  ========================================================= */

  return (
    <div className="min-h-screen bg-brand-dark text-brand-light">
      {/* =====================================================
          MOBILE OVERLAY
      ===================================================== */}

      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
        />
      )}

      {/* =====================================================
          SIDEBAR
      ===================================================== */}

      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-67.5 flex-col border-r border-brand-light/10 bg-[#17191E] shadow-[10px_0_40px_rgba(0,0,0,0.12)] transition-transform duration-300 lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Brand */}
        <div className="flex h-20 items-center justify-between border-b border-brand-light/10 px-5">
          <div className="flex items-center gap-3">
            <div className="relative flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-brand-amber/25 bg-brand-dark p-1.5 shadow-[0_0_20px_rgba(232,89,12,0.10)]">
              <div className="absolute inset-0.5 rounded-full border border-brand-amber/10" />

              <img
                src={LogoIcon}
                alt="PixelForge Studio"
                className="relative h-full w-full rounded-full object-contain"
              />
            </div>

            <div>
              <p className="font-body text-[10px] font-extrabold uppercase tracking-[0.25em] text-brand-amber">
                PixelForge
              </p>

              <p className="mt-0.5 font-heading text-lg font-semibold">
                Admin Panel
              </p>
            </div>
          </div>

          <button
            onClick={() => setSidebarOpen(false)}
            aria-label="Close menu"
            className="rounded-lg p-2 text-brand-light/40 transition hover:bg-brand-light/5 hover:text-brand-light lg:hidden"
          >
            <FiX />
          </button>
        </div>

        {/* Admin Profile */}
        <div className="border-b border-brand-light/10 p-5">
          <div className="flex items-center gap-3">
            <div className="relative flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-full border border-brand-amber/25 bg-brand-dark p-1.5">
              <img
                src={LogoIcon}
                alt="PixelForge"
                className="h-full w-full rounded-full object-contain"
              />

              <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full border-2 border-[#17191E] bg-brand-amber" />
            </div>

            <div className="min-w-0">
              <p className="truncate font-body text-sm font-bold">
                {admin?.name || "Administrator"}
              </p>

              <p className="mt-1 truncate font-body text-xs text-brand-light/35">
                {admin?.email || "Admin"}
              </p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-1 p-4">
          <p className="mb-3 px-3 font-body text-[10px] font-extrabold uppercase tracking-[0.2em] text-brand-light/25">
            Management
          </p>

          {navigation.map((item) => {
            const Icon = item.icon;
            const active = activeSection === item.id;

            return (
              <button
                key={item.id}
                onClick={() => changeSection(item.id)}
                className={`group flex w-full items-center justify-between rounded-xl px-3 py-3 text-left font-body text-sm font-semibold transition-all duration-200 ${
                  active
                    ? "bg-brand-amber text-brand-dark shadow-[0_8px_25px_rgba(232,89,12,0.12)]"
                    : "text-brand-light/55 hover:bg-brand-light/5 hover:text-brand-light"
                }`}
              >
                <span className="flex items-center gap-3">
                  <Icon className="text-lg" />
                  {item.label}
                </span>

                {item.count > 0 && (
                  <span
                    className={`flex h-5 min-w-5 items-center justify-center rounded-full px-1.5 text-[10px] font-extrabold ${
                      active
                        ? "bg-brand-dark text-brand-amber"
                        : "bg-brand-amber text-brand-dark"
                    }`}
                  >
                    {item.count}
                  </span>
                )}
              </button>
            );
          })}

          <div className="my-5 h-px bg-brand-light/10" />

          <p className="mb-3 px-3 font-body text-[10px] font-extrabold uppercase tracking-[0.2em] text-brand-light/25">
            Administration
          </p>

          <button
            onClick={() => {
              setShowAddAdmin(true);
              setSidebarOpen(false);
            }}
            className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left font-body text-sm font-semibold text-brand-light/55 transition hover:bg-brand-light/5 hover:text-brand-light"
          >
            <FiUsers className="text-lg" />
            Admin Accounts
          </button>
        </nav>

        {/* Sidebar footer */}
        <div className="border-t border-brand-light/10 p-4">
          <button
            onClick={logout}
            className="group flex w-full items-center gap-3 rounded-xl px-3 py-3 font-body text-sm font-bold text-red-300/65 transition hover:bg-red-400/5 hover:text-red-300"
          >
            <FiLogOut className="text-lg transition group-hover:-translate-x-0.5" />
            Logout
          </button>
        </div>
      </aside>

      {/* =====================================================
          MAIN AREA
      ===================================================== */}

      <div className="min-h-screen lg:pl-67.5">
        {/* Topbar */}
        <header className="sticky top-0 z-30 border-b border-brand-light/10 bg-brand-dark/90 shadow-[0_8px_30px_rgba(0,0,0,0.12)] backdrop-blur-xl">
          <div className="flex h-20 items-center justify-between px-5 sm:px-7 lg:px-8">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setSidebarOpen(true)}
                aria-label="Open menu"
                className="rounded-xl border border-brand-light/10 bg-brand-light/5 p-2.5 text-brand-light/70 transition hover:border-brand-amber/25 hover:text-brand-amber lg:hidden"
              >
                <FiMenu />
              </button>

              <div>
                <p className="font-body text-[10px] font-extrabold uppercase tracking-[0.2em] text-brand-amber">
                  Administration
                </p>

                <h1 className="mt-1 font-heading text-xl font-semibold sm:text-2xl">
                  {activeSection === "dashboard"
                    ? "Dashboard"
                    : activeSection === "messages"
                      ? "Messages"
                      : "Reviews"}
                </h1>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={refreshDashboard}
                disabled={loadingMessages || loadingReviews}
                className="flex items-center gap-2 rounded-xl border border-brand-light/10 bg-brand-light/5 px-3 py-2.5 font-body text-xs font-bold text-brand-light/60 transition hover:border-brand-amber/30 hover:bg-brand-amber/5 hover:text-brand-light disabled:opacity-50"
              >
                <FiRefreshCw
                  className={
                    loadingMessages || loadingReviews ? "animate-spin" : ""
                  }
                />

                <span className="hidden sm:inline">Refresh</span>
              </button>

              <button
                onClick={logout}
                aria-label="Logout"
                className="rounded-xl border border-red-400/10 bg-red-400/5 p-2.5 text-red-300/70 transition hover:border-red-400/20 hover:text-red-300 lg:hidden"
              >
                <FiLogOut />
              </button>
            </div>
          </div>
        </header>

        {/* Main */}
        <main className="p-5 sm:p-7 lg:p-8">
          {dashboardError && (
            <div className="mb-6 flex items-start justify-between gap-4 rounded-2xl border border-red-400/20 bg-red-400/5 p-4 text-sm text-red-300">
              <div className="flex items-start gap-3">
                <FiAlertCircle className="mt-0.5 shrink-0" />

                <span className="leading-6">{dashboardError}</span>
              </div>

              <button
                onClick={() => setDashboardError("")}
                className="shrink-0 text-red-300/60 hover:text-red-300"
              >
                <FiX />
              </button>
            </div>
          )}

          {/* Dashboard */}
          {activeSection === "dashboard" && (
            <DashboardView
              stats={stats}
              messages={messages}
              reviews={reviews}
              setActiveSection={setActiveSection}
              setSelectedMessage={setSelectedMessage}
            />
          )}

          {/* Messages */}
          {activeSection === "messages" && (
            <MessagesView
              messages={filteredMessages}
              search={searchMessage}
              setSearch={setSearchMessage}
              loading={loadingMessages}
              onStatusChange={updateMessageStatus}
              onDelete={(id) =>
                setConfirmAction({
                  type: "delete-message",
                  id,
                })
              }
              onOpen={setSelectedMessage}
            />
          )}

          {/* Reviews */}
          {activeSection === "reviews" && (
            <ReviewsView
              reviews={filteredReviews}
              allReviews={reviews}
              search={searchReview}
              setSearch={setSearchReview}
              filter={reviewFilter}
              setFilter={setReviewFilter}
              loading={loadingReviews}
              onApprove={(id) => updateReviewStatus(id, "approved")}
              onReject={(id) => updateReviewStatus(id, "rejected")}
              onDelete={(id) =>
                setConfirmAction({
                  type: "delete-review",
                  id,
                })
              }
            />
          )}
        </main>
      </div>

      {/* =====================================================
          MESSAGE MODAL
      ===================================================== */}

      {selectedMessage && (
        <MessageModal
          message={selectedMessage}
          onClose={() => setSelectedMessage(null)}
          onStatusChange={updateMessageStatus}
          onDelete={(id) =>
            setConfirmAction({
              type: "delete-message",
              id,
            })
          }
        />
      )}

      {/* =====================================================
          ADD ADMIN MODAL
      ===================================================== */}

      {showAddAdmin && (
        <ModalOverlay
          onClose={() => {
            setShowAddAdmin(false);
            setAddAdminError("");
            setAddAdminSuccess("");
          }}
        >
          <div className="relative w-full max-w-lg overflow-hidden rounded-3xl border border-brand-light/10 bg-[#191C21] p-6 shadow-[0_25px_90px_rgba(0,0,0,0.45)] sm:p-8">
            <div className="absolute left-8 right-8 top-0 h-px bg-brand-amber/30" />

            <div className="mb-7 flex items-start justify-between">
              <div>
                <p className="font-body text-[10px] font-extrabold uppercase tracking-[0.2em] text-brand-amber">
                  Administration
                </p>

                <h2 className="mt-2 font-heading text-2xl font-semibold">
                  Add Admin Account
                </h2>

                <p className="mt-2 font-body text-sm leading-6 text-brand-light/45">
                  Create another account with access to the PixelForge
                  administration panel.
                </p>
              </div>

              <button
                onClick={() => setShowAddAdmin(false)}
                aria-label="Close"
                className="rounded-lg p-2 text-brand-light/40 transition hover:bg-brand-light/5 hover:text-brand-light"
              >
                <FiX />
              </button>
            </div>

            {addAdminError && (
              <div className="mb-5 flex gap-3 rounded-xl border border-red-400/20 bg-red-400/5 p-4 text-sm text-red-300">
                <FiAlertCircle className="mt-0.5 shrink-0" />

                <span>{addAdminError}</span>
              </div>
            )}

            {addAdminSuccess && (
              <div className="mb-5 flex gap-3 rounded-xl border border-brand-amber/20 bg-brand-amber/5 p-4 text-sm text-brand-light/70">
                <FiCheckCircle className="mt-0.5 shrink-0 text-brand-amber" />

                <span>{addAdminSuccess}</span>
              </div>
            )}

            <form onSubmit={handleAddAdmin} className="space-y-5">
              <AdminInput
                label="Name"
                name="name"
                value={newAdminForm.name}
                onChange={handleNewAdminChange}
                placeholder="John Doe"
              />

              <AdminInput
                label="Email"
                type="email"
                name="email"
                value={newAdminForm.email}
                onChange={handleNewAdminChange}
                placeholder="admin@example.com"
              />

              <AdminInput
                label="Password"
                type="password"
                name="password"
                value={newAdminForm.password}
                onChange={handleNewAdminChange}
                placeholder="Minimum 6 characters"
              />

              <div className="flex flex-col-reverse gap-3 pt-2 sm:flex-row sm:justify-end">
                <button
                  type="button"
                  onClick={() => setShowAddAdmin(false)}
                  className="rounded-xl border border-brand-light/10 px-5 py-3 font-body text-sm font-bold text-brand-light/60 transition hover:bg-brand-light/5 hover:text-brand-light"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={addAdminLoading}
                  className="flex items-center justify-center gap-2 rounded-xl bg-brand-amber px-5 py-3 font-body text-sm font-extrabold text-brand-dark transition hover:-translate-y-0.5 hover:shadow-[0_0_25px_rgba(232,89,12,0.25)] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {addAdminLoading ? (
                    <>
                      <FiRefreshCw className="animate-spin" />
                      Creating...
                    </>
                  ) : (
                    <>
                      <FiPlus />
                      Create Admin
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </ModalOverlay>
      )}

      {/* =====================================================
          CONFIRM MODAL
      ===================================================== */}

      {confirmAction && (
        <ModalOverlay onClose={() => setConfirmAction(null)}>
          <div className="relative w-full max-w-md overflow-hidden rounded-3xl border border-brand-light/10 bg-[#191C21] p-6 shadow-[0_25px_90px_rgba(0,0,0,0.45)] sm:p-8">
            <div className="absolute left-8 right-8 top-0 h-px bg-red-400/20" />

            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border border-red-400/20 bg-red-400/5 text-red-300">
              <FiTrash2 className="text-xl" />
            </div>

            <h2 className="mt-5 text-center font-heading text-2xl font-semibold">
              Are you sure?
            </h2>

            <p className="mt-3 text-center font-body text-sm leading-6 text-brand-light/45">
              This action cannot be undone. The selected item will be
              permanently removed from your stored data.
            </p>

            <div className="mt-7 flex flex-col-reverse gap-3 sm:flex-row">
              <button
                onClick={() => setConfirmAction(null)}
                className="flex-1 rounded-xl border border-brand-light/10 px-5 py-3 font-body text-sm font-bold text-brand-light/60 transition hover:bg-brand-light/5 hover:text-brand-light"
              >
                Cancel
              </button>

              <button
                onClick={async () => {
                  const action = confirmAction;

                  setConfirmAction(null);

                  if (action.type === "delete-message") {
                    await deleteMessage(action.id);
                  }

                  if (action.type === "delete-review") {
                    await deleteReview(action.id);
                  }
                }}
                className="flex-1 rounded-xl bg-red-400 px-5 py-3 font-body text-sm font-extrabold text-brand-dark transition hover:bg-red-300"
              >
                Delete
              </button>
            </div>
          </div>
        </ModalOverlay>
      )}

      {/* =====================================================
          TOAST
      ===================================================== */}

      {toast && (
        <div className="fixed bottom-5 right-5 z-100 max-w-sm">
          <div
            className={`flex items-start gap-3 rounded-2xl border p-4 shadow-2xl backdrop-blur-xl ${
              toast.type === "error"
                ? "border-red-400/20 bg-[#21191B] text-red-300"
                : "border-brand-amber/20 bg-[#211D19] text-brand-light"
            }`}
          >
            {toast.type === "error" ? (
              <FiAlertCircle className="mt-0.5 shrink-0 text-red-300" />
            ) : (
              <FiCheckCircle className="mt-0.5 shrink-0 text-brand-amber" />
            )}

            <p className="font-body text-sm leading-5">{toast.message}</p>

            <button
              onClick={() => setToast(null)}
              aria-label="Close notification"
              className="ml-2 shrink-0 text-brand-light/30 hover:text-brand-light"
            >
              <FiX />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

/* =============================================================
   DASHBOARD VIEW
============================================================= */

const DashboardView = ({
  stats,
  messages,
  reviews,
  setActiveSection,
  setSelectedMessage,
}) => {
  const recentMessages = [...messages]
    .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
    .slice(0, 5);

  const pendingReviews = reviews.filter(
    (review) => review.status === "pending",
  );

  return (
    <div>
      {/* Welcome */}
      <div className="mb-8">
        <p className="font-body text-xs font-extrabold uppercase tracking-[0.2em] text-brand-amber">
          Overview
        </p>

        <h2 className="mt-2 font-heading text-3xl font-semibold tracking-tight sm:text-4xl">
          Welcome back.
        </h2>

        <p className="mt-2 max-w-2xl font-body text-sm leading-6 text-brand-light/45">
          Manage your website inquiries and moderate client reviews from one
          place.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          icon={FiInbox}
          label="Total Messages"
          value={stats.totalMessages}
          description={`${stats.newMessages} new`}
        />

        <StatCard
          icon={FiClock}
          label="New Messages"
          value={stats.newMessages}
          description="Need attention"
          accent
        />

        <StatCard
          icon={FiStar}
          label="Total Reviews"
          value={stats.totalReviews}
          description={`${stats.approvedReviews} approved`}
        />

        <StatCard
          icon={FiAlertCircle}
          label="Pending Reviews"
          value={stats.pendingReviews}
          description="Waiting for approval"
          accent
        />
      </div>

      {/* Content */}
      <div className="mt-6 grid grid-cols-1 gap-6 xl:grid-cols-2">
        {/* Recent Messages */}
        <div className="overflow-hidden rounded-2xl border border-brand-light/10 bg-[#191C21]">
          <div className="flex items-center justify-between border-b border-brand-light/10 p-5">
            <div>
              <h3 className="font-heading text-xl font-semibold">
                Recent Messages
              </h3>

              <p className="mt-1 font-body text-xs text-brand-light/35">
                Latest project inquiries
              </p>
            </div>

            <button
              onClick={() => setActiveSection("messages")}
              className="font-body text-xs font-bold text-brand-amber transition hover:underline"
            >
              View All
            </button>
          </div>

          {recentMessages.length === 0 ? (
            <EmptyState
              icon={FiMail}
              title="No messages yet"
              description="New contact form submissions will appear here."
            />
          ) : (
            <div className="divide-y divide-brand-light/10">
              {recentMessages.map((message) => (
                <button
                  key={message.id}
                  onClick={() => setSelectedMessage(message)}
                  className="group flex w-full items-center gap-4 p-5 text-left transition hover:bg-brand-light/3"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-brand-amber/10 bg-brand-amber/5 text-brand-amber transition group-hover:border-brand-amber/25 group-hover:bg-brand-amber/10">
                    <FiUser />
                  </div>

                  <div className="min-w-0 flex-1">
                    <p className="truncate font-body text-sm font-bold transition group-hover:text-brand-amber">
                      {message.name}
                    </p>

                    <p className="mt-1 truncate font-body text-xs text-brand-light/35">
                      {message.service}
                    </p>
                  </div>

                  <StatusBadge status={message.status} />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Pending Reviews */}
        <div className="overflow-hidden rounded-2xl border border-brand-light/10 bg-[#191C21]">
          <div className="flex items-center justify-between border-b border-brand-light/10 p-5">
            <div>
              <h3 className="font-heading text-xl font-semibold">
                Pending Reviews
              </h3>

              <p className="mt-1 font-body text-xs text-brand-light/35">
                Reviews waiting for moderation
              </p>
            </div>

            <button
              onClick={() => setActiveSection("reviews")}
              className="font-body text-xs font-bold text-brand-amber transition hover:underline"
            >
              View All
            </button>
          </div>

          {pendingReviews.length === 0 ? (
            <EmptyState
              icon={FiCheckCircle}
              title="All caught up"
              description="There are no reviews waiting for approval."
            />
          ) : (
            <div className="divide-y divide-brand-light/10">
              {pendingReviews.slice(0, 5).map((review) => (
                <div key={review.id} className="p-5">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="font-body text-sm font-bold">
                        {review.name}
                      </p>

                      <p className="mt-1 font-body text-xs text-brand-light/35">
                        {review.role}
                      </p>
                    </div>

                    <div className="flex text-brand-amber">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <FiStar
                          key={star}
                          className={`text-xs ${
                            star <= Number(review.rating)
                              ? "fill-current"
                              : "opacity-20"
                          }`}
                        />
                      ))}
                    </div>
                  </div>

                  <p className="mt-3 line-clamp-2 font-body text-xs leading-5 text-brand-light/45">
                    {review.review}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

/* =============================================================
   MESSAGES VIEW
============================================================= */

const MessagesView = ({
  messages,
  search,
  setSearch,
  loading,
  onStatusChange,
  onDelete,
  onOpen,
}) => {
  return (
    <div>
      <SectionHeader
        eyebrow="Contact"
        title="Project Messages"
        description="Review inquiries submitted through your website."
      />

      {/* Search */}
      <div className="mb-5">
        <div className="relative w-full max-w-xl">
          <FiSearch className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-brand-light/30" />

          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search name, email, service..."
            className="w-full rounded-xl border border-brand-light/10 bg-[#191C21] py-3.5 pl-11 pr-4 font-body text-sm text-brand-light outline-none transition focus:border-brand-amber/50 focus:bg-[#1B1E23]"
          />
        </div>
      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-2xl border border-brand-light/10 bg-[#191C21]">
        {loading ? (
          <LoadingState />
        ) : messages.length === 0 ? (
          <EmptyState
            icon={FiMail}
            title="No messages found"
            description="Contact form submissions will appear here."
          />
        ) : (
          <>
            {/* Desktop */}
            <div className="hidden overflow-x-auto lg:block">
              <table className="w-full min-w-212.5">
                <thead>
                  <tr className="border-b border-brand-light/10 text-left">
                    <th className="px-5 py-4 font-body text-[10px] font-extrabold uppercase tracking-[0.15em] text-brand-light/30">
                      Contact
                    </th>

                    <th className="px-5 py-4 font-body text-[10px] font-extrabold uppercase tracking-[0.15em] text-brand-light/30">
                      Service
                    </th>

                    <th className="px-5 py-4 font-body text-[10px] font-extrabold uppercase tracking-[0.15em] text-brand-light/30">
                      Status
                    </th>

                    <th className="px-5 py-4 font-body text-[10px] font-extrabold uppercase tracking-[0.15em] text-brand-light/30">
                      Date
                    </th>

                    <th className="px-5 py-4 text-right font-body text-[10px] font-extrabold uppercase tracking-[0.15em] text-brand-light/30">
                      Actions
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-brand-light/10">
                  {messages.map((message) => (
                    <MessageRow
                      key={message.id}
                      message={message}
                      onStatusChange={onStatusChange}
                      onDelete={onDelete}
                      onOpen={onOpen}
                    />
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile */}
            <div className="divide-y divide-brand-light/10 lg:hidden">
              {messages.map((message) => (
                <MessageMobileCard
                  key={message.id}
                  message={message}
                  onStatusChange={onStatusChange}
                  onDelete={onDelete}
                  onOpen={onOpen}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

/* =============================================================
   REVIEWS VIEW
============================================================= */

const ReviewsView = ({
  reviews,
  allReviews,
  search,
  setSearch,
  filter,
  setFilter,
  loading,
  onApprove,
  onReject,
  onDelete,
}) => {
  return (
    <div>
      <SectionHeader
        eyebrow="Moderation"
        title="Client Reviews"
        description="Approve reviews before they become visible on your public website."
      />

      {/* Filters */}
      <div className="mb-5 flex flex-col gap-3 xl:flex-row xl:items-center xl:justify-between">
        <div className="relative w-full xl:max-w-xl">
          <FiSearch className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-brand-light/30" />

          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search reviews..."
            className="w-full rounded-xl border border-brand-light/10 bg-[#191C21] py-3.5 pl-11 pr-4 font-body text-sm text-brand-light outline-none transition focus:border-brand-amber/50 focus:bg-[#1B1E23]"
          />
        </div>

        <div className="flex flex-wrap gap-2">
          {["all", "pending", "approved", "rejected"].map((status) => {
            const count =
              status === "all"
                ? allReviews.length
                : allReviews.filter((review) => review.status === status)
                    .length;

            return (
              <button
                key={status}
                onClick={() => setFilter(status)}
                className={`rounded-xl px-4 py-2.5 font-body text-xs font-bold capitalize transition-all duration-200 ${
                  filter === status
                    ? "bg-brand-amber text-brand-dark shadow-[0_6px_20px_rgba(232,89,12,0.12)]"
                    : "border border-brand-light/10 bg-brand-light/5 text-brand-light/50 hover:border-brand-amber/20 hover:bg-brand-amber/5 hover:text-brand-light"
                }`}
              >
                {status}

                <span
                  className={`ml-2 ${
                    filter === status ? "opacity-70" : "opacity-50"
                  }`}
                >
                  {status === "all" ? allReviews.length : count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Reviews */}
      {loading ? (
        <div className="overflow-hidden rounded-2xl border border-brand-light/10 bg-[#191C21]">
          <LoadingState />
        </div>
      ) : reviews.length === 0 ? (
        <div className="overflow-hidden rounded-2xl border border-brand-light/10 bg-[#191C21]">
          <EmptyState
            icon={FiStar}
            title="No reviews found"
            description="Submitted reviews will appear here for moderation."
          />
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-5 xl:grid-cols-2">
          {reviews.map((review) => (
            <ReviewAdminCard
              key={review.id}
              review={review}
              onApprove={onApprove}
              onReject={onReject}
              onDelete={onDelete}
            />
          ))}
        </div>
      )}
    </div>
  );
};

/* =============================================================
   MESSAGE ROW
============================================================= */

const MessageRow = ({ message, onStatusChange, onDelete, onOpen }) => {
  return (
    <tr className="group transition hover:bg-brand-light/2">
      <td className="px-5 py-5">
        <button onClick={() => onOpen(message)} className="text-left">
          <p className="font-body text-sm font-bold transition group-hover:text-brand-amber">
            {message.name}
          </p>

          <p className="mt-1 font-body text-xs text-brand-light/35">
            {message.email}
          </p>
        </button>
      </td>

      <td className="px-5 py-5">
        <span className="font-body text-xs text-brand-light/55">
          {message.service}
        </span>
      </td>

      <td className="px-5 py-5">
        <StatusSelect
          value={message.status}
          onChange={(value) => onStatusChange(message.id, value)}
          options={["new", "read", "replied"]}
        />
      </td>

      <td className="px-5 py-5">
        <span className="font-body text-xs text-brand-light/35">
          {formatDate(message.created_at)}
        </span>
      </td>

      <td className="px-5 py-5">
        <div className="flex justify-end gap-2">
          <IconButton
            icon={FiEye}
            label="View"
            onClick={() => onOpen(message)}
          />

          <IconButton
            icon={FiTrash2}
            label="Delete"
            danger
            onClick={() => onDelete(message.id)}
          />
        </div>
      </td>
    </tr>
  );
};

/* =============================================================
   MOBILE MESSAGE CARD
============================================================= */

const MessageMobileCard = ({ message, onStatusChange, onDelete, onOpen }) => {
  return (
    <div className="p-5">
      <div className="flex items-start justify-between gap-4">
        <button onClick={() => onOpen(message)} className="min-w-0 text-left">
          <p className="truncate font-body text-sm font-bold">{message.name}</p>

          <p className="mt-1 truncate font-body text-xs text-brand-light/35">
            {message.email}
          </p>
        </button>

        <StatusBadge status={message.status} />
      </div>

      <div className="mt-4 grid grid-cols-2 gap-3">
        <div>
          <p className="font-body text-[10px] font-bold uppercase tracking-[0.12em] text-brand-light/25">
            Service
          </p>

          <p className="mt-1 font-body text-xs text-brand-light/55">
            {message.service}
          </p>
        </div>

        <div>
          <p className="font-body text-[10px] font-bold uppercase tracking-[0.12em] text-brand-light/25">
            Date
          </p>

          <p className="mt-1 font-body text-xs text-brand-light/55">
            {formatDate(message.created_at)}
          </p>
        </div>
      </div>

      <div className="mt-4 flex gap-2">
        <button
          onClick={() => onOpen(message)}
          className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-brand-light/10 py-2.5 font-body text-xs font-bold text-brand-light/60 transition hover:bg-brand-light/5 hover:text-brand-light"
        >
          <FiEye />
          View
        </button>

        <button
          onClick={() =>
            onStatusChange(
              message.id,
              message.status === "new" ? "read" : "replied",
            )
          }
          className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-brand-amber/20 py-2.5 font-body text-xs font-bold text-brand-amber transition hover:bg-brand-amber/10"
        >
          <FiCheck />

          {message.status === "new"
            ? "Mark Read"
            : message.status === "read"
              ? "Replied"
              : "Replied"}
        </button>

        <button
          onClick={() => onDelete(message.id)}
          aria-label="Delete message"
          className="rounded-xl border border-red-400/10 px-3 py-2.5 text-red-300/60 transition hover:bg-red-400/5 hover:text-red-300"
        >
          <FiTrash2 />
        </button>
      </div>
    </div>
  );
};

/* =============================================================
   REVIEW CARD
============================================================= */

const ReviewAdminCard = ({ review, onApprove, onReject, onDelete }) => {
  const isPending = review.status === "pending";

  return (
    <div className="group relative overflow-hidden rounded-2xl border border-brand-light/10 bg-[#191C21] p-5 transition-all duration-300 hover:-translate-y-0.5 hover:border-brand-amber/25 hover:shadow-[0_18px_45px_rgba(0,0,0,0.22)] sm:p-6">
      {/* top glow */}
      <div className="pointer-events-none absolute -right-16 -top-16 h-32 w-32 rounded-full bg-brand-amber/5 blur-3xl transition group-hover:bg-brand-amber/10" />

      {/* Header */}
      <div className="relative flex items-start justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="relative flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-full border border-brand-amber/25 bg-brand-dark p-1.5">
            <img
              src={LogoIcon}
              alt="PixelForge"
              className="h-full w-full rounded-full object-contain"
            />
          </div>

          <div className="min-w-0">
            <p className="truncate font-body text-sm font-bold">
              {review.name}
            </p>

            <p className="mt-1 truncate font-body text-xs text-brand-light/35">
              {review.role}
            </p>
          </div>
        </div>

        <StatusBadge status={review.status} />
      </div>

      {/* Rating */}
      <div className="relative mt-5 flex items-center gap-1 text-brand-amber">
        {[1, 2, 3, 4, 5].map((star) => (
          <FiStar
            key={star}
            className={`text-sm ${
              star <= Number(review.rating) ? "fill-current" : "opacity-20"
            }`}
          />
        ))}
      </div>

      {/* Review */}
      <p className="relative mt-4 font-body text-sm leading-7 text-brand-light/55">
        "{review.review}"
      </p>

      {/* Footer */}
      <div className="relative mt-5 flex flex-col gap-3 border-t border-brand-light/10 pt-5 sm:flex-row sm:items-center sm:justify-between">
        <p className="font-body text-[10px] text-brand-light/25">
          {formatDate(review.created_at)}
        </p>

        <div className="flex flex-wrap gap-2">
          {isPending && (
            <>
              <button
                onClick={() => onApprove(review.id)}
                className="flex items-center gap-1.5 rounded-lg bg-brand-amber px-3 py-2 font-body text-xs font-extrabold text-brand-dark transition hover:-translate-y-0.5 hover:shadow-[0_0_20px_rgba(232,89,12,0.2)]"
              >
                <FiCheck />
                Approve
              </button>

              <button
                onClick={() => onReject(review.id)}
                className="flex items-center gap-1.5 rounded-lg border border-brand-light/10 px-3 py-2 font-body text-xs font-bold text-brand-light/50 transition hover:bg-brand-light/5 hover:text-brand-light"
              >
                <FiX />
                Reject
              </button>
            </>
          )}

          {review.status === "approved" && (
            <button
              onClick={() => onReject(review.id)}
              className="rounded-lg border border-brand-light/10 px-3 py-2 font-body text-xs font-bold text-brand-light/50 transition hover:border-brand-amber/20 hover:bg-brand-amber/5 hover:text-brand-light"
            >
              Unpublish
            </button>
          )}

          {review.status === "rejected" && (
            <button
              onClick={() => onApprove(review.id)}
              className="rounded-lg border border-brand-amber/20 px-3 py-2 font-body text-xs font-bold text-brand-amber transition hover:bg-brand-amber/10"
            >
              Approve
            </button>
          )}

          <button
            onClick={() => onDelete(review.id)}
            aria-label="Delete review"
            className="rounded-lg border border-red-400/10 p-2 text-red-300/50 transition hover:bg-red-400/5 hover:text-red-300"
          >
            <FiTrash2 />
          </button>
        </div>
      </div>
    </div>
  );
};

/* =============================================================
   MESSAGE MODAL
============================================================= */

const MessageModal = ({ message, onClose, onStatusChange, onDelete }) => {
  return (
    <ModalOverlay onClose={onClose}>
      <div className="relative w-full max-w-2xl overflow-hidden rounded-3xl border border-brand-light/10 bg-[#191C21] shadow-[0_25px_90px_rgba(0,0,0,0.45)]">
        <div className="absolute left-8 right-8 top-0 h-px bg-brand-amber/30" />

        {/* Header */}
        <div className="flex items-start justify-between border-b border-brand-light/10 p-5 sm:p-6">
          <div>
            <p className="font-body text-[10px] font-extrabold uppercase tracking-[0.2em] text-brand-amber">
              Project Inquiry
            </p>

            <h2 className="mt-2 font-heading text-2xl font-semibold">
              {message.name}
            </h2>
          </div>

          <button
            onClick={onClose}
            aria-label="Close"
            className="rounded-lg p-2 text-brand-light/40 transition hover:bg-brand-light/5 hover:text-brand-light"
          >
            <FiX />
          </button>
        </div>

        {/* Content */}
        <div className="max-h-[65vh] overflow-y-auto p-5 sm:p-6">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <InfoBox icon={FiMail} label="Email" value={message.email} />

            <InfoBox
              icon={FiFileText}
              label="Service"
              value={message.service}
            />

            <InfoBox
              icon={FiActivity}
              label="Phone"
              value={message.phone || "Not provided"}
            />

            <InfoBox
              icon={FiClock}
              label="Submitted"
              value={formatDate(message.created_at)}
            />
          </div>

          {/* Message */}
          <div className="mt-5 rounded-2xl border border-brand-light/10 bg-brand-dark p-5">
            <p className="font-body text-[10px] font-extrabold uppercase tracking-[0.15em] text-brand-light/30">
              Message
            </p>

            <p className="mt-3 whitespace-pre-wrap font-body text-sm leading-7 text-brand-light/65">
              {message.message}
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="flex flex-col gap-3 border-t border-brand-light/10 p-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-2">
            <span className="font-body text-xs text-brand-light/35">
              Status:
            </span>

            <StatusSelect
              value={message.status}
              onChange={(value) => onStatusChange(message.id, value)}
              options={["new", "read", "replied"]}
            />
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => onDelete(message.id)}
              className="flex items-center gap-2 rounded-xl border border-red-400/10 px-4 py-2.5 font-body text-xs font-bold text-red-300/60 transition hover:bg-red-400/5 hover:text-red-300"
            >
              <FiTrash2 />
              Delete
            </button>

            <button
              onClick={onClose}
              className="rounded-xl bg-brand-amber px-5 py-2.5 font-body text-xs font-extrabold text-brand-dark transition hover:shadow-[0_0_20px_rgba(232,89,12,0.15)]"
            >
              Done
            </button>
          </div>
        </div>
      </div>
    </ModalOverlay>
  );
};

/* =============================================================
   SECTION HEADER
============================================================= */

const SectionHeader = ({ eyebrow, title, description }) => {
  return (
    <div className="mb-7">
      <p className="font-body text-xs font-extrabold uppercase tracking-[0.2em] text-brand-amber">
        {eyebrow}
      </p>

      <h2 className="mt-2 font-heading text-3xl font-semibold tracking-tight sm:text-4xl">
        {title}
      </h2>

      <p className="mt-2 max-w-2xl font-body text-sm leading-6 text-brand-light/45">
        {description}
      </p>
    </div>
  );
};

/* =============================================================
   STAT CARD
============================================================= */

const StatCard = ({
  icon: Icon,
  label,
  value,
  description,
  accent = false,
}) => {
  return (
    <div className="group relative overflow-hidden rounded-2xl border border-brand-light/10 bg-[#191C21] p-5 transition-all duration-300 hover:-translate-y-0.5 hover:border-brand-amber/25 hover:shadow-[0_15px_40px_rgba(0,0,0,0.20)]">
      {/* subtle glow */}
      <div className="pointer-events-none absolute -right-10 -top-10 h-24 w-24 rounded-full bg-brand-amber/5 blur-2xl transition-opacity duration-300 group-hover:bg-brand-amber/10" />

      <div className="relative flex items-start justify-between">
        <div
          className={`flex h-11 w-11 items-center justify-center rounded-xl border ${
            accent
              ? "border-brand-amber/30 bg-brand-amber text-brand-dark"
              : "border-brand-amber/10 bg-brand-amber/5 text-brand-amber"
          }`}
        >
          <Icon className="text-xl" />
        </div>

        <FiActivity className="text-brand-light/10 transition group-hover:text-brand-amber/20" />
      </div>

      <div className="relative mt-5">
        <p className="font-body text-[10px] font-extrabold uppercase tracking-[0.16em] text-brand-light/35">
          {label}
        </p>

        <div className="mt-2 flex items-end justify-between gap-3">
          <p className="font-heading text-3xl font-semibold tracking-tight">
            {value}
          </p>

          <p className="mb-1 text-right font-body text-[10px] text-brand-light/30">
            {description}
          </p>
        </div>
      </div>

      {/* bottom accent */}
      <div className="absolute bottom-0 left-5 right-5 h-px bg-brand-amber/0 transition group-hover:bg-brand-amber/30" />
    </div>
  );
};

/* =============================================================
   STATUS BADGE
============================================================= */

const StatusBadge = ({ status }) => {
  const styles = {
    new: "border-brand-amber/20 bg-brand-amber/10 text-brand-amber",

    read: "border-brand-light/10 bg-brand-light/5 text-brand-light/50",

    replied: "border-brand-amber/20 bg-brand-amber/5 text-brand-amber/70",

    pending: "border-brand-amber/20 bg-brand-amber/10 text-brand-amber",

    approved: "border-brand-amber/20 bg-brand-amber/5 text-brand-amber/80",

    rejected: "border-red-300/10 bg-red-300/5 text-red-300/70",
  };

  return (
    <span
      className={`inline-flex shrink-0 items-center rounded-full border px-2.5 py-1 font-body text-[10px] font-extrabold capitalize ${
        styles[status] ||
        "border-brand-light/10 bg-brand-light/5 text-brand-light/50"
      }`}
    >
      {status}
    </span>
  );
};

/* =============================================================
   STATUS SELECT
============================================================= */

const StatusSelect = ({ value, onChange, options }) => {
  return (
    <div className="relative inline-flex">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="appearance-none rounded-lg border border-brand-light/10 bg-brand-dark py-2 pl-3 pr-8 font-body text-[11px] font-bold capitalize text-brand-light/60 outline-none transition focus:border-brand-amber/40"
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>

      <FiChevronDown className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-xs text-brand-light/30" />
    </div>
  );
};

/* =============================================================
   ICON BUTTON
============================================================= */

const IconButton = ({ icon: Icon, label, onClick, danger = false }) => {
  return (
    <button
      onClick={onClick}
      aria-label={label}
      title={label}
      className={`rounded-lg border p-2 transition-all duration-200 ${
        danger
          ? "border-red-400/10 text-red-300/40 hover:bg-red-400/5 hover:text-red-300"
          : "border-brand-light/10 text-brand-light/40 hover:border-brand-amber/20 hover:bg-brand-amber/5 hover:text-brand-amber"
      }`}
    >
      <Icon className="text-sm" />
    </button>
  );
};

/* =============================================================
   ADMIN INPUT
============================================================= */

const AdminInput = ({
  label,
  type = "text",
  name,
  value,
  onChange,
  placeholder,
}) => {
  return (
    <div>
      <label className="mb-2 block font-body text-xs font-bold uppercase tracking-[0.12em] text-brand-light/55">
        {label}
      </label>

      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full rounded-xl border border-brand-light/10 bg-brand-dark px-4 py-3.5 font-body text-sm text-brand-light outline-none transition placeholder:text-brand-light/20 focus:border-brand-amber/60 focus:bg-[#16181C] focus:ring-2 focus:ring-brand-amber/10"
      />
    </div>
  );
};

/* =============================================================
   INFO BOX
============================================================= */

const InfoBox = ({ icon: Icon, label, value }) => {
  return (
    <div className="rounded-xl border border-brand-light/10 bg-brand-dark p-4 transition hover:border-brand-amber/15">
      <div className="flex items-center gap-2 text-brand-amber">
        <Icon className="text-sm" />

        <span className="font-body text-[10px] font-extrabold uppercase tracking-[0.12em]">
          {label}
        </span>
      </div>

      <p className="mt-2 wrap-break-word font-body text-xs leading-5 text-brand-light/55">
        {value}
      </p>
    </div>
  );
};

/* =============================================================
   EMPTY STATE
============================================================= */

const EmptyState = ({ icon: Icon, title, description }) => {
  return (
    <div className="flex min-h-62.5 flex-col items-center justify-center px-6 py-12 text-center">
      <div className="flex h-14 w-14 items-center justify-center rounded-full border border-brand-light/10 bg-brand-light/5 text-brand-light/30">
        <Icon className="text-xl" />
      </div>

      <h3 className="mt-5 font-heading text-xl font-semibold">{title}</h3>

      <p className="mt-2 max-w-sm font-body text-xs leading-5 text-brand-light/35">
        {description}
      </p>
    </div>
  );
};

/* =============================================================
   LOADING STATE
============================================================= */

const LoadingState = () => {
  return (
    <div className="flex min-h-62.5 items-center justify-center">
      <div className="flex items-center gap-3 text-brand-light/40">
        <FiRefreshCw className="animate-spin text-brand-amber" />

        <span className="font-body text-sm">Loading...</span>
      </div>
    </div>
  );
};

/* =============================================================
   MODAL OVERLAY
============================================================= */

const ModalOverlay = ({ children, onClose }) => {
  return (
    <div
      className="fixed inset-0 z-80 flex items-center justify-center overflow-y-auto bg-black/70 p-4 backdrop-blur-md"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      {children}
    </div>
  );
};

/* =============================================================
   HELPERS
============================================================= */

const formatDate = (date) => {
  if (!date) return "—";

  const parsed = new Date(date);

  if (Number.isNaN(parsed.getTime())) {
    return "—";
  }

  return parsed.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};

export default Admin;
