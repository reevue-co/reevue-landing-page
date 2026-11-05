import { expect, test, type Locator, type Page } from "@playwright/test";
import { countries, profiles } from "../lib/contact";
import { ptBr } from "../lib/dictionaries/pt-br";
import { formatPhone } from "../lib/phone-mask";

const copy = ptBr;
const brazilDial = countries.find(([iso]) => iso === "BR")?.[1] ?? "55";
const phoneDigits = "11999990000";

const profileLabel = {
  agency: copy.form.profileAgency,
  independent: copy.form.profileIndependent,
  agent: copy.form.profileAgent,
  owner: copy.form.profileOwner,
} as const;

test.describe("contact form", () => {
  for (const profile of profiles) {
    test(`completes signup for the ${profile} profile`, async ({ page }) => {
      const dialog = await openContact(page);
      const form = copy.form;

      await dialog.getByRole("textbox", { name: form.name }).fill(form.namePlaceholder);
      await dialog.getByRole("radio", { name: profileLabel[profile], exact: true }).check();

      const agency = dialog.getByRole("textbox", { name: form.agencyName });
      if (profile === "agency") {
        await expect(agency).toBeVisible();
        await agency.fill(form.agencyPlaceholder);
      } else {
        await expect(agency).toHaveCount(0);
      }

      const phone = dialog.getByRole("textbox", { name: form.phone });
      await phone.fill(phoneDigits);
      await expect(phone).toHaveValue(formatPhone(phoneDigits, brazilDial));
      await dialog.getByRole("textbox", { name: `${form.email} ${form.optional}` }).fill(form.emailPlaceholder);
      await dialog.getByRole("button", { name: form.next }).click();

      await expect(step(dialog, form.stepLocation)).toHaveAttribute("aria-current", "step");
      await dialog.getByRole("textbox", { name: form.state }).fill(form.statePlaceholder);
      await dialog.getByRole("textbox", { name: form.city }).fill(form.cityPlaceholder);
      await dialog.getByRole("button", { name: form.next }).click();

      await expect(step(dialog, form.stepInterest)).toHaveAttribute("aria-current", "step");
      await expect(dialog.getByRole("checkbox", { name: copy.early.support })).toBeVisible();
      await dialog.getByRole("radio", { name: form.interestSale, exact: true }).check();
      await dialog.getByRole("radio", { name: form.solutionSite }).check();
      await dialog.getByRole("radio", { name: form.no, exact: true }).check();
      await dialog.getByRole("checkbox", { name: copy.early.support }).check();
      await dialog.getByRole("button", { name: form.submit }).click();

      await expect(dialog.getByText(form.success)).toBeVisible({ timeout: 15_000 });
      await expect(dialog.getByText(form.errorInvalid)).toHaveCount(0);
    });
  }
});

async function openContact(page: Page) {
  await page.goto("/pt-br");
  const opener = page.getByRole("button", { name: copy.nav.cta }).first();
  const dialog = page.getByRole("dialog");
  // The button is in the server HTML before React attaches the click handler.
  await expect(async () => {
    await opener.click();
    await expect(dialog).toBeVisible({ timeout: 1_000 });
  }).toPass({ timeout: 15_000 });
  return dialog;
}

function step(dialog: Locator, name: string) {
  return dialog.getByRole("listitem").filter({ hasText: name });
}
