import { render } from '@lit-labs/ssr/lib/render-with-global-dom-shim.js';
import { html } from 'lit';

import '../components/simple-greeting.js';
import '../components/my-element.js';

/**
 * I cannot import ARC components here...
 *
 * SyntaxError: Cannot use import statement outside a module
 * Warning: To load an ES module, set "type": "module" in the package.json or use the .mjs extension.
 */
// import '@arc-web/components/dist/components/container/arc-container.js';

export function* renderIndex({ name }) {
  yield `
  <!doctype html>  
  <html>
    <head>
      <title>Koa Lit SSR</title>
    <head>
    <body hydration-pending>
  `;

  yield* render(html`
    <simple-greeting name=${name}></simple-greeting>
    <my-element></my-element>
    <my-element></my-element>
  `);

  yield `
      <script type="module">
        const hydrateSupport = import('/node_modules/lit/experimental-hydrate-support.js');
        if (!HTMLTemplateElement.prototype.hasOwnProperty('shadowRoot')) {
          const { hydrateShadowRoots } = await import('/node_modules/@webcomponents/template-shadowroot/template-shadowroot.js');
          hydrateShadowRoots(document.body);
          document.body.removeAttribute('hydration-pending');
        }
        await hydrateSupport;
        document.body.removeAttribute('hydration-pending');
        import('./src/components/simple-greeting.js');
        import('./src/components/my-element.js');
      </script>
    </body>
  </html>
  `;
}
