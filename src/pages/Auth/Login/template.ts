export default `<div class="page-wrapper">
    <main class="auth-layout">
        <div class="auth-card">
            <h1 class="auth-card__title">
                Вход
            </h1>
            
            <form class="auth-card__form">
                {{{ NameInput }}}
                {{{ PasswordInput }}}

                <div class="auth-card__actions">
                    {{{ SubmitButton }}}
                    {{{ RegisterPageLink }}}
                </div>
            </form>
        </div>

    </main>
    {{{ FooterComponent }}}
</div>
`;
