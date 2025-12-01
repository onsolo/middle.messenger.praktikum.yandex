export default `<input 
    id="{{id}}" 
    name="{{name}}"
    type="{{type}}" 
    value="{{value}}" 
    accept="{{accept}}"
    placeholder="{{placeholder}}" 
    class="input {{#if is-bordered}}input--bordered{{/if}} {{#if is-filled}}input--filled{{/if}}"
   
>`
