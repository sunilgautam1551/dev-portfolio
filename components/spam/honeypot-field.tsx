import type { UseFormRegisterReturn } from "react-hook-form";

/**
 * Hidden from sighted users and keyboard/screen-reader users alike; bots that
 * blindly fill every form field will trip it. Paired with server-side checks
 * in the route handlers — never trust this alone.
 */
export function HoneypotField({ register }: { register: UseFormRegisterReturn }) {
  return (
    <div aria-hidden="true" className="absolute top-0 -left-[9999px] h-0 w-0 overflow-hidden">
      <label htmlFor="company">Company</label>
      <input id="company" type="text" tabIndex={-1} autoComplete="off" {...register} />
    </div>
  );
}
