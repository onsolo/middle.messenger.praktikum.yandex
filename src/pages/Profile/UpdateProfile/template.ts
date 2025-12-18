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
                        <span class="profile__key">Почта</span>
                        <span class="profile__value">
                            {{{ EmailInput }}}
                        </span>
                    </li>

                    <li class="profile__item">
                        <span class="profile__key">Логин</span>
                        <span class="profile__value">
                            {{{ LoginInput }}}
                        </span>
                    </li>

                    <li class="profile__item">
                        <span class="profile__key">Имя</span>
                        <span class="profile__value">
                            {{{ FirstNameInput }}}
                        </span>
                    </li>

                    <li class="profile__item">
                        <span class="profile__key">Фамилия</span>
                        <span class="profile__value">
                            {{{ SecondNameInput }}}
                        </span>
                    </li>

                    <li class="profile__item">
                        <span class="profile__key">Имя в чате</span>
                        <span class="profile__value">
                            {{{ DisplayNameInput }}}
                        </span>
                    </li>

                    <li class="profile__item">
                        <span class="profile__key">Телефон</span>
                        <span class="profile__value">
                            {{{ PhoneInput }}}
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
