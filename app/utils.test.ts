import { validateEmail, money } from "./utils"

test("validateEmail returns false for non-emails", () => {
  expect(validateEmail(undefined)).toBe(false)
  expect(validateEmail(null)).toBe(false)
  expect(validateEmail("")).toBe(false)
  expect(validateEmail("not-an-email")).toBe(false)
  expect(validateEmail("n@")).toBe(false)
})

test("validateEmail returns true for emails", () => {
  expect(validateEmail("kody@example.com")).toBe(true)
})

test("money returns a formatted money string", () => {
  expect(money(1234, "EUR")).toBe("€12.34")
})
