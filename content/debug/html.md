---
title: HTML parser debug tool
draft: false
---

# Info and details

<div class="container">
  <span class="col-1" id="shtml"></span>
  <span class="col-1" id="smetadata"></span>
  <span class="col-1" id="ssummary"></span>
  <span class="col-1" id="serrors"></span>
  <span class="col-1" id="simpression"></span>
  <span class="col-1" id="stimeline"></span>

  <div class="code" id="details"></div>
</div>

---

##### HTML

# Render the HTML (with remote inclusions)
##### Click to Render

<script src="/js/global.js"></script>
<script src="/js/debug.js"></script>
<script src="/js/indent.js"></script>
<script>
$(document).ready(function() {
    debugHTML();
    // this include a new javascript: prettify.js
});
</script>