export default `<div class="page-wrapper">
    <div class="profile-layout">
        {{{ BackLink }}}

        <main class="profile">
            <div class="profile__header">
                <div class="profile__avatar">
                    {{{ ProfileAvatar }}}
                </div>

                <div class="profile__name">{{name}}</div>
            </div>

            <ul class="profile__list">
                <li class="profile__item">
                    <span class="profile__key">Почта</span>
                    <span class="profile__value">{{email}}</span>
                </li>

                <li class="profile__item">
                    <span class="profile__key">Логин</span>
                    <span class="profile__value">{{login}}</span>
                </li>

                <li class="profile__item">
                    <span class="profile__key">Имя</span>
                    <span class="profile__value">{{first_name}}</span>
                </li>

                <li class="profile__item">
                    <span class="profile__key">Фамилия</span>
                    <span class="profile__value">{{second_name}}</span>
                </li>

                <li class="profile__item">
                    <span class="profile__key">Имя в чате</span>
                    <span class="profile__value">{{display_name}}</span>
                </li>

                <li class="profile__item">
                    <span class="profile__key">Телефон</span>
                    <span class="profile__value">{{phone}}</span>
                </li>
            </ul>

            <ul class="profile__list">
                <li class="profile__item profile__item--link">
                    {{{ ChangeProfileLink }}}
                </li>

                <li class="profile__item profile__item--link">
                    {{{ ChangePasswordLink }}}
                </li>

                <li class="profile__item profile__item--link profile__item--danger">
                    {{{ LogoutLink }}}
                </li>
            </ul>
        </main>

        {{{ FooterComponent }}}
    </div>
</div>
`;
