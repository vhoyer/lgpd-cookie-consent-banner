function Cookies() {
  this.all = () => document.cookie.split(';').map(s => s.trim());

  this.get = (name) => {
    const selected = this.all().find(row => row.startsWith(`${name}=`));
    if (!selected) return;
    return selected.split('=')[1];
  }

  this.set = (name, value) => {
    const newCookie = `${name}=${value}`;
    const rest = this.all().filter(row => !row.startsWith(`${name}=`));

    const newString = [
      newCookie,
      ...rest,
    ].join('; ');

    document.cookie = newString;
  }
}

class LgpdCookieConsentBanner extends HTMLElement {
  constructor() {
    super();

    this.name = 'lgpd-ccb-accepted';
    this.template = '';
    this.cookies = new Cookies();

    this.template = `
    <style>
      .banner {
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        max-width: 20rem;
        padding: 1em;
        margin-left: 1em;
        margin-bottom: 1em;
        border: 1px solid #ebebeb;
        background-color: #f9f9f9;
        box-shadow: 0 0 5px 0px #d9d9d9;
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
        background-color: #2c7644;
        text-transform: uppercase;
        text-align: center;
        font-weight: 600;
        cursor: pointer;
        margin: 0;
        border: 0;
        transition: background .17s ease;
      }

      .banner__action:hover {
        background-color: #111111;
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

    this.innerHTML = this.template;
    this.querySelector('.banner__action').addEventListener('click', () => {
      this.cookies.set(this.name, true);
      this.innerHTML = '';
    });
  }
}

customElements.define('lgpd-cookie-consent-banner', LgpdCookieConsentBanner)

document.currentScript
  .insertAdjacentHTML('beforebegin', '<lgpd-cookie-consent-banner></lgpd-cookie-consent-banner>')
