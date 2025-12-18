export default `<li class="chat-list-item">
    <img src="{{{avatarUrl}}}" alt="Изображение чата" class="chat-list-item__avatar">
    
    <div class="chat-list-item__content">
        <div class="chat-list-item__name">{{{title}}}</div>
        <div class="chat-list-item__message">{{{message}}}</div>
    </div>
    
    <div class="chat-list-item__meta">
        <div class="chat-list-item__time">{{{time}}}</div>
        {{#if badge}}
        <div class="chat-list-item__badge">{{{badge}}}</div>
        {{/if}}
    </div>
</li>`;
