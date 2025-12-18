export default `<div class="page-wrapper">
    <main class="auth-layout">
        <div class="auth-card">
            <h1 class="auth-card__title">
                Регистрация
            </h1>
            <form class="auth-card__form">
                {{{ EmailInput }}}
                {{{ LoginInput }}}
                {{{ FirstNameInput }}}
                {{{ SecondNameInput }}}
                {{{ PhoneInput }}}
                {{{ PasswordInput }}}
                {{{ RepeatPasswordInput }}}

                <div class="auth-card__actions">
                    {{{ SubmitButton }}}
                    {{{ LoginPageLink }}}
                </div>
            </form>
        </div>
    </main>

    {{{ FooterComponent }}}
</div>
`;
