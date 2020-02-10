let token = null;

function errorHTML(msg) {
    return `<div style='color: red'>${msg}</div>`;
}

function debugHTML() {
    if(!token) token = getToken();

    if(!token) {
        $('#html').html(errorHTML("Invalid Token in the URL"));
    } else {
        upsertHTML(token);
    }
}

function upsertHTML(token) {

    let url = buildApiUrl("/debug/html", token, 2);

    $.getJSON(url, (content) => {

        $("#details").text(_.map(content, function(object, name) {
            return `${name}: ${_.size(object)}`;
        }));

        $("#html").text(indent.html(content.html.html, { indentHtmlTag: true, tabString: '  ' }));
        let escaped = $("#html").html();
        $("#html").html(`
            <pre class="prettyprint lang-html">
                ${escaped}
            </pre>
            <script src="/js/prettify.js"></script>
        `);

        $("#click-to-render").css("cursor", "pointer");
        $("#click-to-render").on("click", function() {
            const html = content.html.html.replace(/src="blob:.*"><\/video>/, '></video>');
            debugger;
            $("#click-to-render").hide();
            $("h1 + #click-to-render").parent().append(html);
            $('img').attr('style',"max-width:100%");
        })
    });
}
