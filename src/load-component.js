import { Cookies } from './cookies';

export class LgpdCookieConsentBanner extends HTMLElement {
  constructor() {
    super();

    this.name = 'lgpd-ccb-accepted';
    this.template = '';
    this.cookies = new Cookies();

    this.template = `
    <style>
      .banner {
        --inner-margin: var(--banner-margin, 1rem);
        --inner-color-primary: var(--banner-color-primary, #2c7644);
        --inner-color-primary-hover: var(--banner-color-primary-hover, #111111);
        --inner-z-index: var(--banner-z-index, 9999);
        box-sizing: border-box;
        position: fixed;
        bottom: 0;
        left: 0;
        width: 22rem;
        max-width: calc(100% - 2 * var(--inner-margin));
        padding: 1rem;
        margin-left: var(--inner-margin);
        margin-bottom: var(--inner-margin);
        border: 1px solid #ebebeb;
        background-color: #f9f9f9;
        box-shadow: 0 0 5px 0px #d9d9d9;
        z-index: var(--inner-z-index);
      }

      .banner__text {
        margin-top: 0;
        margin-bottom: 1rem;
      }

      .banner__action {
        width: 100%;
        height: 32px;
        font-family: inherit;
        font-size: 11px;
        color: #fff;
        background-color: var(--inner-color-primary);
        text-transform: uppercase;
        text-align: center;
        font-weight: 600;
        cursor: pointer;
        margin: 0;
        border: 0;
        transition: background .17s ease;
      }

      .banner__action:hover {
        background-color: var(--inner-color-primary-hover);
      }
    </style>

    <div class="banner">
      <p class="banner__text">
        Usamos cookies para melhorar sua experiência no <code>${document.location.host}</code>.
        Ao continuar navegando você aceita o uso desses.
      </p>

      <button class="banner__action">Aceitar e continuar</button>
    </div>
`;
  }

  connectedCallback() {
    if (this.cookies.get(this.name)) return;

    const shadow = this.attachShadow({mode: 'open'})
    shadow.innerHTML = this.template;

    shadow.querySelector('.banner__action').addEventListener('click', () => {
      this.cookies.set(this.name, true);
      shadow.innerHTML = '';
    });
  }
}

if (typeof window !== 'undefined') {
  customElements.define('lgpd-cookie-consent-banner', LgpdCookieConsentBanner)
}
