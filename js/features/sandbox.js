/**
 * Live Sandbox Feature
 * Provides live preview iframe for code examples
 */

const Sandbox = {
  /**
   * Initialize live sandboxes (iframes with editable code)
   */
  init() {
    const componentCards = document.querySelectorAll(".component-card");
    if (componentCards.length === 0) return;

    componentCards.forEach((card, index) => {
      const h3 = card.querySelector("h3");
      const actions = card.querySelector(".actions");
      const existingCodeBlock = card.querySelector(".code-block");

      const previewNodes = Array.from(card.childNodes).filter((node) => {
        return (
          (node.nodeType === Node.ELEMENT_NODE ||
            (node.nodeType === Node.TEXT_NODE && node.textContent.trim() !== "")) &&
          node !== h3 &&
          node !== actions &&
          node !== existingCodeBlock &&
          node.nodeName !== "SCRIPT"
        );
      });

      if (previewNodes.length === 0 && !existingCodeBlock) return;

      let initialHTML = existingCodeBlock
        ? existingCodeBlock.textContent.trim()
        : previewNodes.map((n) => n.outerHTML || n.textContent).join("\n").trim();

      previewNodes.forEach((node) => node.remove());

      // Create iframe preview
      const iframe = document.createElement("iframe");
      iframe.style.width = "100%";
      iframe.style.minHeight = "160px";
      iframe.style.border = "1px solid #e8ebf2";
      iframe.style.borderRadius = "8px";
      iframe.style.background = "transparent";
      iframe.setAttribute("sandbox", "allow-scripts");
      iframe.setAttribute("title", "Live component preview");
      iframe.loading = "lazy";

      const shell = document.createElement("div");
      shell.style.marginTop = "12px";
      shell.style.border = "1px solid #dbe3ef";
      shell.style.borderRadius = "14px";
      shell.style.overflow = "hidden";
      shell.style.background = "#fff";
      shell.style.boxShadow = "0 14px 30px rgba(15, 23, 42, 0.08)";

      const shellHeader = document.createElement("div");
      shellHeader.style.display = "flex";
      shellHeader.style.alignItems = "center";
      shellHeader.style.justifyContent = "space-between";
      shellHeader.style.gap = "12px";
      shellHeader.style.padding = "10px 14px";
      shellHeader.style.background = "linear-gradient(180deg, #f8fbff 0%, #eef4fb 100%)";
      shellHeader.style.borderBottom = "1px solid #dbe3ef";

      const shellTitle = document.createElement("div");
      shellTitle.innerHTML = '<div style="font-size:12px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;color:#274060;">Live Preview</div><div style="font-size:12px;color:#62748b;margin-top:2px;">Sandboxed and isolated from the page</div>';

      const shellBadge = document.createElement("span");
      shellBadge.textContent = "Overlay";
      shellBadge.style.display = "inline-flex";
      shellBadge.style.alignItems = "center";
      shellBadge.style.padding = "4px 10px";
      shellBadge.style.borderRadius = "999px";
      shellBadge.style.fontSize = "11px";
      shellBadge.style.fontWeight = "700";
      shellBadge.style.letterSpacing = "0.04em";
      shellBadge.style.textTransform = "uppercase";
      shellBadge.style.color = "#0f5bd8";
      shellBadge.style.background = "rgba(37, 99, 235, 0.12)";

      const previewStage = document.createElement("div");
      previewStage.style.position = "relative";
      previewStage.style.background = "linear-gradient(180deg, #ffffff 0%, #f8fbff 100%)";

      const previewBadge = document.createElement("div");
      previewBadge.textContent = "Preview";
      previewBadge.style.position = "absolute";
      previewBadge.style.top = "12px";
      previewBadge.style.right = "12px";
      previewBadge.style.zIndex = "2";
      previewBadge.style.pointerEvents = "none";
      previewBadge.style.padding = "5px 10px";
      previewBadge.style.borderRadius = "999px";
      previewBadge.style.background = "rgba(15, 23, 42, 0.72)";
      previewBadge.style.color = "#fff";
      previewBadge.style.fontSize = "11px";
      previewBadge.style.fontWeight = "700";
      previewBadge.style.letterSpacing = "0.04em";
      previewBadge.style.textTransform = "uppercase";

      // Create editable textarea
      const textarea = document.createElement("textarea");
      if (existingCodeBlock) {
        textarea.id = existingCodeBlock.id;
        textarea.className = existingCodeBlock.className;
        textarea.style.display = existingCodeBlock.style.display || "none";
      } else {
        textarea.id = "live-code-" + index;
        textarea.className = "code-block";
        textarea.style.display = "none";

        if (actions) {
          const toggleBtn = actions.querySelector('button[onclick^="toggleCode"]');
          const copyBtn = actions.querySelector('button[onclick^="copyCode"]');
          if (toggleBtn) toggleBtn.setAttribute("onclick", `toggleCode("${textarea.id}")`);
          if (copyBtn) copyBtn.setAttribute("onclick", `copyCode("${textarea.id}", this)`);
        }
      }

      textarea.value = initialHTML;
      textarea.style.width = "100%";
      textarea.style.minHeight = "120px";
      textarea.style.boxSizing = "border-box";
      textarea.style.resize = "vertical";

      const renderIframe = (htmlContent) => {
        iframe.srcdoc = `
          <!DOCTYPE html>
          <html>
          <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <link rel="stylesheet" href="style.css">
            <style>
              :root {
                color-scheme: light;
              }

              body {
                min-height: 100vh;
                margin: 0;
                background: transparent;
                padding: 20px;
                box-sizing: border-box;
                position: relative;
                font-family: inherit;
              }

              #sandbox-root {
                min-height: calc(100vh - 40px);
              }

              .sandbox-error-overlay {
                position: fixed;
                inset: 12px;
                z-index: 9999;
                display: none;
                align-items: flex-start;
                justify-content: flex-start;
                padding: 16px;
                background: rgba(127, 29, 29, 0.94);
                color: #fff;
                border: 1px solid rgba(255, 255, 255, 0.15);
                border-radius: 12px;
                box-shadow: 0 12px 30px rgba(0, 0, 0, 0.25);
                font-family: ui-monospace, SFMono-Regular, Consolas, monospace;
              }

              .sandbox-error-overlay.is-visible {
                display: flex;
              }

              .sandbox-error-card {
                width: 100%;
                max-width: 100%;
              }

              .sandbox-error-title {
                margin: 0 0 8px;
                font-size: 14px;
                font-weight: 700;
                letter-spacing: 0.02em;
                text-transform: uppercase;
              }

              .sandbox-error-message {
                margin: 0;
                font-size: 13px;
                line-height: 1.6;
                white-space: pre-wrap;
                word-break: break-word;
              }

              .sandbox-error-meta {
                margin-top: 10px;
                font-size: 12px;
                opacity: 0.85;
              }

              .sandbox-error-hint {
                margin-top: 12px;
                font-size: 12px;
                opacity: 0.8;
              }
            </style>
            <script>
              (function () {
                const overlayId = 'sandbox-error-overlay';

                function getOverlay() {
                  let overlay = document.getElementById(overlayId);
                  if (overlay) return overlay;

                  overlay = document.createElement('div');
                  overlay.id = overlayId;
                  overlay.className = 'sandbox-error-overlay';
                  overlay.innerHTML = [
                    '<div class="sandbox-error-card">',
                    '<p class="sandbox-error-title">Live preview error</p>',
                    '<p class="sandbox-error-message"></p>',
                    '<div class="sandbox-error-meta"></div>',
                    '<div class="sandbox-error-hint">Fix the code in the editor below and the preview will refresh automatically.</div>',
                    '</div>'
                  ].join('');
                  document.body.appendChild(overlay);
                  return overlay;
                }

                function formatError(event) {
                  if (!event) return 'An unknown runtime error occurred.';

                  if (event.message) {
                    const location = event.filename ? ' (' + event.filename + ':' + (event.lineno || '?') + ':' + (event.colno || '?') + ')' : '';
                    return event.message + location;
                  }

                  if (event.reason) {
                    if (typeof event.reason === 'string') return event.reason;
                    if (event.reason.message) return event.reason.message;
                  }

                  return 'An unknown runtime error occurred.';
                }

                function showError(event) {
                  const overlay = getOverlay();
                  const messageEl = overlay.querySelector('.sandbox-error-message');
                  const metaEl = overlay.querySelector('.sandbox-error-meta');

                  messageEl.textContent = formatError(event);
                  metaEl.textContent = event && event.error && event.error.stack ? event.error.stack : '';
                  overlay.classList.add('is-visible');
                }

                function clearError() {
                  const overlay = document.getElementById(overlayId);
                  if (overlay) overlay.classList.remove('is-visible');
                }

                window.addEventListener('error', showError);
                window.addEventListener('unhandledrejection', function (event) {
                  showError(event);
                });

                window.addEventListener('load', function () {
                  clearError();
                });
              })();
            </script>
          </head>
          <body>
            <div id="sandbox-root">${htmlContent}</div>
          </body>
          </html>`;
      };

      renderIframe(initialHTML);

      // Debounced live update
      let timeout;
      textarea.addEventListener("input", (e) => {
        clearTimeout(timeout);
        timeout = setTimeout(() => renderIframe(e.target.value), 300);
      });

      previewStage.appendChild(previewBadge);
      previewStage.appendChild(iframe);
      shellHeader.appendChild(shellTitle);
      shellHeader.appendChild(shellBadge);
      shell.appendChild(shellHeader);
      shell.appendChild(previewStage);

      if (h3) {
        h3.after(shell);
      } else {
        card.insertBefore(shell, card.firstChild);
      }

      if (existingCodeBlock) {
        existingCodeBlock.replaceWith(textarea);
      } else if (actions) {
        actions.after(textarea);
      }
    });
  }
};

// Export for use in bootstrap
if (typeof module !== 'undefined' && module.exports) {
  module.exports = Sandbox;
}
