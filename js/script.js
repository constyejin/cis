
(() => {
  document.currentScript.remove();
  processNode(document);

  function processNode(node) {
    node.querySelectorAll("template[shadowrootmode]").forEach(element => {
      let shadowRoot = element.parentElement.shadowRoot;
      if (!shadowRoot) {
        try {
          shadowRoot = element.parentElement.attachShadow({
            mode: element.getAttribute("shadowrootmode"),
            delegatesFocus: element.getAttribute("shadowrootdelegatesfocus") != null,
            clonable: element.getAttribute("shadowrootclonable") != null,
            serializable: element.getAttribute("shadowrootserializable") != null
          });
          shadowRoot.innerHTML = element.innerHTML;
          element.remove()
        } catch (error) {}
        if (shadowRoot) {
          processNode(shadowRoot)
        }
      }
    })
  }
})()
