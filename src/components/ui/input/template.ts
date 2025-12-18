export default `
<div class="input-container">
<input 
    id="{{id}}" 
    name="{{name}}"
    type="{{type}}" 
    value="{{value}}" 
    accept="{{accept}}"
    placeholder="{{placeholder}}" 
    class="input {{#if isBordered}}input--bordered{{/if}} {{#if isFilled}}input--filled{{/if}}"
>
<span class="input__error" id="error-{{id}}"></span>
</div>
`;
