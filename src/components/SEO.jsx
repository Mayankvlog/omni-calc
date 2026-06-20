import { useEffect } from 'react';
import { SEO_TEMPLATES } from '../types.js';
import { LANGUAGES } from '../utils/languages.js';

const BASE_URL = 'https://ais-pre-k5knbps4ntmxxa2m5qium2-932553371137.asia-southeast1.run.app';

function langCodeToHreflang(code) {
  if (code === 'zh_cn') return 'zh-Hans';
  if (code === 'zh_tw') return 'zh-Hant';
  return code;
}

function getImageUrl() {
  return `${BASE_URL}/og-image.svg`;
}

function upsertMeta(attribute, attrValue, content) {
  const selector = attribute === 'property'
    ? `meta[property="${attrValue}"]`
    : `meta[name="${attrValue}"]`;
  let el = document.querySelector(selector);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attribute, attrValue);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

function upsertLink(rel, href) {
  let el = document.querySelector(`link[rel="${rel}"]`);
  if (!el) {
    el = document.createElement('link');
    el.setAttribute('rel', rel);
    document.head.appendChild(el);
  }
  el.setAttribute('href', href);
}

function removeHreflangLinks() {
  document.querySelectorAll('link[rel="alternate"][hreflang]').forEach(el => el.remove());
}

function injectJsonLd(data) {
  let el = document.querySelector('script[type="application/ld+json"]');
  if (!el) {
    el = document.createElement('script');
    el.setAttribute('type', 'application/ld+json');
    document.head.appendChild(el);
  }
  el.textContent = JSON.stringify(data);
}

export default function SEO({ mode, lang = 'en' }) {
  const metadata = SEO_TEMPLATES[mode];

  useEffect(() => {
    if (!metadata) return;

    const url = window.location.origin + window.location.pathname + window.location.search;

    document.title = metadata.title;

    upsertMeta('name', 'description', metadata.description);
    upsertMeta('name', 'keywords', metadata.keywords);
    upsertMeta('property', 'og:title', metadata.title);
    upsertMeta('property', 'og:description', metadata.description);
    upsertMeta('property', 'og:type', 'website');
    upsertMeta('property', 'og:url', url);
    upsertMeta('property', 'og:site_name', 'OmniCalc Classic');
    upsertMeta('property', 'og:image', getImageUrl());
    upsertMeta('name', 'twitter:card', 'summary_large_image');
    upsertMeta('name', 'twitter:title', metadata.title);
    upsertMeta('name', 'twitter:description', metadata.description);
    upsertMeta('name', 'twitter:image', getImageUrl());

    upsertLink('canonical', url);

    removeHreflangLinks();
    LANGUAGES.forEach(({ code }) => {
      const hf = langCodeToHreflang(code);
      const langUrl = new URL(url);
      langUrl.searchParams.set('lang', code);
      const link = document.createElement('link');
      link.setAttribute('rel', 'alternate');
      link.setAttribute('hreflang', hf);
      link.setAttribute('href', langUrl.toString());
      document.head.appendChild(link);
    });
    const xDefault = document.createElement('link');
    xDefault.setAttribute('rel', 'alternate');
    xDefault.setAttribute('hreflang', 'x-default');
    xDefault.setAttribute('href', window.location.origin + window.location.pathname);
    document.head.appendChild(xDefault);

    const jsonLd = {
      '@context': 'https://schema.org',
      '@type': 'WebApplication',
      name: 'OmniCalc Classic',
      url: BASE_URL,
      description: metadata.description,
      applicationCategory: 'CalculatorApplication',
      operatingSystem: 'All',
      browserRequirements: 'Requires JavaScript',
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'USD'
      },
      author: {
        '@type': 'Organization',
        name: 'OmniCalc'
      }
    };
    injectJsonLd(jsonLd);

  }, [mode, metadata, lang]);

  return null;
}
