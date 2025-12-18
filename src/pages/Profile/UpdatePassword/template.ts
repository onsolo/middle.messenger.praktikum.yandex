export default `<div class="page-wrapper">
    <div class="profile-layout">
        {{{ BackLink }}}

        <main class="profile">
            <div class="profile__header">
                <div class="profile__avatar">
                    {{{ ProfileAvatar }}}
                </div>
            </div>

            <form class="profile__form">
                <ul class="profile__list">
                    <li class="profile__item">
                        <span class="profile__key">Старый пароль</span>
                        <span class="profile__value">
                            {{{ OldPasswordInput }}}
                        </span>
                    </li>

                    <li class="profile__item">
                        <span class="profile__key">Новый пароль</span>
                        <span class="profile__value">
                            {{{ NewPasswordInput }}}
                        </span>
                    </li>

                    <li class="profile__item">
                        <span class="profile__key">Повторите новый пароль</span>
                        <span class="profile__value">
                            {{{ RepeatPasswordInput }}}
                        </span>
                    </li>
                </ul>

                <div class="profile__actions">
                    {{{ SubmitButton }}}
                </div>
            </form>
        </main>

        {{{ FooterComponent }}}
    </div>
</div>
`;
