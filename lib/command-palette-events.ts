export const TOGGLE_COMMAND_PALETTE_EVENT = "toggle-command-palette";

export function toggleCommandPalette() {
  window.dispatchEvent(new Event(TOGGLE_COMMAND_PALETTE_EVENT));
}
