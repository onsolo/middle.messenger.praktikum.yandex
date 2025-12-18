export default `<div class="profile-avatar">
    <img src="{{url}}" alt="Фото профиля" width="130px" height="130px">
    
    <div class="profile-avatar__overlay">
        <span>Поменять<br>аватар</span>
        
        {{{ ProfileAvatarInput }}}
    </div>
</div>`;
