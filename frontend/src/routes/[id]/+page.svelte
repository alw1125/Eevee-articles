<script>
import { decodeHtml, formatDate } from "$lib/js/utils";
export let data;

</script>


<h1>{data.title}</h1>
<div>
    <p class="author-name">{data.username}</p>
    {@html data.text}
    <p class="article-date">{formatDate(data.date)}</p>
</div>
