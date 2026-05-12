/**
 * Authentication mock handlers.
 * Simulate login, register, and password recovery API responses
 * for testing edge cases that the real server does not provide.
 */
import { MockConfig } from "../mock.types";

const BASE_URL = "https://demowebshop.tricentis.com";

export const authHandlers = {
  /**
   * Mock successful login — redirects to home page with Set-Cookie header.
   */
  loginSuccess(): MockConfig {
    return {
      url: `${BASE_URL}/login`,
      method: "POST",
      status: 302,
      body: "",
      contentType: "text/html; charset=utf-8",
      headers: {
        "set-cookie": "NOPCOMMERCE.AUTH=valid-token; path=/; HttpOnly",
        location: `${BASE_URL}/`,
      },
    };
  },

  /**
   * Mock failed login with invalid credentials message.
   */
  loginInvalid(): MockConfig {
    return {
      url: `${BASE_URL}/login`,
      method: "POST",
      status: 200,
      body: '<div class="validation-summary-errors"><span>The credentials provided are incorrect</span></div>',
    };
  },

  /**
   * Mock server error during login attempt.
   */
  loginServerError(): MockConfig {
    return {
      url: `${BASE_URL}/login`,
      method: "POST",
      status: 500,
      body: "<h1>Internal Server Error</h1>",
    };
  },

  /**
   * Mock successful registration — redirects to home page.
   */
  registerSuccess(): MockConfig {
    return {
      url: `${BASE_URL}/register`,
      method: "POST",
      status: 302,
      body: "",
      headers: {
        location: `${BASE_URL}/registerresult/1`,
      },
    };
  },

  /**
   * Mock duplicate email during registration.
   */
  registerDuplicate(): MockConfig {
    return {
      url: `${BASE_URL}/register`,
      method: "POST",
      status: 200,
      body: '<div class="validation-summary-errors"><span>The specified email already exists</span></div>',
    };
  },

  /**
   * Mock successful password recovery request.
   */
  recoverSuccess(): MockConfig {
    return {
      url: `${BASE_URL}/passwordrecovery`,
      method: "POST",
      status: 200,
      body: '<div class="result">Email with instructions has been sent to you.</div>',
    };
  },

  /**
   * Mock password recovery for non-existent email.
   */
  recoverNotFound(): MockConfig {
    return {
      url: `${BASE_URL}/passwordrecovery`,
      method: "POST",
      status: 200,
      body: '<div class="validation-summary-errors"><span>Email not found.</span></div>',
    };
  },
};
