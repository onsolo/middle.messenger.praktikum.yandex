export default `<div class="page-wrapper">
    <main class="messenger-layout">
        <aside class="messenger__sidebar">
            <div class="messenger__profile-link">
                {{{ ProfileLink }}}
                {{> ChevronRight }}
            </div>

            <form class="messenger__search">
                {{{ SearchInput }}}
            </form>

            <ul class="messenger__chats-list">
                {{{ chatsList }}}
            </ul>
        </aside>

        <div class="messenger__chat">
            <header class="chat-header">
                <img :src="{{chatAvatar}}" class="chat-header__avatar">
                <div class="chat-header__name">Вадим</div>
                <button class="chat-header__menu-btn">
                    {{> Kebab }}
                </button>
               
            </header>

            <div class="chat-messages">
                <div class="chat-messages__date">19 июня</div>

                <div class="message">
                    <div class="message__content">
                        <p>Привет! Смотри, тут всплыл интересный кусок лунной космической истории — НАСА в какой-то
                            момент попросила Хассельблад адаптировать модель SWC для полетов на Луну. Сейчас мы все
                            знаем что астронавты летали с моделью 500 EL — и к слову говоря, все тушки этих камер все
                            еще находятся на поверхности Луны, так как астронавты с собой забрали только кассеты с
                            пленкой.</p>
                        <p>Хассельблад в итоге адаптировал SWC для космоса, но что-то пошло не так и на ракету они так
                            никогда и не попали. Всего их было произведено 25 штук, одну из них недавно продали на
                            аукционе за 45000 евро.</p>

                        <div class="message__image">
                        </div>

                        <span class="message__time">11:56</span>
                    </div>
                </div>

                <div class="message message--mine">
                    <div class="message__content">
                        <p>Круто!</p>
                        <div class="message__meta">
                            {{> StatusRead }} <span class="message__time">12:00</span>
                        </div>
                    </div>
                </div>
            </div>

            <footer class="chat-footer">
                <button class="chat-footer__attach" type="button">
                    {{> PaperClip }}
                </button>
                
                <form class="chat-footer__form">
                    {{{ MessageInput }}}
                    <button class="chat-footer__send" type="submit">
                        {{> ArrowRightCircle }}
                    </button>
                </form>
            </footer>
        </div>
    </main>

    {{{ FooterComponent }}}
</div>
`;
