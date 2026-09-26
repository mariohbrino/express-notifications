import type { AppContainer } from "@/types/app-container.type";

export abstract class BaseController {
  protected readonly container: AppContainer;

  protected constructor(container: AppContainer) {
    this.container = container;
  }
}
