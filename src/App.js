import Handlebars from 'handlebars';
import * as Pages from './pages';
import {chatsList, currentUser} from "./mockData";

import ChevronRight from './components/icons/ChevronRight';
import ArrowLeft from './components/icons/ArrowLeft';

import {Input} from "./components/ui/input";
import {Button} from "./components/ui/button";
import {Link} from "./components/ui/link";
import {Footer} from "./components/ui/footer";

import {ChatListItem} from "./components/features/ChatListItem";
import {BackLink} from "./components/features/BackLink";
import {ProfileAvatar} from "./components/features/ProfileAvatar";

// Icons
Handlebars.registerPartial('ChevronRight', ChevronRight);
Handlebars.registerPartial('ArrowLeft', ArrowLeft);

// UI
Handlebars.registerPartial('Input', Input);
Handlebars.registerPartial('Button', Button);
Handlebars.registerPartial('Link', Link);
Handlebars.registerPartial('Footer', Footer)

// Features
Handlebars.registerPartial('ChatListItem', ChatListItem);
Handlebars.registerPartial('BackLink', BackLink);
Handlebars.registerPartial('ProfileAvatar', ProfileAvatar);

export default class App {
    constructor() {
        this.state = {
            currentPage: '404'
        };
        this.appElement = document.getElementById('app');

        this.initRoutes();
    }

    render() {
        const route = this.routes[this.state.currentPage];

        const context = route.data ? route.data : {};
        const template = Handlebars.compile(route.template);
        const htmlString = template(context);


        this.updateDOM(htmlString);
    }

    updateDOM(htmlString) {
        this.appElement.replaceChildren();
        this.appElement.insertAdjacentHTML('afterbegin', htmlString);
        this.initEventListeners();
    }

    initEventListeners() {
        const links = document.querySelectorAll('.link');
        links.forEach(link => {
            link.addEventListener('click', event => {
                event.preventDefault();
                this.changePage(event.currentTarget.dataset.page);
            })
        })
    }

    initRoutes() {
        this.routes = {
            'login': {
                template: Pages.LoginPage
            },
            'register': {
                template: Pages.SignInPage
            },
            'messenger': {
                template: Pages.MessengerPage,
                data: {chats: this.getChatsList()}
            },
            'profile': {
                template: Pages.ProfilePage,
                data: {...this.getCurrentUser()}
            },
            'update-profile': {
                template: Pages.UpdateProfilePage,
                data: {...this.getCurrentUser()}
            },
            'password': {
                template: Pages.ChangePasswordPage,
                data: {...this.getCurrentUser()}
            },
            '404': {
                template: Pages.ErrorPage,
                data: {title: '404', subtitle: 'Не туда попали'}
            },
            '500': {
                template: Pages.ErrorPage,
                data: {title: '500', subtitle: 'Мы уже фиксим'}
            }
        }
    }

    changePage(page) {
        this.state.currentPage = page;
        this.render();
    }

    getChatsList() {
        return chatsList;
    }

    getCurrentUser() {
        return currentUser;
    }
}
