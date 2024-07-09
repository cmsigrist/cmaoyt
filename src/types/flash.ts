import { uid } from 'uid';

export const flashTimeout = 4000;

export interface FlashState {
  getMessages(): FlashMessage[];
  addMessage(msg: string, severity: FlashSeverity): void;
  hideMessage(index: string): void;
}

export const enum FlashSeverity {
  Info = "info",
  Success = "success",
  Warning = "warning",
  Error = "error",
}

// FlashMessage defines the structure of a flash.
export class FlashMessage {
  text: string;

  // Level defines the type of flash: info, warn, error
  severity: FlashSeverity;

  // // A uniq string identifier
  id: string;

  constructor(text: string, severity: FlashSeverity) {
    this.text = text;
    this.severity = severity;
    this.id = uid();
  }
}
