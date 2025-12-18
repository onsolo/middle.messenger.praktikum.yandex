export default `<div class="page-wrapper">
    <div class="error-layout">
        <main class="error-page">
            <div class="error-page__title">{{title}}</div>
            <div class="error-page__subtitle">{{subtitle}}</div>

            <div class="error-page__link">
                {{{ BackToMessengerLink }}}
            </div>
        </main>
    </div>

    {{{ FooterComponent }}}
</div>
`;
