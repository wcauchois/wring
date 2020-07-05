import { configUrlForSite, fetchSiteConfig } from "./utils";
import { WebRingConfig, ConfigValidationError } from "@wcauchois/wring-schema";

export class FetchError extends Error {}

export abstract class BaseRingSite {
  readonly url: string;
  readonly configUrl: string;
  protected readonly crawler: RingCrawler;

  protected abstract getConfig(): Promise<
    WebRingConfig | ConfigValidationError | FetchError
  >;
  protected abstract getIsOwnSite(): boolean;

  get isOwnSite() {
    return this.getIsOwnSite();
  }

  get config() {
    return this.getConfig();
  }

  private async getMaybeConfig() {
    const config = await this.config;
    return config instanceof Error ? undefined : config;
  }

  get maybeConfig() {
    return this.getMaybeConfig();
  }

  private async getMaybeError() {
    const config = await this.config;
    return config instanceof Error ? config : undefined;
  }

  get maybeError() {
    return this.getMaybeError();
  }

  constructor(url: string, crawler: RingCrawler) {
    this.url = url;
    this.configUrl = configUrlForSite(url);
    this.crawler = crawler;
  }

  async getDirection(direction: "next" | "prev") {
    const config = await this.config;
    if (config instanceof Error) {
      return undefined;
    }
    const url =
      direction === "next" ? config.next[0]?.site : config.prev[0]?.site;
    if (!url) {
      return undefined;
    }
    return this.crawler.getOrCreateSite(url);
  }

  get next() {
    return this.getDirection("next");
  }

  get prev() {
    return this.getDirection("prev");
  }
}

export class RingSite extends BaseRingSite {
  private _config:
    | Promise<WebRingConfig | ConfigValidationError | FetchError>
    | undefined;

  protected getIsOwnSite() {
    return false;
  }

  private async doGetConfig() {
    try {
      return await fetchSiteConfig(this.configUrl);
    } catch (err) {
      if (err instanceof ConfigValidationError) {
        return err;
      } else {
        return new FetchError(err.message);
      }
    }
  }

  protected getConfig() {
    if (!this._config) {
      this._config = this.doGetConfig();
    }
    return this._config;
  }
}

export class OwnRingSite extends BaseRingSite {
  readonly _config: WebRingConfig;

  protected getIsOwnSite() {
    return true;
  }

  protected getConfig() {
    return Promise.resolve(this._config);
  }

  constructor(url: string, config: WebRingConfig, crawler: RingCrawler) {
    super(url, crawler);
    this._config = config;
  }
}

function hostnameForUrl(url: string) {
  try {
    return new URL(url).hostname;
  } catch (err) {
    return `broken.site`;
  }
}

export default class RingCrawler {
  readonly siteRegistry: Map<string, BaseRingSite>;
  readonly ownSite: OwnRingSite;

  constructor(ownSiteUrl: string, ownSiteConfig: WebRingConfig) {
    const ownSite = new OwnRingSite(ownSiteUrl, ownSiteConfig, this);
    this.siteRegistry = new Map([[hostnameForUrl(ownSiteUrl), ownSite]]);
    this.ownSite = ownSite;
  }

  getOrCreateSite(url: string): BaseRingSite {
    const hostname = hostnameForUrl(url);
    let site = this.siteRegistry.get(hostname);
    if (!site) {
      site = new RingSite(url, this);
      this.siteRegistry.set(hostname, site);
    }
    return site;
  }

  async *iterDirection(direction: "next" | "prev") {
    let current: BaseRingSite = this.ownSite;
    let seen = new Set<BaseRingSite>([current]);
    while (true) {
      const newSite = await current.getDirection(direction);
      if (!newSite || seen.has(newSite)) {
        break;
      }
      yield newSite;
      seen.add(newSite);
      current = newSite;
    }
  }
}
