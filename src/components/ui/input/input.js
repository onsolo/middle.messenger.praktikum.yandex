export default `<input 
    id="{{id}}" 
    type="{{type}}" 
    value="{{value}}" 
    placeholder="{{placeholder}}" 
    class="input {{#if is-bordered}}input--bordered{{/if}} {{#if is-filled}}input--filled{{/if}}"
    autocomplete="new-password"
>`

// TODO убрать autocomplete="new-password"
